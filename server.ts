import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';

function getAIClient() {
  return new GoogleGenAI({
    apiKey: apiKey || 'dummy-key',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    product: 'Navigator AI - Career & University Navigation Platform',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    models: CANDIDATE_MODELS,
  });
});

const CANDIDATE_MODELS = [
  'gemini-3.7-flash',
  'gemini-flash-latest',
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite'
];

interface GenerationResult<T> {
  data: T;
  modelUsed: string;
}

// JSON extraction helper with immediate fallback on 503/429 and short bounded backoff
async function generateJsonContent<T = any>(prompt: string, systemInstruction: string): Promise<GenerationResult<T>> {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in server environment.');
  }

  const ai = getAIClient();
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const text = response.text || '{}';
      let parsed: T;
      try {
        parsed = JSON.parse(text);
      } catch (err) {
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
        } else {
          throw new Error(`Failed to parse JSON response from model ${model}`);
        }
      }

      return {
        data: parsed,
        modelUsed: model,
      };
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.code || (err?.message?.includes('503') ? 503 : null);
      console.warn(`[Gemini API] Candidate model '${model}' error (status: ${status}):`, err.message || err);

      // If 503 (UNAVAILABLE) or 429 (RATE_LIMIT), immediately proceed to next fallback model without hammering
      if (status === 503 || status === 429 || err?.message?.includes('high demand') || err?.message?.includes('UNAVAILABLE')) {
        continue;
      }

      // For brief network anomalies, do one quick 200ms retry before switching models
      try {
        await new Promise((r) => setTimeout(r, 200));
        const retryRes = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });
        const text = retryRes.text || '{}';
        let parsed: T;
        try {
          parsed = JSON.parse(text);
        } catch {
          const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
          parsed = JSON.parse(jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : '{}');
        }
        return { data: parsed, modelUsed: model };
      } catch (retryErr: any) {
        lastError = retryErr;
        continue;
      }
    }
  }

  throw lastError || new Error('All candidate Gemini models are currently unavailable.');
}

// Text generation helper with multi-model fallback
async function generateTextContent(prompt: string, systemInstruction: string, temperature = 0.4): Promise<{ text: string; modelUsed: string }> {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in server environment.');
  }

  const ai = getAIClient();
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          temperature,
        },
      });
      return {
        text: response.text || '',
        modelUsed: model,
      };
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.code;
      console.warn(`[Gemini API Text] Model '${model}' error:`, err.message || err);
      if (status === 503 || status === 429 || err?.message?.includes('high demand')) {
        continue;
      }
      try {
        await new Promise((r) => setTimeout(r, 200));
        const retryRes = await ai.models.generateContent({
          model,
          contents: prompt,
          config: { systemInstruction, temperature },
        });
        return { text: retryRes.text || '', modelUsed: model };
      } catch (retryErr: any) {
        lastError = retryErr;
        continue;
      }
    }
  }

  throw lastError || new Error('All text model candidates failed.');
}

// ============================================================================
// 1. ADAPTIVE AI CAREER INTERVIEW ENDPOINTS (DYNAMIC GEMINI INTERVIEW)
// ============================================================================

// A. START ADAPTIVE ASSESSMENT (LIVE GEMINI)
app.post('/api/assessment/start', async (req, res) => {
  try {
    const { studentProfile, language = 'en', isOfflineDemo = false } = req.body;

    if (isOfflineDemo) {
      const demoData = getFallbackStartAssessment(studentProfile, language);
      return res.json({
        ...demoData,
        isLiveAI: false,
        isOfflineDemo: true,
        modelUsed: 'offline-demo',
      });
    }

    const systemInstruction = `You are the Navigator AI Adaptive Career Interview Engine.
Your mission is to conduct a genuine, dynamically tailored 1-on-1 career discovery interview for a student aged 14-22.
You do NOT pick from a static question bank. You craft each question dynamically based on the student's emerging profile, cognitive strengths, interests, and uncertainties.

RULES FOR QUESTION 1:
1. Create a natural, engaging, non-leading initial question tailored to the student's education level (${studentProfile?.educationLevel || 'High School'}) and stated favorite subjects (${(studentProfile?.favoriteSubjects || []).join(', ') || 'General STEM & Arts'}).
2. Provide 4 distinct, meaningful options that explore fundamentally different problem-solving inclinations (e.g. building software/systems, analytical data exploration, creative design/media, physical engineering/hardware, or business/leadership).
3. The question and options MUST be in the requested language: ${language.toUpperCase()} (en, uz, or ru).
4. Return strictly valid JSON matching the schema.`;

    const prompt = `Student Profile:
Name: ${studentProfile?.name || 'Student'}
Education Level: ${studentProfile?.educationLevel || 'High School'}
Favorite Subjects: ${(studentProfile?.favoriteSubjects || ['Mathematics', 'Computer Science']).join(', ')}
Languages: ${(studentProfile?.languages || ['English']).join(', ')}
Study Goals: ${studentProfile?.studyGoals || 'Find an optimal career trajectory'}

Generate Question 1 and initialize the structured assessment state.
Return JSON with this schema:
{
  "question": {
    "id": "q1_${Date.now()}",
    "questionNumber": 1,
    "questionText": "Engaging, natural question in ${language.toUpperCase()}",
    "contextNote": "Brief 1-sentence note explaining what cognitive dimension this initial question measures",
    "differentiatingGoal": "Initial mapping of core problem-solving orientation (technical building vs. analysis vs. creative vs. leadership)",
    "dimensionTags": ["problem_solving", "analytical_thinking", "creativity", "technology_interest"],
    "options": [
      { "id": "opt_1", "text": "Option A text in ${language.toUpperCase()}", "dimensionHint": "systems_building" },
      { "id": "opt_2", "text": "Option B text in ${language.toUpperCase()}", "dimensionHint": "data_analysis" },
      { "id": "opt_3", "text": "Option C text in ${language.toUpperCase()}", "dimensionHint": "creative_design" },
      { "id": "opt_4", "text": "Option D text in ${language.toUpperCase()}", "dimensionHint": "leadership_strategy" }
    ],
    "allowCustomAnswer": true
  },
  "assessmentState": {
    "answers": [],
    "interestSignals": {},
    "strengthSignals": {},
    "workStyleSignals": {},
    "subjectSignals": {},
    "careerSignals": {},
    "uncertainties": ["Exploring primary cognitive inclination between builder, analyst, designer, and strategist"],
    "candidateCareers": ["Software Engineer", "Data Scientist & AI Specialist", "Product Manager", "UI/UX Product Designer", "Cybersecurity Specialist", "Robotics & Hardware Engineer"],
    "coveredDimensions": ["initial_inclination"],
    "remainingDimensions": ["algorithmic_rigor", "autonomous_vs_collaborative", "math_intensity", "user_empathy", "hardware_curiosity", "risk_tolerance", "theoretical_vs_applied"],
    "currentQuestionNumber": 1,
    "estimatedConfidence": 10,
    "isComplete": false,
    "lastAnalysisNote": "Initialized interview tailored to student background."
  }
}`;

    const { data, modelUsed } = await generateJsonContent(prompt, systemInstruction);
    return res.json({
      ...data,
      isLiveAI: true,
      modelUsed,
    });
  } catch (error: any) {
    console.error('Live Gemini Start Assessment failed:', error.message || error);
    return res.status(503).json({
      error: 'AI_SERVICE_UNAVAILABLE',
      message: 'Gemini AI is experiencing temporary high demand. You can retry immediately or switch to offline demo mode.',
      isServiceUnavailable: true,
      details: error.message,
    });
  }
});

// B. ANSWER QUESTION & DYNAMICALLY GENERATE NEXT QUESTION OR FINAL RESULT
app.post('/api/assessment/answer', async (req, res) => {
  try {
    const {
      assessmentState,
      currentQuestion,
      selectedOptionId,
      selectedOptionText,
      customAnswerText,
      studentProfile,
      language = 'en',
      isOfflineDemo = false,
    } = req.body;

    const currentAnswers = assessmentState?.answers || [];
    const questionNum = (assessmentState?.currentQuestionNumber || currentAnswers.length) + 1;
    const answeredCount = currentAnswers.length + 1;

    // Build recorded answer
    const recordedAnswer = {
      questionId: currentQuestion?.id || `q_${answeredCount}`,
      questionNumber: currentQuestion?.questionNumber || answeredCount,
      questionText: currentQuestion?.questionText || '',
      selectedOptionId: selectedOptionId || 'custom',
      selectedOptionText: selectedOptionText || customAnswerText || '',
      customText: customAnswerText || undefined,
      timestamp: new Date().toISOString(),
    };

    const updatedAnswers = [...currentAnswers, recordedAnswer];

    if (isOfflineDemo) {
      const demoAnswerData = getFallbackAnswerAssessment(updatedAnswers, assessmentState, studentProfile, language);
      return res.json({
        ...demoAnswerData,
        isLiveAI: false,
        isOfflineDemo: true,
        modelUsed: 'offline-demo',
      });
    }

    const systemInstruction = `You are the Navigator AI Adaptive Career Interview Engine.
Your mission is to analyze the student's latest answer, update the internal assessment state signals, determine what critical information is still missing, and decide whether to ask the next personalized question or generate the final career compatibility result.

ADAPTIVE QUESTION GENERATION LOGIC:
1. Analyze what the student's answer reveals about their cognitive strengths, favorite work modes, analytical depth, and career alignment.
2. Formulate ONE highly specific, non-generic next question that differentiates between their top candidate careers.
   For example:
   - If they like coding: distinguish between deep backend/algorithms vs. interactive frontend/mobile vs. AI/ML data models.
   - If they like problem-solving: test their comfort with abstract mathematical logic vs. hands-on hardware/systems.
   - If they like explaining tech or working with people: test product management, solutions architecture, or technical leadership.
3. Every student MUST receive a unique question sequence tailored to their specific previous choices.
4. Target 15-25 total questions.
   - If answeredCount >= 15 AND the top career matches are distinct and high confidence (estimatedConfidence >= 85), set isComplete = true.
   - If answeredCount >= 20, set isComplete = true.
   - Otherwise, set isComplete = false and generate the next question.
5. All generated texts (question, options, analysis, career matches) MUST be in the requested language: ${language.toUpperCase()} (en, uz, or ru).
6. Return strictly valid JSON.`;

    const prompt = `Student Profile:
Name: ${studentProfile?.name || 'Student'}
Education Level: ${studentProfile?.educationLevel || 'High School'}
Favorite Subjects: ${(studentProfile?.favoriteSubjects || []).join(', ')}
Study Goals: ${studentProfile?.studyGoals || 'Find career path'}

Interview History so far (${updatedAnswers.length} answered):
${JSON.stringify(updatedAnswers, null, 2)}

Previous Assessment State:
Interest Signals: ${JSON.stringify(assessmentState?.interestSignals || {})}
Strength Signals: ${JSON.stringify(assessmentState?.strengthSignals || {})}
Candidate Careers: ${JSON.stringify(assessmentState?.candidateCareers || [])}
Uncertainties: ${JSON.stringify(assessmentState?.uncertainties || [])}
Current Question Count: ${answeredCount}

Analyze this latest answer and return JSON with schema:
{
  "isComplete": ${answeredCount >= 15 ? 'boolean (true if profile is clear and confidence >= 85%, else false)' : 'false'},
  "assessmentState": {
    "answers": ${JSON.stringify(updatedAnswers)},
    "interestSignals": { "technology": 88, "data_science": 75, "design": 30 },
    "strengthSignals": { "analytical_reasoning": 92, "algorithmic_thinking": 85, "communication": 70 },
    "workStyleSignals": { "autonomy": 85, "collaborative_sprints": 65 },
    "subjectSignals": { "mathematics": 90, "computer_science": 92 },
    "careerSignals": { "software-engineer": 94, "data-scientist-ai": 89, "cybersecurity-analyst": 82 },
    "uncertainties": ["1-2 remaining questions to resolve (e.g. backend systems vs. applied machine learning)"],
    "candidateCareers": ["Software Engineer", "Data Scientist & AI Specialist", "Cybersecurity Specialist"],
    "coveredDimensions": ["dimension1", "dimension2"],
    "remainingDimensions": ["dimension3"],
    "currentQuestionNumber": ${questionNum},
    "estimatedConfidence": ${Math.min(95, Math.round(15 + answeredCount * 4.5))},
    "isComplete": false,
    "lastAnalysisNote": "Brief 1-sentence insight on what the latest answer confirmed"
  },
  "nextQuestion": {
    "id": "q${questionNum}_${Date.now()}",
    "questionNumber": ${questionNum},
    "questionText": "Tailored next question exploring the emerging branch in ${language.toUpperCase()}",
    "contextNote": "Why this specific question is asked now",
    "differentiatingGoal": "Testing between Career A and Career B",
    "dimensionTags": ["tag1", "tag2"],
    "options": [
      { "id": "opt_1", "text": "Option 1 in ${language.toUpperCase()}", "dimensionHint": "branch_a" },
      { "id": "opt_2", "text": "Option 2 in ${language.toUpperCase()}", "dimensionHint": "branch_b" },
      { "id": "opt_3", "text": "Option 3 in ${language.toUpperCase()}", "dimensionHint": "branch_c" },
      { "id": "opt_4", "text": "Option 4 in ${language.toUpperCase()}", "dimensionHint": "branch_d" }
    ],
    "allowCustomAnswer": true
  },
  "finalResult": {
    "id": "eval_${Date.now()}",
    "timestamp": "${new Date().toISOString()}",
    "profileArchetype": "Descriptive Cognitive Archetype Title (e.g. 'The Visionary Systems Builder & Algorithmic Architect')",
    "archetypeSummary": "2-3 sentence personalized synthesis of thinking pattern, natural strengths, and focus",
    "topDimensions": [
      { "dimension": "technology_interest", "label": "Technology & Computing", "score": 95, "category": "interest", "explanation": "Evidence from choices" },
      { "dimension": "analytical_thinking", "label": "Mathematical & Algorithmic Logic", "score": 92, "category": "cognitive", "explanation": "Evidence from choices" },
      { "dimension": "problem_solving", "label": "Systemic Problem Solving", "score": 88, "category": "cognitive", "explanation": "Evidence from choices" },
      { "dimension": "independence", "label": "Self-Directed Autonomy", "score": 86, "category": "workstyle", "explanation": "Evidence from choices" },
      { "dimension": "creativity", "label": "Technical Innovation", "score": 80, "category": "cognitive", "explanation": "Evidence from choices" }
    ],
    "allDimensions": [],
    "careerMatches": [
      {
        "careerId": "software-engineer",
        "title": "Software Engineer",
        "category": "Tech & AI",
        "matchScore": 95,
        "fitBadge": "exceptional",
        "whyItMatches": "Direct reflection of user's demonstrated algorithmic rigor and building mindset.",
        "topStrengths": [{ "dimension": "Algorithmic Logic", "score": 95 }, { "dimension": "Systems Architecture", "score": 92 }],
        "potentialChallenges": ["Balancing pure engineering with business stakeholder communication"],
        "recommendedSubjects": ["Computer Science", "Higher Mathematics", "Physics", "English"],
        "keyTools": ["TypeScript", "Python", "Docker", "PostgreSQL", "Git"],
        "growthOutlook": "Very high global and local Uzbekistan market demand."
      },
      {
        "careerId": "data-scientist-ai",
        "title": "Data Scientist & AI Specialist",
        "category": "Tech & AI",
        "matchScore": 91,
        "fitBadge": "exceptional",
        "whyItMatches": "Aligns with high quantitative reasoning and curiosity for machine learning models.",
        "topStrengths": [{ "dimension": "Statistical Reasoning", "score": 92 }],
        "potentialChallenges": ["Managing noisy real-world datasets"],
        "recommendedSubjects": ["Linear Algebra", "Calculus", "Python", "English"],
        "keyTools": ["PyTorch", "Pandas", "Jupyter", "SQL"],
        "growthOutlook": "Explosive growth across AI, fintech, and analytics sectors."
      },
      {
        "careerId": "cybersecurity-analyst",
        "title": "Cybersecurity Specialist",
        "category": "Tech & AI",
        "matchScore": 84,
        "fitBadge": "strong",
        "whyItMatches": "Demonstrated defensive thinking and curiosity about system vulnerabilities.",
        "topStrengths": [{ "dimension": "Diagnostic Investigation", "score": 86 }],
        "potentialChallenges": ["High-pressure response cycles during security incidents"],
        "recommendedSubjects": ["Computer Networks", "Operating Systems", "Mathematics"],
        "keyTools": ["Wireshark", "Linux", "Burp Suite"],
        "growthOutlook": "Critical national security and banking priority."
      }
    ],
    "identifiedStrengths": [
      "Rapid decomposition of complex technical problems into structured components",
      "High intrinsic persistence when debugging and exploring technical tools"
    ],
    "growthOpportunities": [
      "Publish hands-on projects to GitHub to build verifiable portfolio proof",
      "Practice verbal presentation and architectural storytelling"
    ],
    "recommendedFocusAreas": [
      "Master foundational data structures, algorithms, and modular design",
      "Target IELTS 7.0+ / TOEFL 90+ for international scholarship qualifications"
    ],
    "estimatedConfidence": 92,
    "totalQuestionsAnswered": ${updatedAnswers.length},
    "keyUncertaintiesResolved": ["Resolved backend algorithm preference vs. UX design", "Confirmed strong self-directed study focus"]
  }
}
Note: If isComplete is false, provide nextQuestion and omit or leave finalResult as null. If isComplete is true, provide full finalResult and assessmentState.`;

    const { data, modelUsed } = await generateJsonContent(prompt, systemInstruction);
    return res.json({
      ...data,
      isLiveAI: true,
      modelUsed,
    });
  } catch (error: any) {
    console.error('Live Gemini Answer Assessment failed:', error.message || error);
    return res.status(503).json({
      error: 'AI_SERVICE_UNAVAILABLE',
      message: 'Gemini AI is experiencing temporary high demand. You can retry immediately or switch to offline demo mode.',
      isServiceUnavailable: true,
      details: error.message,
    });
  }
});

// Fallback generator helper functions for offline/demo reliability
function getFallbackStartAssessment(studentProfile: any, language: string) {
  const isUz = language === 'uz';
  const isRu = language === 'ru';

  return {
    question: {
      id: 'q1_init',
      questionNumber: 1,
      questionText: isUz
        ? "Sizga ilgari hech qachon duch kelmagan yangi murakkab masala berildi. Odatda birinchi nima qilasiz?"
        : isRu
        ? "Вам дали сложную незнакомую задачу. С чего вы обычно начинаете?"
        : "You are given a complex challenge you have never seen before. What do you naturally do first?",
      contextNote: isUz
        ? "Boshlang'ich kognitiv uslub va muammolarni hal qilish yo'nalishini aniqlaydi."
        : isRu
        ? "Определяет базовый когнитивный стиль и подход к решению проблем."
        : "Maps your baseline problem-solving instinct and initial cognitive orientation.",
      differentiatingGoal: "Baseline cognitive orientation (systems engineering vs. data analysis vs. product design vs. leadership)",
      dimensionTags: ["problem_solving", "analytical_thinking", "creativity", "technology_interest"],
      options: [
        {
          id: "opt_1",
          text: isUz
            ? "Uni mantiqiy qismlarga, qoidalarga yoki tub mexanizmlarga ajratib tahlil qilaman."
            : isRu
            ? "Разбираю задачу на логические блоки, правила и базовые механизмы."
            : "Break it down into logical pieces, algorithmic rules, or underlying mechanics.",
          dimensionHint: "systems_logic"
        },
        {
          id: "opt_2",
          text: isUz
            ? "Noodatiy g'oyalar o'ylab topaman, vizual eskizlar chizaman va turli variantlarni sinayman."
            : isRu
            ? "Генерирую нестандартные идеи, делаю визуальные наброски и пробую разные концепции."
            : "Brainstorm creative ideas, sketch visual concepts, and experiment with alternatives.",
          dimensionHint: "creative_design"
        },
        {
          id: "opt_3",
          text: isUz
            ? "Ishtirokchilar bilan gaplashib, bu kimga qanday ta'sir qilishini tushunaman va jamoaviy yechim izlayman."
            : isRu
            ? "Общаюсь с людьми, выясняю влияние на пользователей и организую командное решение."
            : "Talk to people involved, understand who is affected, and find a collaborative human solution.",
          dimensionHint: "leadership_people"
        },
        {
          id: "opt_4",
          text: isUz
            ? "Nima ishlamasligini tezda bilish uchun darhol amaliy prototip yasash yoki kod yozishni boshlayman."
            : isRu
            ? "Сразу начинаю собирать практический прототип или писать код, чтобы увидеть результат."
            : "Immediately start building or testing a quick prototype to see what works in practice.",
          dimensionHint: "practical_building"
        }
      ],
      allowCustomAnswer: true
    },
    assessmentState: {
      answers: [],
      interestSignals: { technology: 70, analytics: 65 },
      strengthSignals: { problem_solving: 75 },
      workStyleSignals: { autonomy: 70 },
      subjectSignals: { math: 75, cs: 70 },
      careerSignals: { "software-engineer": 80, "data-scientist-ai": 75, "product-manager": 70 },
      uncertainties: ["Exploring whether student leans toward algorithmic depth, data science, or product leadership"],
      candidateCareers: ["Software Engineer", "Data Scientist & AI Specialist", "Product Manager", "UI/UX Product Designer", "Cybersecurity Specialist"],
      coveredDimensions: ["initial_problem_solving"],
      remainingDimensions: ["algorithmic_rigor", "mathematical_comfort", "team_vs_solo", "user_empathy", "hardware_interest"],
      currentQuestionNumber: 1,
      estimatedConfidence: 12,
      isComplete: false,
      lastAnalysisNote: "Initialized adaptive interview baseline."
    }
  };
}

function getFallbackAnswerAssessment(
  updatedAnswers: any[],
  prevState: any,
  studentProfile: any,
  language: string
) {
  const isUz = language === 'uz';
  const isRu = language === 'ru';
  const count = updatedAnswers.length;
  const confidence = Math.min(94, Math.round(15 + count * 5));

  // Determine if we should complete the interview (target ~15-20 questions or if confidence is high)
  const isComplete = count >= 16;

  if (isComplete) {
    return {
      isComplete: true,
      assessmentState: {
        answers: updatedAnswers,
        interestSignals: { technology: 94, analytics: 91, engineering: 84 },
        strengthSignals: { problem_solving: 92, logic: 90, independence: 86 },
        workStyleSignals: { autonomy: 88, collaboration: 70 },
        subjectSignals: { mathematics: 92, computer_science: 94 },
        careerSignals: { "software-engineer": 94, "data-scientist-ai": 90, "cybersecurity-analyst": 84, "product-manager": 79 },
        uncertainties: [],
        candidateCareers: ["Software Engineer", "Data Scientist & AI Specialist", "Cybersecurity Specialist"],
        coveredDimensions: ["all_core_dimensions"],
        remainingDimensions: [],
        currentQuestionNumber: count,
        estimatedConfidence: 94,
        isComplete: true,
        lastAnalysisNote: "Comprehensive cognitive and career evaluation finalized."
      },
      finalResult: {
        id: `eval_${Date.now()}`,
        timestamp: new Date().toISOString(),
        profileArchetype: isUz
          ? "Tizimli Muhandis va Algoritmik Arxitektor"
          : isRu
          ? "Системный Инженер и Алгоритмический Архитектор"
          : "The Visionary Systems Builder & Algorithmic Architect",
        archetypeSummary: isUz
          ? "Siz murakkab muammolarni tizimli tahlil qilish, mustaqil chuqur ishlash va dasturiy yechimlar yaratishda yuqori iqtidorga egasiz."
          : isRu
          ? "Вы обладаете выраженным талантом к системному анализу, глубокой автономной концентрации и созданию надежных программных решений."
          : "You demonstrate a strong aptitude for structured problem decomposition, deep autonomous focus, and architecting elegant software solutions.",
        topDimensions: [
          { dimension: "technology_interest", label: isUz ? "Texnologiya va Dasturlash" : isRu ? "Технологии и ПО" : "Technology & Software", score: 94, category: "interest", explanation: isUz ? "Dasturlash va avtomatlashtirishga yuqori qiziqish" : "Strong preference for software building" },
          { dimension: "analytical_thinking", label: isUz ? "Mantiqiy va Matematik Fikrlash" : isRu ? "Аналитическое Мышление" : "Analytical & Algorithmic Logic", score: 91, category: "cognitive", explanation: isUz ? "Aniq mantiqiy xulosalar" : "High algorithmic rigor" },
          { dimension: "problem_solving", label: isUz ? "Muammolarni Hal Qilish" : isRu ? "Решение Задач" : "Structured Problem Solving", score: 89, category: "cognitive", explanation: isUz ? "Tizimli yondashuv" : "Methodical debugging & design" },
          { dimension: "independence", label: isUz ? "Mustaqil Ta'lim" : isRu ? "Самостоятельность" : "Autonomous Focus", score: 87, category: "workstyle", explanation: isUz ? "Mustaqil izlanish" : "Self-directed deep work" },
          { dimension: "creativity", label: isUz ? "Texnik Innovatsiya" : isRu ? "Инновации" : "Systemic Innovation", score: 82, category: "cognitive", explanation: isUz ? "Yangi g'oyalar" : "Product & architectural creativity" }
        ],
        allDimensions: [],
        careerMatches: [
          {
            careerId: "software-engineer",
            title: "Software Engineer",
            category: "Tech & AI",
            matchScore: 94,
            fitBadge: "exceptional",
            whyItMatches: isUz
              ? "Sizning mantiqiy fikrlash va tizimli qurish qobiliyatingiz bilan to'liq mos keladi."
              : isRu
              ? "Идеально соответствует вашему системному мышлению и стремлению создавать работающие цифровые продукты."
              : "Directly matches your strong algorithmic problem-solving instincts, coding curiosity, and self-directed building drive.",
            topStrengths: [
              { dimension: isUz ? "Mantiqiy Tahlil" : "Algorithmic Logic", score: 94 },
              { dimension: isUz ? "Tizimli Qurish" : "Systems Architecture", score: 91 }
            ],
            potentialChallenges: [isUz ? "Texnik bo'lmagan jamoalar bilan muloqot" : "Communicating technical nuances to non-technical stakeholders"],
            recommendedSubjects: ["Computer Science", "Higher Mathematics", "Physics", "English"],
            keyTools: ["TypeScript", "Python", "Git", "Docker", "PostgreSQL"],
            growthOutlook: isUz ? "O'zbekiston va xalqaro bozorda eng yuqori talab" : "Very high global and local demand with remote flexibility."
          },
          {
            careerId: "data-scientist-ai",
            title: "Data Scientist & AI Specialist",
            category: "Tech & AI",
            matchScore: 90,
            fitBadge: "exceptional",
            whyItMatches: isUz
              ? "Matematik modellashtirish va ma'lumotlar tahliliga bo'lgan kuchli qobiliyatingizni aks ettiradi."
              : isRu
              ? "Отражает вашу склонность к математическому анализу, поиску закономерностей и машинному обучению."
              : "Reflects your strong quantitative orientation, statistical curiosity, and interest in machine learning algorithms.",
            topStrengths: [
              { dimension: isUz ? "Matematik Modellashtirish" : "Mathematical Modeling", score: 92 }
            ],
            potentialChallenges: [isUz ? "Murakkab va to'liq bo'lmagan ma'lumotlar bilan ishlash" : "Navigating messy real-world datasets"],
            recommendedSubjects: ["Linear Algebra & Calculus", "Statistics", "Python", "English"],
            keyTools: ["PyTorch", "Pandas", "Jupyter", "SQL"],
            growthOutlook: isUz ? "Fintex, AI va tibbiyot sohalarida yuqori o'sish" : "Explosive growth across AI research, fintech, and biomedical sectors."
          },
          {
            careerId: "cybersecurity-analyst",
            title: "Cybersecurity Specialist",
            category: "Tech & AI",
            matchScore: 84,
            fitBadge: "strong",
            whyItMatches: isUz
              ? "Tizimlar xavfsizligi va chuqur diagnostik tahlilga qiziqishingiz bilan mos keladi."
              : isRu
              ? "Соответствует вашему интересу к исследованию систем и защите критической инфраструктуры."
              : "Supported by methodical diagnostic investigation and curiosity regarding system vulnerabilities.",
            topStrengths: [
              { dimension: isUz ? "Tizimli Diagnostika" : "System Investigation", score: 86 }
            ],
            potentialChallenges: [isUz ? "Xavfsizlik hodisalarida yuqori mas'uliyat" : "High-pressure incident response cycles"],
            recommendedSubjects: ["Computer Networks", "Operating Systems", "Mathematics", "English"],
            keyTools: ["Wireshark", "Linux", "Burp Suite"],
            growthOutlook: isUz ? "Bank va davlat xavfsizligida doimiy talab" : "Critical national and international defense priority."
          },
          {
            careerId: "product-manager",
            title: "Product Manager (Tech)",
            category: "Business & Product",
            matchScore: 79,
            fitBadge: "promising",
            whyItMatches: isUz
              ? "Texnologiya va strategik rejalashtirishni birlashtirish imkonini beradi."
              : isRu
              ? "Объединяет понимание технологий со стратегической расстановкой приоритетов."
              : "Blends technical understanding with structured strategic prioritization and product direction.",
            topStrengths: [
              { dimension: isUz ? "Strategik Fikrlash" : "Strategic Vision", score: 80 }
            ],
            potentialChallenges: [isUz ? "To'g'ridan-to'g'ri buyruq bermasdan jamoani boshqarish" : "Managing ambiguity without direct managerial authority"],
            recommendedSubjects: ["Economics", "Computer Science", "English"],
            keyTools: ["Jira", "Figma", "Mixpanel"],
            growthOutlook: isUz ? "Yuqori daromadli yetakchilik yo'li" : "High influence and high compensation pathway."
          }
        ],
        identifiedStrengths: [
          isUz ? "Murakkab muammolarni mantiqiy tarkibiy qismlarga tezkor ajratish" : "High capacity for logical decomposition and structured problem solving",
          isUz ? "Yangi texnologiyalarni mustaqil o'rganishda yuqori qat'iyat" : "Self-directed perseverance when learning challenging STEM topics"
        ],
        growthOpportunities: [
          isUz ? "Amaliy loyihalarni GitHub orqali ochiq portfolioga aylantirish" : "Build real-world open-source portfolio projects to demonstrate practical mastery",
          isUz ? "Ingliz tilida taqdimot va texnik hikoya qilish mahoratini oshirish" : "Practice technical storytelling and English presentation skills"
        ],
        recommendedFocusAreas: [
          isUz ? "Ma'lumotlar tuzilmalari va algoritmlar poydevorini chuqur egallash" : "Master core data structures, algorithms, and modular software design",
          isUz ? "Xalqaro grantlar uchun IELTS 7.0+ sertifikatiga erishish" : "Achieve IELTS 7.0+ for international and regional university scholarship qualifications"
        ],
        estimatedConfidence: 94,
        totalQuestionsAnswered: count,
        keyUncertaintiesResolved: [
          isUz ? "Dasturlash va algoritmik tahlil ustuvorligi tasdiqlandi" : "Confirmed deep preference for software architecture over visual design alone",
          isUz ? "Mustaqil chuqur ishlash formati aniqlandi" : "Confirmed high comfort with autonomous focused engineering"
        ]
      }
    };
  }

  // Generate dynamic next question based on branching heuristics
  const lastAnsText = (updatedAnswers[count - 1]?.selectedOptionText || '').toLowerCase();
  
  let nextQText = "";
  let noteText = "";
  let goalText = "";
  let optA = "";
  let optB = "";
  let optC = "";
  let optD = "";

  if (lastAnsText.includes('code') || lastAnsText.includes('dastur') || lastAnsText.includes('software') || lastAnsText.includes('logic') || lastAnsText.includes('mantiq')) {
    nextQText = isUz
      ? "Dasturlash va texnologiyada sizni qaysi yo'nalish ko'proq jalb qiladi?"
      : isRu
      ? "В программировании и технологиях, какое направление вас привлекает больше всего?"
      : "Within software and computing, which area of focus naturally excites your curiosity most?";
    noteText = isUz
      ? "Dasturiy arxitektura, sun'iy intellekt yoki amaliy dasturlar o'rtasidagi farqni aniqlaydi."
      : isRu
      ? "Дифференцирует интерес между бэкенд-архитектурой, AI/ML и пользовательскими продуктами."
      : "Differentiates between backend algorithms, machine learning models, and interactive user applications.";
    goalText = "Differentiating Backend/Algorithms vs. Machine Learning vs. Interactive Apps";
    optA = isUz ? "Murakkab algoritmlar, ma'lumotlar bazalari va tezkor server tizimlari qurish" : isRu ? "Сложные алгоритмы, базы данных и высоконагруженные серверные системы" : "Building high-performance server architectures, databases, and core algorithms";
    optB = isUz ? "Sun'iy intellekt, neyron tarmoqlar va katta ma'lumotlarni tahlil qilish" : isRu ? "Искусственный интеллект, нейросети и работа с большими данными" : "Training machine learning models, statistical inference, and AI research";
    optC = isUz ? "Foydalanuvchilarga yoqadigan chiroyli mobil va veb ilovalar yaratish" : isRu ? "Создание красивых и удобных мобильных/веб-приложений для людей" : "Creating intuitive, responsive mobile & web interfaces that delight users";
    optD = isUz ? "Xavfsizlik tizimlari, tarmoqlarni himoyalash va zaifliklarni topish" : isRu ? "Информационная безопасность, защита сетей и поиск уязвимостей" : "Investigating cybersecurity vulnerabilities and defending network systems";
  } else if (lastAnsText.includes('data') || lastAnsText.includes('tahlil') || lastAnsText.includes('research') || lastAnsText.includes('matematik') || lastAnsText.includes('math')) {
    nextQText = isUz
      ? "Katta miqdordagi ma'lumotlar yoki hisob-kitoblar bilan ishlaganda sizga nima ko'proq yoqadi?"
      : isRu
      ? "Работая с данными или сложными расчетами, что приносит вам наибольшее удовлетворение?"
      : "When working with quantitative data or mathematical models, what brings you the greatest satisfaction?";
    noteText = isUz ? "Miqdoriy tahlil chuqurligi va amaliy qo'llanishini o'lchaydi." : "Measures quantitative reasoning preference and practical application.";
    goalText = "Differentiating theoretical mathematical inquiry vs. applied predictive analytics";
    optA = isUz ? "Yashirin qonuniyatlar va bashoratlarni ochib beruvchi modellarni yaratish" : isRu ? "Построение прогнозных моделей и выявление неочевидных трендов" : "Finding hidden patterns and building predictive mathematical models";
    optB = isUz ? "Moliyaviy bozorlar, investitsiyalar va biznes qarorlarini hisob-kitob qilish" : isRu ? "Финансовые рынки, инвестиции и экономический расчет решений" : "Analyzing financial markets, venture economics, and quantitative business strategy";
    optC = isUz ? "Ilmiy tadqiqotlar o'tkazish va yangi gipotezalarni tekshirish" : isRu ? "Научные исследования и строгая проверка фундаментальных гипотез" : "Conducting rigorous scientific research and testing fundamental hypotheses";
    optD = isUz ? "Ma'lumotlarni qulay interaktiv grafiklar orqali vizualizatsiya qilish" : isRu ? "Наглядная визуализация данных в виде понятных дашбордов" : "Transforming complex datasets into clear, interactive visual dashboards";
  } else {
    nextQText = isUz
      ? "Kundalik vazifalarni bajarishda qanday ish sur'ati va jamoa formati sizga eng qulay?"
      : isRu
      ? "Какой рабочий темп и формат взаимодействия в команде для вас наиболее комфортен?"
      : "What work environment rhythm and collaboration style enables your best performance?";
    noteText = isUz ? "Mustaqillik va hamkorlik muvozanatini aniqlaydi." : "Evaluates autonomy vs. collaborative cross-functional dynamics.";
    goalText = "Evaluating individual deep focus vs. collaborative cross-functional rhythm";
    optA = isUz ? "Katta monitorlar, quloqchinlar va chuqur e'tibor talab qiladigan tinch mustaqil muhit" : isRu ? "Тихая автономная обстановка с глубоким погружением в код и задачи" : "Deep autonomous focus with high independence and minimal interruptions";
    optB = isUz ? "Doimiy g'oyalar almashinuvi, taqdimotlar va strategik muhokamalarga boy jamoa" : isRu ? "Динамичные командные спринты, брейнштормы и презентации идей" : "Dynamic cross-functional team sprints, brainstorms, and strategy pitches";
    optC = isUz ? "Laboratoriya yoki amaliy ustaxonada real qurilmalar bilan ishlash" : isRu ? "Инженерная лаборатория с практической сборкой и тестированием устройств" : "Hands-on engineering workshop with physical prototypes and test equipment";
    optD = isUz ? "Dunyoning istalgan nuqtasidan xalqaro jamoalar bilan erkin masofaviy ishlash" : isRu ? "Гибкий международный удаленный формат с гибким графиком" : "Flexible global remote setup collaborating asynchronously across time zones";
  }

  return {
    isComplete: false,
    assessmentState: {
      answers: updatedAnswers,
      interestSignals: { ...prevState?.interestSignals, technology: 85 },
      strengthSignals: { ...prevState?.strengthSignals, problem_solving: 85 },
      workStyleSignals: { ...prevState?.workStyleSignals, autonomy: 80 },
      subjectSignals: { ...prevState?.subjectSignals, math: 85 },
      careerSignals: { ...prevState?.careerSignals, "software-engineer": 88 },
      uncertainties: ["Differentiating specific technical specialization branch"],
      candidateCareers: prevState?.candidateCareers || ["Software Engineer", "Data Scientist & AI Specialist", "Product Manager"],
      coveredDimensions: [...(prevState?.coveredDimensions || []), `dim_${count}`],
      remainingDimensions: ["specialization_branch", "risk_tolerance"],
      currentQuestionNumber: count + 1,
      estimatedConfidence: confidence,
      isComplete: false,
      lastAnalysisNote: `Processed answer #${count} and branched into deeper differentiation.`
    },
    nextQuestion: {
      id: `q${count + 1}_${Date.now()}`,
      questionNumber: count + 1,
      questionText: nextQText,
      contextNote: noteText,
      differentiatingGoal: goalText,
      dimensionTags: ["technical_depth", "workstyle", "specialization"],
      options: [
        { id: "opt_1", text: optA, dimensionHint: "path_a" },
        { id: "opt_2", text: optB, dimensionHint: "path_b" },
        { id: "opt_3", text: optC, dimensionHint: "path_c" },
        { id: "opt_4", text: optD, dimensionHint: "path_d" }
      ],
      allowCustomAnswer: true
    }
  };
}

// 1. FAST EVALUATE ENDPOINT (Legacy/Direct fallback)
app.post('/api/assessment/evaluate', async (req, res) => {
  try {
    const { answers = [], studentProfile, language = 'en' } = req.body;

    const systemInstruction = `You are the Navigator AI Career Assessment Evaluation Engine.
Your mission is to objectively evaluate the student's answers, determine their cognitive archetype, calculate multi-dimensional strength scores (0-100), and produce transparent career compatibility matches.

CRITICAL RULES:
1. Ground the evaluation strictly in the student's choices, favorite subjects, and learning patterns.
2. Provide transparent, evidence-based "whyItMatches" explanations without generic fluff.
3. Clearly label career percentages as "AI Compatibility Estimate".
4. Return all textual explanations in the requested language: ${language.toUpperCase()} (en, uz, or ru).
5. Output strictly valid JSON.`;

    const prompt = `Student Profile:
Name: ${studentProfile?.name || 'Student'}
Education Level: ${studentProfile?.educationLevel || 'High School'}
Favorite Subjects: ${(studentProfile?.favoriteSubjects || []).join(', ')}
English Level: ${studentProfile?.englishLevel || 'Intermediate'}
Study Goals: ${studentProfile?.studyGoals || 'Find the right career path'}

Assessment Answers:
${JSON.stringify(answers, null, 2)}

Evaluate this student and return a structured JSON response matching this schema:
{
  "profileArchetype": "Descriptive title of cognitive archetype (e.g. 'The Visionary Systems Builder & AI Architect')",
  "archetypeSummary": "2-3 sentence synthesis of the student's core thinking patterns, strengths, and natural inclinations",
  "topDimensions": [
    {
      "dimension": "technology_interest",
      "label": "Technology & AI Interest",
      "score": 94,
      "category": "interest",
      "explanation": "Specific evidence from student choices"
    },
    {
      "dimension": "analytical_thinking",
      "label": "Analytical & Mathematical Reasoning",
      "score": 91,
      "category": "cognitive",
      "explanation": "Specific evidence"
    },
    {
      "dimension": "problem_solving",
      "label": "Algorithmic Problem Solving",
      "score": 88,
      "category": "cognitive",
      "explanation": "Specific evidence"
    },
    {
      "dimension": "creativity",
      "label": "Systemic Product Innovation",
      "score": 82,
      "category": "cognitive",
      "explanation": "Specific evidence"
    },
    {
      "dimension": "independence",
      "label": "Autonomous Learning",
      "score": 86,
      "category": "workstyle",
      "explanation": "Specific evidence"
    }
  ],
  "allDimensions": [
    { "dimension": "technology_interest", "label": "Technology Interest", "score": 94, "category": "interest", "explanation": "High tech interest" },
    { "dimension": "analytical_thinking", "label": "Analytical Thinking", "score": 91, "category": "cognitive", "explanation": "Logical rigor" },
    { "dimension": "problem_solving", "label": "Problem Solving", "score": 88, "category": "cognitive", "explanation": "Debugging and optimization" },
    { "dimension": "independence", "label": "Self-Directed Focus", "score": 86, "category": "workstyle", "explanation": "Autonomous study" },
    { "dimension": "creativity", "label": "Creative Innovation", "score": 82, "category": "cognitive", "explanation": "Design thinking" },
    { "dimension": "leadership", "label": "Leadership & Vision", "score": 75, "category": "workstyle", "explanation": "Project coordination" },
    { "dimension": "communication", "label": "Communication", "score": 70, "category": "workstyle", "explanation": "Presentations" }
  ],
  "careerMatches": [
    {
      "careerId": "software-engineer",
      "title": "Software Engineer",
      "category": "Tech & AI",
      "matchScore": 94,
      "fitBadge": "exceptional",
      "whyItMatches": "Direct reflection of user's strong analytical problem solving and building instinct.",
      "topStrengths": [
        { "dimension": "Technology Interest", "score": 94 },
        { "dimension": "Analytical Thinking", "score": 91 },
        { "dimension": "Problem Solving", "score": 88 }
      ],
      "potentialChallenges": ["Focusing too much on code rather than user communication"],
      "recommendedSubjects": ["Advanced Mathematics", "Computer Science", "Physics", "English"],
      "keyTools": ["TypeScript", "Python", "Git", "Docker", "PostgreSQL"],
      "growthOutlook": "Very high global and local demand with remote flexibility."
    },
    {
      "careerId": "data-scientist-ai",
      "title": "Data Scientist & AI Specialist",
      "category": "Tech & AI",
      "matchScore": 90,
      "fitBadge": "exceptional",
      "whyItMatches": "Matches interest in mathematics, statistical inference, and machine learning models.",
      "topStrengths": [
        { "dimension": "Mathematical Modeling", "score": 93 },
        { "dimension": "Pattern Recognition", "score": 89 }
      ],
      "potentialChallenges": ["Managing messy real-world datasets"],
      "recommendedSubjects": ["Linear Algebra & Calculus", "Statistics", "Python", "English"],
      "keyTools": ["PyTorch", "Pandas", "Jupyter", "SQL"],
      "growthOutlook": "Explosive growth across AI research, fintech, and biomedical sectors."
    },
    {
      "careerId": "cybersecurity-analyst",
      "title": "Cybersecurity & Defense Specialist",
      "category": "Tech & AI",
      "matchScore": 84,
      "fitBadge": "strong",
      "whyItMatches": "Supported by methodical diagnostic investigation and curiosity regarding system internals.",
      "topStrengths": [
        { "dimension": "System Investigation", "score": 87 },
        { "dimension": "Defensive Logic", "score": 85 }
      ],
      "potentialChallenges": ["High-pressure incident response on-call cycles"],
      "recommendedSubjects": ["Computer Networks", "Operating Systems", "Mathematics", "English"],
      "keyTools": ["Wireshark", "Kali Linux", "Burp Suite"],
      "growthOutlook": "Critical national and international defense priority."
    },
    {
      "careerId": "product-manager",
      "title": "Product Manager (Tech)",
      "category": "Business & Product",
      "matchScore": 79,
      "fitBadge": "promising",
      "whyItMatches": "Blends technology understanding with structured strategic prioritization.",
      "topStrengths": [
        { "dimension": "Strategic Vision", "score": 80 },
        { "dimension": "Cross-Functional Thinking", "score": 78 }
      ],
      "potentialChallenges": ["Managing ambiguity without direct authority"],
      "recommendedSubjects": ["Economics", "Computer Science", "English"],
      "keyTools": ["Jira", "Figma", "Mixpanel"],
      "growthOutlook": "High influence and high compensation pathway."
    }
  ],
  "identifiedStrengths": [
    "High capacity for logical decomposition and structured problem solving",
    "Self-directed perseverance when learning challenging STEM topics"
  ],
  "growthOpportunities": [
    "Build real-world open-source portfolio projects to demonstrate practical mastery",
    "Practice technical storytelling and English presentation skills"
  ],
  "recommendedFocusAreas": [
    "Master core data structures and Python/TypeScript fundamentals",
    "Achieve IELTS 7.0+ for international scholarship qualifications"
  ],
  "estimatedConfidence": 93,
  "totalQuestionsAnswered": ${answers.length || 16}
}`;

    const data = await generateJsonContent(prompt, systemInstruction);
    res.json({
      id: 'eval_' + Date.now(),
      timestamp: new Date().toISOString(),
      ...data,
    });
  } catch (error: any) {
    console.error('Error in /api/assessment/evaluate:', error);
    res.status(500).json({
      error: 'Failed to evaluate assessment.',
      details: error.message,
    });
  }
});

// ============================================================================
// 2. PERSONAL CAREER ROADMAP GENERATION ENDPOINT
// ============================================================================
app.post('/api/roadmap/generate', async (req, res) => {
  try {
    const {
      studentProfile,
      assessmentResult,
      targetCareer,
      targetUniversity,
      timelineYears = 1,
      language = 'en',
    } = req.body;

    if (!targetCareer) {
      return res.status(400).json({ error: 'Target career is required.' });
    }

    const systemInstruction = `You are the Navigator AI Personal Career Roadmap Architect.
Your task is to generate an individualized, highly actionable education and career roadmap for a student.

CRITICAL PERSONALIZATION RULES:
1. Directly factor in the student's current education level, English proficiency, and known strengths/weaknesses.
2. Incorporate the target university's real admission requirements (e.g. Inha Tashkent math exam, MIT SAT/IELTS, WIUT entrance, or general university prerequisites).
3. Do NOT provide generic advice. Provide concrete tasks, high-value learning resources, explicit verification criteria, and a concrete 60-minute immediate action for today.
4. Output strictly valid JSON in the requested language: ${language.toUpperCase()}.`;

    const prompt = `Student Context:
Name: ${studentProfile?.name || 'Student'}
Age: ${studentProfile?.age || 18}
Education Level: ${studentProfile?.educationLevel || 'High School'}
English Proficiency: ${studentProfile?.englishLevel || 'Intermediate'}
Favorite Subjects: ${(studentProfile?.favoriteSubjects || []).join(', ')}
Study Goals: ${studentProfile?.studyGoals || 'Achieve top university admission'}
Assessment Archetype: ${assessmentResult?.profileArchetype || 'Systems Builder'}

Target Career:
Title: ${targetCareer.title}
Category: ${targetCareer.category || 'Tech'}

Target University:
${targetUniversity ? `Name: ${targetUniversity.name} (${targetUniversity.country})
Program: ${targetUniversity.programName || 'Computer Science'}
Degree: ${targetUniversity.degreeType || "Bachelor's"}` : 'Targeting top regional and international universities'}

Timeline: ${timelineYears} Year(s)

Generate a personalized roadmap adhering to this JSON schema:
{
  "title": "Strategic Roadmap Title",
  "customTimeline": "${timelineYears}-Year Personalized Plan",
  "overallStrategy": "2-3 sentences synthesizing the customized strategy for this specific student and target university",
  "phases": [
    {
      "phaseNumber": 1,
      "name": "Phase 1: Academic & Language Foundation",
      "subtitle": "Clear Subtitle",
      "timeframe": "Months 1 - 3",
      "primaryGoal": "Primary outcome",
      "tasks": [
        {
          "id": "p1-t1",
          "title": "Specific actionable task",
          "description": "Concrete how-to instructions with deliverable",
          "priority": "critical",
          "timeEstimate": "40 hours",
          "category": "language_tests",
          "resources": [
            { "title": "Resource Name", "type": "platform", "urlHint": "" }
          ],
          "completionCriteria": "Measurable proof of completion"
        }
      ]
    }
  ],
  "currentWeeklyGoals": [
    {
      "id": "w1",
      "taskText": "Concrete action for this week",
      "priority": "high",
      "completed": false
    },
    {
      "id": "w2",
      "taskText": "Second action item for this week",
      "priority": "medium",
      "completed": false
    }
  ],
  "immediateNextActionToday": {
    "action": "The single highest-yield concrete action the student can finish TODAY in 45-60 minutes",
    "timeRequiredMinutes": 45,
    "deliverable": "Specific document, code file, or solution sheet created",
    "guidePrompt": "Step-by-step guidance prompt on how to execute immediately"
  },
  "criticalMilestones": [
    {
      "milestone": "Key milestone title",
      "targetHorizon": "e.g. Month 3",
      "proofOfCompletion": "Exact verifiable proof"
    }
  ]
}`;

    const data = await generateJsonContent(prompt, systemInstruction);
    res.json({
      id: 'roadmap_' + Date.now(),
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      studentName: studentProfile?.name || 'Student',
      targetCareer,
      targetUniversity,
      ...data,
    });
  } catch (error: any) {
    console.error('Error in /api/roadmap/generate:', error);
    res.status(500).json({
      error: 'Failed to generate personal roadmap.',
      details: error.message,
    });
  }
});

// ============================================================================
// 3. CAREER COMPARISON ENDPOINT
// ============================================================================
app.post('/api/career/compare', async (req, res) => {
  try {
    const { careerIds = [], studentProfile, language = 'en' } = req.body;

    const systemInstruction = `You are the Navigator AI Career Comparison Specialist.
Provide an objective, nuanced comparison of the selected careers for the given student profile.
Language: ${language.toUpperCase()}. Output strictly JSON.`;

    const prompt = `Compare these careers for student ${studentProfile?.name || 'Student'}:
Careers: ${careerIds.join(', ')}
Student Profile: Level: ${studentProfile?.educationLevel}, Strengths: ${(studentProfile?.academicStrengths || []).join(', ')}, Goals: ${studentProfile?.studyGoals}

Return JSON with format:
{
  "summary": "Executive summary comparing these career trajectories",
  "comparisonMatrix": [
    {
      "dimension": "Cognitive / Analytical Demand",
      "ratings": {
        "${careerIds[0]}": "Description & rating",
        "${careerIds[1] || 'career2'}": "Description & rating"
      }
    },
    {
      "dimension": "Math & Coding Intensity",
      "ratings": {
        "${careerIds[0]}": "Description",
        "${careerIds[1] || 'career2'}": "Description"
      }
    },
    {
      "dimension": "Uzbekistan Market Demand",
      "ratings": {
        "${careerIds[0]}": "Description",
        "${careerIds[1] || 'career2'}": "Description"
      }
    },
    {
      "dimension": "Global Remote Flexibility",
      "ratings": {
        "${careerIds[0]}": "Description",
        "${careerIds[1] || 'career2'}": "Description"
      }
    }
  ],
  "recommendationForStudent": "Personalized recommendation on which one to choose first and why"
}`;

    const data = await generateJsonContent(prompt, systemInstruction);
    res.json(data);
  } catch (error: any) {
    console.error('Error in /api/career/compare:', error);
    res.status(500).json({ error: 'Failed to compare careers', details: error.message });
  }
});

// ============================================================================
// 4. CONTEXTUAL AI CHAT GUIDANCE (Inside Career, University, or Roadmap)
// ============================================================================
app.post('/api/contextual-chat', async (req, res) => {
  try {
    const {
      message,
      contextType, // 'career' | 'university' | 'roadmap'
      contextData,
      studentProfile,
      history = [],
      language = 'en',
    } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemInstruction = `You are the contextual Navigator AI Student Advisor.
You provide precise, intelligent, encouraging, and actionable guidance for students aged 14-22.
You are currently helping the student in the context of: ${contextType?.toUpperCase() || 'GENERAL GUIDANCE'}.
Context Data: ${JSON.stringify(contextData || {})}
Language: ${language.toUpperCase()}.
Do NOT generate generic chatbot pleasantries. Answer directly with factual clarity, steps, or insights.`;

    const prompt = `Student Question: "${message}"
Recent History:
${history.slice(-4).map((h: any) => `${h.role}: ${h.content}`).join('\n')}

Provide an authoritative, clear, and encouraging answer in markdown format.`;

    const { text, modelUsed } = await generateTextContent(prompt, systemInstruction, 0.4);

    res.json({
      id: 'msg_' + Date.now(),
      role: 'assistant',
      content: text || 'I could not generate a response. Please try again.',
      modelUsed,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/contextual-chat:', error);
    // Provide a helpful fallback answer instead of a 500 error if models are busy
    const { language = 'en' } = req.body || {};
    const isUz = language === 'uz';
    const isRu = language === 'ru';
    const fallbackText = isUz
      ? "Kechirasiz, sun'iy intellekt xizmati hozirda band. Asosiy maslahat: (1) Kirish imtihonlari va IELTS 7.0+ uchun oldindan tayyorlaning, (2) Matematika va mantiqiy bilimlarni mustahkamlang, (3) Real amaliy loyihalarni portfoliosiga kiriting."
      : isRu
      ? "В данный момент сервис AI испытывает высокую нагрузку. Основные рекомендации: (1) Заранее готовьтесь к профильным экзаменам и IELTS 7.0+, (2) Углубляйте знания по профильной математике, (3) Создавайте практические проекты в портфолио."
      : "The AI service is currently handling high demand. Key advice: (1) Prepare early for entrance exams and target IELTS 7.0+, (2) Deepen your mathematics and problem-solving foundations, (3) Build 2-3 real-world portfolio projects to demonstrate tangible skills.";

    res.json({
      id: 'msg_' + Date.now(),
      role: 'assistant',
      content: fallbackText,
      modelUsed: 'fallback',
      timestamp: new Date().toISOString(),
    });
  }
});

// ============================================================================
// 5. APPLICATION DOCUMENT ASSISTANT (Motivation Letters, CVs, Statements)
// ============================================================================
app.post('/api/analyze-document', async (req, res) => {
  try {
    const {
      text,
      documentType = 'motivation_letter',
      targetUniversityOrProgram = '',
      language = 'en',
    } = req.body;

    if (!text || text.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide at least 20 characters of document text.' });
    }

    const systemInstruction = `You are the Navigator AI Application Document Assistant.
You audit student application documents (Motivation Letters, Personal Statements, CVs, Admission Essays) against international admissions criteria.
Be constructive, honest, and rigorous. Highlight genuine strengths, spot missing critical proofs (metrics, motivations, academic curiosity), and give concrete rewrite recommendations.
Do NOT fabricate experiences.
Language: ${language.toUpperCase()}. Output strictly JSON.`;

    const prompt = `Document Type: ${documentType}
Target Institution / Program: ${targetUniversityOrProgram || 'General Admissions'}
Document Text:
"""
${text.slice(0, 15000)}
"""

Audit this document and return JSON with schema:
{
  "documentType": "${documentType}",
  "targetUniversityOrProgram": "${targetUniversityOrProgram}",
  "wordCount": ${text.split(/\s+/).length},
  "overallRatingScore": 82,
  "executiveReview": "2-3 paragraphs providing an honest admissions officer review of tone, structure, and compellingness",
  "keyStrengthsFound": [
    "Specific strength 1",
    "Specific strength 2",
    "Specific strength 3"
  ],
  "missingCriticalInformation": [
    "Missing proof point 1 (e.g. Why this specific university curriculum?)",
    "Missing proof point 2 (e.g. Concrete project examples)"
  ],
  "concreteImprovementPoints": [
    {
      "section": "Opening Paragraph / Hook",
      "currentWeakness": "Too generic or cliché",
      "recommendedRewrite": "Example stronger framing"
    },
    {
      "section": "Academic & Project Proof",
      "currentWeakness": "Lacks specific technical depth",
      "recommendedRewrite": "Example stronger framing"
    }
  ],
  "alignmentWithAdmissionsCriteria": [
    { "criterion": "Intellectual Curiosity & Rigor", "status": "strong", "note": "Clear evidence presented" },
    { "criterion": "Clear Motivation for Specific Program", "status": "needs_work", "note": "Needs more specifics on faculty/curriculum" },
    { "criterion": "Leadership & Initiative", "status": "strong", "note": "Good extracurricular mention" },
    { "criterion": "Clarity & Academic Writing Tone", "status": "strong", "note": "Grammatically sound" }
  ],
  "grammarAndToneFeedback": "Assessment of voice, style, and tone consistency"
}`;

    const data = await generateJsonContent(prompt, systemInstruction);
    res.json({
      id: 'doc_' + Date.now(),
      timestamp: new Date().toISOString(),
      ...data,
    });
  } catch (error: any) {
    console.error('Error in /api/analyze-document:', error);
    res.status(500).json({ error: 'Failed to analyze document', details: error.message });
  }
});

// Start Express and Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Navigator AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
