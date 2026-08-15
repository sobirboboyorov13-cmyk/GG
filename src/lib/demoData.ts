import { AssessmentResult, PersonalCareerRoadmap } from '../types';

export const SAMPLE_DEMO_ASSESSMENT: AssessmentResult = {
  id: 'demo-eval-001',
  timestamp: new Date().toISOString(),
  profileArchetype: 'The Visionary Systems Builder & AI Architect',
  archetypeSummary: 'Demonstrates exceptional mathematical intuition, high technical adaptability, systematic logical reasoning, and a passion for building scalable intelligent products.',
  topDimensions: [
    {
      dimension: 'technology_interest',
      label: 'Technology & AI Interest',
      score: 96,
      category: 'interest',
      explanation: 'Intense natural curiosity toward software frameworks, machine learning models, and cutting-edge digital systems.'
    },
    {
      dimension: 'analytical_thinking',
      label: 'Analytical & Mathematical Thinking',
      score: 93,
      category: 'cognitive',
      explanation: 'Strong capacity for decomposing intricate problems into logical axioms and computational structures.'
    },
    {
      dimension: 'problem_solving',
      label: 'Algorithmic Problem Solving',
      score: 91,
      category: 'cognitive',
      explanation: 'High perseverance and enjoyment in debugging complex bottlenecks and optimizing edge-case performance.'
    },
    {
      dimension: 'creativity',
      label: 'Systemic Product Innovation',
      score: 84,
      category: 'cognitive',
      explanation: 'Ability to synthesize abstract user needs into functional, high-leverage digital architectures.'
    },
    {
      dimension: 'independence',
      label: 'Self-Directed Autonomy',
      score: 88,
      category: 'workstyle',
      explanation: 'Excels when given clear strategic ownership, deep focus time, and the freedom to experiment.'
    }
  ],
  allDimensions: [
    { dimension: 'technology_interest', label: 'Technology Interest', score: 96, category: 'interest', explanation: 'Top-tier tech inclination' },
    { dimension: 'analytical_thinking', label: 'Analytical Thinking', score: 93, category: 'cognitive', explanation: 'Mathematical rigor' },
    { dimension: 'problem_solving', label: 'Problem Solving', score: 91, category: 'cognitive', explanation: 'System debugging' },
    { dimension: 'independence', label: 'Independence', score: 88, category: 'workstyle', explanation: 'High self-reliance' },
    { dimension: 'creativity', label: 'Creative Synthesis', score: 84, category: 'cognitive', explanation: 'Architecture innovation' },
    { dimension: 'leadership', label: 'Technical Leadership', score: 78, category: 'workstyle', explanation: 'Project direction & code reviews' },
    { dimension: 'communication', label: 'Technical Communication', score: 72, category: 'workstyle', explanation: 'Technical writing & presentations' }
  ],
  careerMatches: [
    {
      careerId: 'software-engineer',
      title: 'Software Engineer',
      category: 'Tech & AI',
      matchScore: 95,
      fitBadge: 'exceptional',
      whyItMatches: 'Your answers indicate exceptional mathematical intuition, deep curiosity toward software systems, comfort with independent problem-solving, and a natural drive to build scalable applications.',
      topStrengths: [
        { dimension: 'Technology Interest', score: 96 },
        { dimension: 'Analytical Thinking', score: 93 },
        { dimension: 'Algorithmic Problem Solving', score: 91 },
        { dimension: 'Autonomous Learning', score: 88 }
      ],
      potentialChallenges: ['Balancing rapid feature delivery with perfect architecture', 'Communicating non-technical concepts to business stakeholders'],
      recommendedSubjects: ['Advanced Mathematics (Calculus & Discrete Math)', 'Informatics / Data Structures', 'Physics', 'English Language'],
      keyTools: ['TypeScript', 'Python', 'Git & GitHub', 'PostgreSQL', 'Docker'],
      growthOutlook: 'Very high global demand with rapid progression to Tech Lead, Solutions Architect, or Startup Founder.'
    },
    {
      careerId: 'data-scientist-ai',
      title: 'Data Scientist & AI Specialist',
      category: 'Tech & AI',
      matchScore: 92,
      fitBadge: 'exceptional',
      whyItMatches: 'High compatibility driven by your strong affinity for higher mathematics, probabilistic reasoning, and passion for training machine learning algorithms to uncover complex patterns.',
      topStrengths: [
        { dimension: 'Mathematical Modeling', score: 95 },
        { dimension: 'AI & Data Interest', score: 94 },
        { dimension: 'Research Rigor', score: 89 }
      ],
      potentialChallenges: ['Data cleaning overhead', 'Translating statistical insights into corporate business decisions'],
      recommendedSubjects: ['Linear Algebra & Calculus', 'Probability & Statistics', 'Python Programming', 'English'],
      keyTools: ['PyTorch', 'Pandas', 'Jupyter', 'Scikit-Learn', 'SQL'],
      growthOutlook: 'One of the fastest-growing global tech disciplines with top-tier compensation.'
    },
    {
      careerId: 'cybersecurity-analyst',
      title: 'Cybersecurity & Defense Specialist',
      category: 'Tech & AI',
      matchScore: 86,
      fitBadge: 'strong',
      whyItMatches: 'Your methodical investigation style and passion for understanding system mechanics under the hood make you well-suited for vulnerability research and defensive architecture.',
      topStrengths: [
        { dimension: 'Systemic Investigation', score: 90 },
        { dimension: 'Network Architecture', score: 85 },
        { dimension: 'Critical Defense Thinking', score: 84 }
      ],
      potentialChallenges: ['High stakes on-call incident response', 'Constantly evolving threat landscape requiring 24/7 learning'],
      recommendedSubjects: ['Computer Networks', 'Operating Systems (Linux)', 'Discrete Math', 'English'],
      keyTools: ['Wireshark', 'Kali Linux', 'Burp Suite', 'Splunk'],
      growthOutlook: 'Huge talent deficit worldwide ensuring high job stability and security.'
    },
    {
      careerId: 'robotics-automation-engineer',
      title: 'Robotics & Automation Engineer',
      category: 'Engineering',
      matchScore: 83,
      fitBadge: 'strong',
      whyItMatches: 'Fits your strong physics intuition and interest in bridging intelligent algorithms with real physical hardware and sensors.',
      topStrengths: [
        { dimension: 'Hardware-Software Integration', score: 86 },
        { dimension: 'Physics & Kinematics', score: 84 }
      ],
      potentialChallenges: ['Longer prototyping cycles compared to pure software', 'Hardware component procurement costs'],
      recommendedSubjects: ['Physics (Mechanics & Electromagnetism)', 'Calculus', 'C/C++ Programming'],
      keyTools: ['ROS / ROS2', 'MATLAB / Simulink', 'SolidWorks', 'STM32 / Arduino'],
      growthOutlook: 'Critical driver for modern manufacturing, autonomous vehicles, and warehouse logistics.'
    }
  ],
  identifiedStrengths: [
    'Abstract mathematical modeling and computational decomposition',
    'High stamina for self-directed coding and technical problem solving',
    'Curiosity about cutting-edge AI architectures and developer tooling'
  ],
  growthOpportunities: [
    'Expand structured public portfolio projects (GitHub repositories & case studies)',
    'Enhance spoken English presentation skills for international scholarship interviews',
    'Deepen formal knowledge of Data Structures and Big-O complexity'
  ],
  recommendedFocusAreas: [
    'Master Python & TypeScript fundamentals with 3 full-stack projects',
    'Prepare for IELTS Academic to achieve 7.5+ for international scholarship eligibility',
    'Participate in national and regional hackathons to build collaborative leadership experience'
  ]
};

export const SAMPLE_DEMO_ROADMAP: PersonalCareerRoadmap = {
  id: 'roadmap-demo-001',
  title: 'Strategic Pathway: Software & AI Engineering → Inha University in Tashkent & Global Tech',
  createdAt: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
  studentName: 'Sobir Boboyorov',
  targetCareer: {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Tech & AI'
  },
  targetUniversity: {
    id: 'inha-tashkent',
    name: 'INHA University in Tashkent',
    country: 'Uzbekistan',
    programName: 'Computer Science and Software Engineering (SOCIE)',
    degreeType: "Bachelor's"
  },
  customTimeline: '12-Month Accelerated Plan (Admission + Core Technical Mastery)',
  overallStrategy: 'Combine high-scoring university admission prep (IELTS 7.0+ and Math entrance examination excellence) with early practical full-stack software development to build an outstanding student portfolio before Day 1 of classes.',
  phases: [
    {
      phaseNumber: 1,
      name: 'Phase 1: Academic & Language Foundation',
      subtitle: 'Securing Admission Eligibility & Core Math Rigor',
      timeframe: 'Months 1 - 3',
      primaryGoal: 'Attain official IELTS 7.0+ score and master university entrance math syllabus.',
      tasks: [
        {
          id: 'p1-t1',
          title: 'IELTS Academic Intensive (Target 7.0+ Band)',
          description: 'Focus on Academic Writing Task 2 (argumentative essays) and complex Listening sections with daily timed practice.',
          priority: 'critical',
          timeEstimate: '60 hours',
          category: 'language_tests',
          resources: [
            { title: 'Cambridge IELTS Academic Practice Tests 16-19', type: 'book' },
            { title: 'IELTS Liz Writing Masterclass', type: 'platform' }
          ],
          completionCriteria: 'Official test score sheet showing minimum 7.0 overall with no band under 6.5.',
          completed: true
        },
        {
          id: 'p1-t2',
          title: 'Inha Math Syllabus Mastery (Calculus & Functions)',
          description: 'Solve past 5 years of Inha University Tashkent / Korean Math entrance examination questions.',
          priority: 'critical',
          timeEstimate: '45 hours',
          category: 'academics',
          resources: [
            { title: 'IUT Past Entrance Exam Archive', type: 'official_guide' },
            { title: 'Khan Academy AP Calculus AB', type: 'course' }
          ],
          completionCriteria: 'Score 85%+ on 3 timed full-length diagnostic mock math tests.',
          completed: true
        },
        {
          id: 'p1-t3',
          title: 'Programming Foundations in Python & TypeScript',
          description: 'Complete core syntax, object-oriented concepts, and basic data structures (arrays, dictionaries, loops).',
          priority: 'high',
          timeEstimate: '30 hours',
          category: 'skills',
          resources: [
            { title: 'CS50: Introduction to Computer Science (Harvard)', type: 'course' }
          ],
          completionCriteria: 'Build 5 terminal-based algorithmic utilities and push code to GitHub.',
          completed: false
        }
      ]
    },
    {
      phaseNumber: 2,
      name: 'Phase 2: Core Engineering & Algorithmic Skills',
      subtitle: 'Data Structures, Web Technologies & Git Discipline',
      timeframe: 'Months 4 - 6',
      primaryGoal: 'Develop production-ready coding fundamentals and solve 50+ LeetCode problems.',
      tasks: [
        {
          id: 'p2-t1',
          title: 'Data Structures & Algorithms in Practice',
          description: 'Master binary search, recursion, trees, graphs, sorting algorithms, and hash maps with Big-O time/space analysis.',
          priority: 'critical',
          timeEstimate: '50 hours',
          category: 'skills',
          resources: [
            { title: 'NeetCode 150 Core Roadmap', type: 'platform' },
            { title: 'Grokking Algorithms by Aditya Bhargava', type: 'book' }
          ],
          completionCriteria: '50 LeetCode (Easy/Medium) problems solved and documented in a GitHub repository.',
          completed: false
        },
        {
          id: 'p2-t2',
          title: 'Modern Full-Stack Development (React + Express + PostgreSQL)',
          description: 'Learn REST API design, relational database modeling, and interactive frontend interfaces.',
          priority: 'high',
          timeEstimate: '60 hours',
          category: 'skills',
          resources: [
            { title: 'The Odin Project / Full Stack Open (University of Helsinki)', type: 'course' }
          ],
          completionCriteria: 'Deploy a full-stack database-driven web application to a live cloud URL.',
          completed: false
        }
      ]
    },
    {
      phaseNumber: 3,
      name: 'Phase 3: Portfolio Development & Hackathons',
      subtitle: 'Real-World Project Showcase & Community Impact',
      timeframe: 'Months 7 - 9',
      primaryGoal: 'Build 2 signature open-source projects and compete in a national hackathon.',
      tasks: [
        {
          id: 'p3-t1',
          title: 'Build Signature AI Project: "EduNavigator or Local Task Optimizer"',
          description: 'Design and deploy a full-stack web application integrating Gemini API for intelligent text summarization or guidance.',
          priority: 'critical',
          timeEstimate: '40 hours',
          category: 'portfolio',
          resources: [
            { title: 'Google AI Studio & GenAI SDK Documentation', type: 'official_guide' }
          ],
          completionCriteria: 'Live URL with GitHub README, interactive demo video, and architecture diagram.',
          completed: false
        },
        {
          id: 'p3-t2',
          title: 'Participate in IT Park / President Tech Award Hackathon',
          description: 'Form a team of 3-4 students, build a working prototype in 48 hours, and present to industry judges.',
          priority: 'high',
          timeEstimate: '30 hours',
          category: 'portfolio',
          resources: [
            { title: 'IT Park Uzbekistan Startup Events', type: 'platform' }
          ],
          completionCriteria: 'Working hackathon project repository and official participation certificate.',
          completed: false
        }
      ]
    },
    {
      phaseNumber: 4,
      name: 'Phase 4: Official Admission & Scholarship Filing',
      subtitle: 'Submitting Target University Documents & Grant Applications',
      timeframe: 'Months 10 - 11',
      primaryGoal: 'Complete registration on university portal and win full tuition grant.',
      tasks: [
        {
          id: 'p4-t1',
          title: 'Document Assembly & Certified Translations',
          description: 'Obtain notarized high school Attestat, certified medical forms, IELTS score sheet, and passport verification.',
          priority: 'critical',
          timeEstimate: '15 hours',
          category: 'admissions',
          resources: [
            { title: 'IUT Admissions Checklist & Portal guidelines', type: 'official_guide' }
          ],
          completionCriteria: 'All 5 mandatory documents uploaded to admissions.inha.uz.',
          completed: false
        },
        {
          id: 'p4-t2',
          title: 'Final Inha Written Entrance Exam Execution',
          description: 'Sit for the South Korean math examination in Tashkent with calm confidence.',
          priority: 'critical',
          timeEstimate: '10 hours',
          category: 'admissions',
          resources: [
            { title: 'Exam Hall Logistics & Formula Sheet', type: 'official_guide' }
          ],
          completionCriteria: 'Score within top 15% to secure 100% state grant / founder scholarship.',
          completed: false
        }
      ]
    },
    {
      phaseNumber: 5,
      name: 'Phase 5: Pre-University Transition & First-Year Launch',
      subtitle: 'Setting Up for Academic Honors & Global Tech Internships',
      timeframe: 'Month 12',
      primaryGoal: 'Establish study routines, join developer student clubs, and prepare for freshman year.',
      tasks: [
        {
          id: 'p5-t1',
          title: 'Join Google Developer Student Club (GDSC) / IT Park Club',
          description: 'Network with senior engineering peers and set up freshman study groups.',
          priority: 'medium',
          timeEstimate: '10 hours',
          category: 'academics',
          resources: [
            { title: 'GDSC Community Chapter Tashkent', type: 'platform' }
          ],
          completionCriteria: 'Active membership and attendance at orientation hack-night.',
          completed: false
        }
      ]
    }
  ],
  currentWeeklyGoals: [
    {
      id: 'p1-t3',
      taskText: 'Complete CS50 Python modules and build 2 algorithmic terminal scripts',
      priority: 'high',
      completed: false
    },
    {
      id: 'p2-t1',
      taskText: 'Solve 5 LeetCode Easy problems on Arrays & Hash Maps',
      priority: 'high',
      completed: false
    },
    {
      id: 'weekly-math',
      taskText: 'Review Calculus Derivatives and solve 1 past IUT Math paper',
      priority: 'medium',
      completed: true
    }
  ],
  immediateNextActionToday: {
    action: 'Download and solve the 2024 Inha University Tashkent Math Sample Paper (Section 1: Functions & Limits)',
    timeRequiredMinutes: 45,
    deliverable: 'A written solution sheet with step-by-step proofs for the first 10 calculus problems',
    guidePrompt: 'Focus on identifying algebraic traps in limit evaluations and verifying each step without using a calculator.'
  },
  criticalMilestones: [
    {
      milestone: 'IELTS 7.0+ Certificate Acquired',
      targetHorizon: 'Month 2',
      proofOfCompletion: 'Official British Council / IDP test report form uploaded'
    },
    {
      milestone: 'Inha Mathematics Entrance Exam Passed with State Grant',
      targetHorizon: 'Month 5',
      proofOfCompletion: 'Official IUT Grant recipient offer letter'
    },
    {
      milestone: 'First Open-Source Full-Stack AI Web Application Live',
      targetHorizon: 'Month 8',
      proofOfCompletion: 'Live Vercel/Cloud URL + GitHub repository with stars'
    }
  ]
};
