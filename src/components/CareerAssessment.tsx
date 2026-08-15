import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Brain,
  Layers,
  Award,
  BookOpen,
  GraduationCap,
  RotateCcw,
  Compass,
  Zap,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Cpu,
  Target,
  Send,
  HelpCircle,
  BarChart3,
  MapPin,
  FileText,
  UserCheck
} from 'lucide-react';
import {
  Language,
  StudentProfile,
  AssessmentResult,
  CareerMatchResult,
  AdaptiveAssessmentQuestion,
  AssessmentState
} from '../types';
import { SAMPLE_DEMO_ASSESSMENT } from '../lib/demoData';
import { I18N } from '../lib/i18n';

interface CareerAssessmentProps {
  language: Language;
  studentProfile: StudentProfile;
  assessmentResult: AssessmentResult | null;
  onSaveAssessmentResult: (result: AssessmentResult) => void;
  onSelectCareer: (careerId: string) => void;
  onExploreUniversitiesForCareer: (careerId: string) => void;
  onBuildRoadmapForCareer: (careerId: string) => void;
}

export const CareerAssessment: React.FC<CareerAssessmentProps> = ({
  language,
  studentProfile,
  assessmentResult,
  onSaveAssessmentResult,
  onSelectCareer,
  onExploreUniversitiesForCareer,
  onBuildRoadmapForCareer,
}) => {
  const t = I18N[language]?.assessment || I18N.en.assessment;

  // Adaptive Interview State
  const [assessmentState, setAssessmentState] = useState<AssessmentState | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<AdaptiveAssessmentQuestion | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [customAnswerText, setCustomAnswerText] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [isLiveAI, setIsLiveAI] = useState<boolean>(true);
  const [isOfflineDemo, setIsOfflineDemo] = useState<boolean>(false);
  const [modelUsed, setModelUsed] = useState<string>('gemini-3.7-flash');
  
  // Loading & Flow State
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingPhase, setLoadingPhase] = useState<string>('Initializing adaptive interview...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isServiceUnavailable, setIsServiceUnavailable] = useState<boolean>(false);

  // Initialize or resume interview when component mounts or retake is triggered
  useEffect(() => {
    if (!assessmentResult && !currentQuestion && !isInitializing && !isServiceUnavailable) {
      startNewAssessment(false);
    }
  }, [assessmentResult]);

  const startNewAssessment = async (useOfflineDemo = false) => {
    setIsInitializing(true);
    setErrorMsg(null);
    setIsServiceUnavailable(false);
    setSelectedOptionId(null);
    setCustomAnswerText('');
    setShowCustomInput(false);
    setIsOfflineDemo(useOfflineDemo);
    
    setLoadingPhase(
      useOfflineDemo
        ? (language === 'uz' ? "Diagnostik savol yuklanmoqda..." : language === 'ru' ? "Загрузка диагностического опросника..." : "Loading structured diagnostic questionnaire...")
        : language === 'uz'
        ? "Gemini AI profilingiz asosida moslashtirilgan 1-savolni shakllantirmoqda..."
        : language === 'ru'
        ? "Gemini AI генерирует первый адаптивный вопрос на основе вашего профиля..."
        : "Gemini AI is generating Question 1 tailored to your student profile..."
    );

    try {
      const response = await fetch('/api/assessment/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentProfile,
          language,
          isOfflineDemo: useOfflineDemo,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        if (response.status === 503 || data.isServiceUnavailable) {
          setIsServiceUnavailable(true);
          setErrorMsg(data.message || (language === 'uz' ? "Gemini AI hozirda yuqori yuklamada ishlamoqda. Darhol qayta urinishingiz yoki oflayn demo rejimiga o'tishingiz mumkin." : language === 'ru' ? "Gemini AI испытывает высокую нагрузку. Вы можете повторить попытку или перейти в автономный демо-режим." : "Gemini AI is experiencing high demand. You can retry immediately or switch to offline demo mode."));
        } else {
          setErrorMsg(data.message || 'Failed to initialize assessment. Please try again.');
        }
        return;
      }

      setCurrentQuestion(data.question);
      setAssessmentState(data.assessmentState);
      setIsLiveAI(Boolean(data.isLiveAI));
      setModelUsed(data.modelUsed || (useOfflineDemo ? 'offline-demo' : 'gemini-3.7-flash'));
    } catch (err: any) {
      console.error('Error initializing assessment:', err);
      setIsServiceUnavailable(true);
      setErrorMsg(language === 'uz' ? "Gemini AI xizmatiga ulanib bo'lmadi. Qayta urinib ko'ring." : language === 'ru' ? "Не удалось связаться с сервисом Gemini. Попробуйте снова." : "Could not establish connection to the Gemini interview service.");
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion) return;
    if (!selectedOptionId && !customAnswerText.trim()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    const selectedOption = currentQuestion.options.find((opt) => opt.id === selectedOptionId);
    const selectedOptionText = selectedOption ? selectedOption.text : customAnswerText.trim();

    setLoadingPhase(
      isOfflineDemo
        ? (language === 'uz' ? "Javob tahlil qilinmoqda..." : language === 'ru' ? "Обработка ответа..." : "Processing answer and updating cognitive state...")
        : language === 'uz'
        ? "Gemini javobingizni tahlil qilib keyingi savolni shakllantirmoqda..."
        : language === 'ru'
        ? "Gemini анализирует ответ и формулирует следующий целевой вопрос..."
        : "Gemini is analyzing your answer and formulating the next targeted question..."
    );

    try {
      const response = await fetch('/api/assessment/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentState,
          currentQuestion,
          selectedOptionId,
          selectedOptionText,
          customAnswerText: customAnswerText.trim() || undefined,
          studentProfile,
          language,
          isOfflineDemo,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        if (response.status === 503 || data.isServiceUnavailable) {
          setErrorMsg(data.message || (language === 'uz' ? "Gemini AI yuqori yuklamada. Qayta urinib ko'ring." : language === 'ru' ? "Gemini AI испытывает высокую нагрузку. Повторите попытку." : "Gemini AI is experiencing high demand. Please try again."));
        } else {
          setErrorMsg(data.message || 'Failed to process answer. Please try again.');
        }
        return;
      }

      if (data.isComplete && data.finalResult) {
        // Assessment completed! Save result
        setAssessmentState(data.assessmentState);
        onSaveAssessmentResult(data.finalResult);
      } else if (data.nextQuestion) {
        // Continue to next dynamic question
        setCurrentQuestion(data.nextQuestion);
        setAssessmentState(data.assessmentState);
        setIsLiveAI(Boolean(data.isLiveAI));
        setModelUsed(data.modelUsed || (isOfflineDemo ? 'offline-demo' : 'gemini-3.7-flash'));
        setSelectedOptionId(null);
        setCustomAnswerText('');
        setShowCustomInput(false);
      }
    } catch (err: any) {
      console.error('Error submitting answer:', err);
      setErrorMsg(language === 'uz' ? "AI serveriga yetib bo'lmadi. Qayta yuboring." : language === 'ru' ? "Сбой связи с сервером AI. Попробуйте еще раз." : "Failed to reach AI assessment server. Please try submitting again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(null);
    setAssessmentState(null);
    setSelectedOptionId(null);
    setCustomAnswerText('');
    setShowCustomInput(false);
    startNewAssessment(false);
  };

  // -------------------------------------------------------------
  // VIEW A: SERVICE UNAVAILABLE / RETRY SCREEN
  // -------------------------------------------------------------
  if (isServiceUnavailable && !currentQuestion && !isInitializing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16 text-center">
        <div className="rounded-3xl border border-amber-200 bg-white p-6 sm:p-10 shadow-xs space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <AlertCircle className="h-8 w-8 text-amber-600" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === 'uz' ? "Gemini AI Yuqori Yuklama Holati" : language === 'ru' ? "Высокая нагрузка на Gemini AI" : "Gemini AI Demand Spike Detected"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {errorMsg || (language === 'uz' ? "Gemini AI xizmati hozirda global miqyosda ko'p so'rovlarni qayta ishlamoqda." : language === 'ru' ? "Модель Gemini AI обрабатывает повышенный объем запросов." : "The live Gemini AI model is currently handling high global request volume.")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="retry-live-ai-assessment-btn"
              onClick={() => startNewAssessment(false)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white hover:bg-blue-700 active:scale-95 transition cursor-pointer shadow-xs"
            >
              <Zap className="h-4 w-4" />
              <span>{language === 'uz' ? "Qayta urinish (Jonli AI)" : language === 'ru' ? "Повторить попытку (Live AI)" : "Retry Live AI Interview"}</span>
            </button>

            <button
              id="start-offline-demo-assessment-btn"
              onClick={() => startNewAssessment(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-slate-100 border border-slate-200 px-5 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-200 active:scale-95 transition cursor-pointer"
            >
              <span>{language === 'uz' ? "Oflayn demo rejimida davom etish" : language === 'ru' ? "Продолжить в офлайн демо-режиме" : "Continue with Offline Demo Mode"}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400">
            {language === 'uz'
              ? "Oflayn demo rejimi Gemini API bilan bog'lanmasdan tizimli diagnostika o'tkazadi."
              : language === 'ru'
              ? "Офлайн демо-режим использует встроенный диагностический модуль без обращения к внешнему API."
              : "Offline demo mode uses structured cognitive questions without contacting the live Gemini API."}
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW B: INITIALIZING OR SUBMITTING LOADING STATE
  // -------------------------------------------------------------
  if (isInitializing || (isSubmitting && !currentQuestion)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16 text-center">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
            <Sparkles className="h-8 w-8 animate-spin text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t.analyzingTitle}</h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">{loadingPhase}</p>
          <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full bg-blue-600 animate-pulse w-3/4 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW B: RESULTS DASHBOARD (If assessment result exists)
  // -------------------------------------------------------------
  if (assessmentResult) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Header Summary Banner */}
        <div
          id="assessment-results-summary-banner"
          className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/90 via-white to-slate-50 p-6 sm:p-10 shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-1 text-xs font-bold shadow-2xs">
                  <Brain className="h-3.5 w-3.5" />
                  <span>{t.profileArchetype}</span>
                </div>
                {isLiveAI ? (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Gemini ({modelUsed})</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 border border-amber-200">
                    <Zap className="h-3 w-3 text-amber-600" />
                    <span>Offline Demo Diagnostic</span>
                  </span>
                )}
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {assessmentResult.profileArchetype}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                {assessmentResult.archetypeSummary}
              </p>
              
              {/* Interview Meta Stats */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>
                    {assessmentResult.totalQuestionsAnswered || assessmentState?.answers.length || 16} {language === 'uz' ? "Savol tahlil qilindi" : language === 'ru' ? "Вопросов исследовано" : "Questions Evaluated"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  <span>
                    {language === 'uz' ? "Ishonchlilik" : language === 'ru' ? "Уверенность" : "Confidence Score"}: {assessmentResult.estimatedConfidence || assessmentState?.estimatedConfidence || 94}%
                  </span>
                </div>
              </div>
            </div>

            <button
              id="retake-assessment-btn"
              onClick={handleRetake}
              className="self-start md:self-center flex items-center gap-2 rounded-xl bg-white border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.retakeBtn}</span>
            </button>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="flex items-start gap-3 rounded-2xl bg-amber-50 border border-amber-200/70 p-4 text-xs text-amber-900">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>AI Educational Guidance Notice:</strong> {t.aiCompatibilityNotice || "Compatibility scores are AI-generated guidance indicators based on your specific responses, designed to help explore relevant university pathways. They are not absolute guarantees."}
          </div>
        </div>

        {/* Main Grid: Matches (Left) & Dimensional Strengths (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Career Matches */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span>{t.matchesTitle}</span>
              </h2>
              <span className="text-xs font-medium text-slate-500">
                {assessmentResult.careerMatches.length} Pathways Identified
              </span>
            </div>

            <div className="space-y-4">
              {assessmentResult.careerMatches.map((match, idx) => (
                <div
                  key={match.careerId || idx}
                  id={`career-match-card-${match.careerId || idx}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 hover:border-blue-300 hover:shadow-xs transition duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                          {match.category}
                        </span>
                        {match.fitBadge === 'exceptional' && (
                          <span className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold">
                            Top Recommendation
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">
                        {match.title}
                      </h3>
                    </div>

                    {/* Compatibility Badge */}
                    <div className="flex items-center gap-2 sm:text-right">
                      <div className="rounded-xl bg-blue-50 border border-blue-100 px-3 py-1.5 text-center">
                        <div className="text-lg font-black text-blue-700">{match.matchScore}%</div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-blue-600/80">
                          AI Compatibility
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Why It Matches Explanation */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <strong className="text-slate-800 font-semibold">{language === 'uz' ? "Nega bu kasb mos:" : language === 'ru' ? "Почему подходит:" : "Why this fits your profile:"} </strong>
                    {match.whyItMatches}
                  </p>

                  {/* Top Strengths Pills */}
                  {match.topStrengths && match.topStrengths.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[11px] font-semibold text-slate-500 mr-1">
                        {language === 'uz' ? "Asosiy kuchli tomonlar:" : language === 'ru' ? "Ключевые сильные стороны:" : "Key Supporting Strengths:"}
                      </span>
                      {match.topStrengths.map((st, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-lg bg-blue-50 text-blue-800 text-[11px] font-medium px-2 py-0.5 border border-blue-100"
                        >
                          {st.dimension} ({st.score}%)
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                    <button
                      id={`explore-details-btn-${match.careerId}`}
                      onClick={() => onSelectCareer(match.careerId)}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer min-h-[36px]"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-slate-500" />
                      <span>{language === 'uz' ? "Kasb tafsilotlari" : language === 'ru' ? "Подробнее о профессии" : "Explore Career Details"}</span>
                    </button>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        id={`view-unis-btn-${match.careerId}`}
                        onClick={() => onExploreUniversitiesForCareer(match.careerId)}
                        className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-200 transition cursor-pointer min-h-[36px]"
                      >
                        <GraduationCap className="h-3.5 w-3.5 text-slate-600" />
                        <span>{language === 'uz' ? "Universitetlar" : language === 'ru' ? "Университеты" : "View Universities"}</span>
                      </button>
                      <button
                        id={`build-roadmap-btn-${match.careerId}`}
                        onClick={() => onBuildRoadmapForCareer(match.careerId)}
                        className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-2xs cursor-pointer min-h-[36px]"
                      >
                        <Compass className="h-3.5 w-3.5 text-blue-200" />
                        <span>{language === 'uz' ? "Yo'l xaritasi tuzish" : language === 'ru' ? "Построить маршрут" : "Build Roadmap"}</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Right 1 Col: Dimensional Strengths & Focus Areas */}
          <div className="space-y-6">
            
            {/* Dimensional Strengths Meter */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span>{t.topStrengths}</span>
              </h3>

              <div className="space-y-3.5">
                {(assessmentResult.topDimensions || []).map((dim, dIdx) => (
                  <div key={dIdx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{dim.label}</span>
                      <span className="font-bold text-blue-700">{dim.score}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>
                    {dim.explanation && (
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {dim.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Identified Strengths */}
            {assessmentResult.identifiedStrengths && assessmentResult.identifiedStrengths.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Award className="h-4 w-4 text-emerald-600" />
                  <span>{language === 'uz' ? "Aniqlangan ustunliklar" : language === 'ru' ? "Проявленные преимущества" : "Demonstrated Strengths"}</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {assessmentResult.identifiedStrengths.map((str, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Focus Areas */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                <Compass className="h-4 w-4 text-indigo-600" />
                <span>{language === 'uz' ? "Tavsiya etilgan e'tibor nuqtalari" : language === 'ru' ? "Зоны внимания" : "Recommended Focus Areas"}</span>
              </h3>

              <ul className="space-y-2 text-xs text-slate-600">
                {(assessmentResult.recommendedFocusAreas || []).map((rec, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW C: ADAPTIVE AI QUESTIONNAIRE (LIVE ADAPTIVE INTERVIEW)
  // -------------------------------------------------------------
  if (!currentQuestion) {
    return null;
  }

  const currentQNum = currentQuestion.questionNumber || (assessmentState?.answers.length || 0) + 1;
  const estimatedConfidence = assessmentState?.estimatedConfidence || Math.min(95, Math.round(10 + currentQNum * 4.5));
  const candidateCareers = assessmentState?.candidateCareers || [];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Top Header & Adaptive Interview Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2">
          {isLiveAI ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Gemini Adaptive Interview ({modelUsed})</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-700 border border-amber-200 shadow-2xs">
              <Zap className="h-3.5 w-3.5 text-amber-600" />
              <span>Offline Demo Mode</span>
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Adaptive Progress & Confidence Indicator */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
            <span>{language === 'uz' ? `${currentQNum}-Savol` : language === 'ru' ? `Вопрос ${currentQNum}` : `Question ${currentQNum}`}</span>
            <span className="text-slate-400 font-normal hidden sm:inline">
              | {isLiveAI ? 'Live Dynamic Inquiry' : 'Diagnostic Questionnaire'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-700 font-bold">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>{language === 'uz' ? "Ishonchlilik" : language === 'ru' ? "Уверенность" : "Profile Confidence"}: {estimatedConfidence}%</span>
          </div>
        </div>

        {/* Animated Progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 rounded-full"
            style={{ width: `${Math.max(10, Math.min(100, estimatedConfidence))}%` }}
          />
        </div>

        {/* Emerging Candidate Signals & Diagnostic Goal */}
        <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
          {currentQuestion.differentiatingGoal ? (
            <div className="flex items-center gap-1.5 text-slate-600">
              <Target className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span className="font-semibold text-slate-700">{language === 'uz' ? "Maqsad:" : language === 'ru' ? "Фокус:" : "Focus:"}</span>
              <span className="truncate max-w-md">{currentQuestion.differentiatingGoal}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-slate-500">
              <Cpu className="h-3 w-3 text-blue-500" />
              <span>Analyzing cognitive problem-solving dimensions</span>
            </div>
          )}

          {candidateCareers.length > 0 && (
            <div className="flex items-center gap-1 text-slate-500">
              <span className="font-medium">{language === 'uz' ? "Yo'nalishlar:" : language === 'ru' ? "Проверяемые треки:" : "Testing Pathways:"}</span>
              <span className="font-bold text-blue-700">{candidateCareers.slice(0, 2).join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs space-y-6">
        
        {/* Question Header & Context */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {language === 'uz' ? `Diagnostik So'rov #${currentQNum}` : language === 'ru' ? `Диагностический Вопрос #${currentQNum}` : `Diagnostic Inquiry #${currentQNum}`}
            </div>
            {currentQuestion.dimensionTags && currentQuestion.dimensionTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {currentQuestion.dimensionTags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                    {tag.replace('_', ' ')}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentQuestion.questionText}
          </h2>

          {currentQuestion.contextNote && (
            <p className="mt-2 text-xs text-slate-500 italic bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/60">
              💡 {currentQuestion.contextNote}
            </p>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                id={`assessment-option-${option.id || idx}`}
                onClick={() => handleSelectOption(option.id)}
                disabled={isSubmitting}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-start gap-3.5 cursor-pointer min-h-[52px] ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 text-slate-900 font-medium'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 text-slate-700'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                  {option.text}
                </div>
              </button>
            );
          })}
        </div>

        {/* Optional Custom Detail Expander */}
        <div className="pt-1">
          {!showCustomInput ? (
            <button
              id="expand-custom-answer-input-btn"
              onClick={() => setShowCustomInput(true)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{language === 'uz' ? "O'z fikringizni batafsil yozish (ixtiyoriy)" : language === 'ru' ? "Добавить свой комментарий или пояснение (опционально)" : "Add custom nuance or explain your thinking (optional)"}</span>
            </button>
          ) : (
            <div className="space-y-2 rounded-2xl bg-slate-50 p-3.5 border border-slate-200">
              <label className="block text-xs font-bold text-slate-700">
                {language === 'uz' ? "Shaxsiy fikringiz yoki aniqlik:" : language === 'ru' ? "Ваш личный комментарий:" : "Your custom perspective / elaboration:"}
              </label>
              <textarea
                id="custom-answer-textarea"
                value={customAnswerText}
                onChange={(e) => setCustomAnswerText(e.target.value)}
                placeholder={
                  language === 'uz'
                    ? "Masalan: Men algoritmlarni yechishni yaxshi ko'raman, lekin foydalanuvchi interfeysini chiroyli qilish ham menga qiziq..."
                    : language === 'ru'
                    ? "Например: Мне нравится решать алгоритмические задачи, но также важно создавать удобные интерфейсы..."
                    : "E.g., I love solving complex algorithms, but I also care deeply about building intuitive user interfaces..."
                }
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                rows={2}
              />
            </div>
          )}
        </div>

        {/* Error message if any */}
        {errorMsg && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Bottom Submission Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="text-[11px] text-slate-400 order-2 sm:order-1">
            {isSubmitting
              ? (language === 'uz' ? "Baholanmoqda va moslashtirilmoqda..." : language === 'ru' ? "Оценка и адаптация..." : "Evaluating & adapting...")
              : (language === 'uz' ? "O'zingizga xos javobni tanlang" : language === 'ru' ? "Выберите подходящий вариант" : "Select your natural response")}
          </div>

          <button
            id="submit-assessment-answer-btn"
            onClick={handleSubmitAnswer}
            disabled={(!selectedOptionId && !customAnswerText.trim()) || isSubmitting}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-bold px-6 py-3.5 rounded-xl transition cursor-pointer shadow-xs min-h-[44px] order-1 sm:order-2 ${
              (selectedOptionId || customAnswerText.trim()) && !isSubmitting
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>{language === 'uz' ? "Tahlil qilinmoqda..." : language === 'ru' ? "Анализ профиля..." : "Analyzing Profile..."}</span>
              </>
            ) : (
              <>
                <span>{language === 'uz' ? "Javobni tasdiqlash & Keyingi savol" : language === 'ru' ? "Ответить и перейти далее" : "Submit & Next Question"}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
