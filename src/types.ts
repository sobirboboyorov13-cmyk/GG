export type Language = 'en' | 'uz' | 'ru';

export type EducationLevel = 
  | 'middle_school' // 7-9th grade
  | 'high_school'   // 10-11th grade / Lyceum
  | 'graduate_gap'  // High school graduate / Gap year
  | 'undergrad'     // Current University student
  | 'other';

export type EnglishProficiency = 'beginner' | 'intermediate' | 'upper_intermediate' | 'advanced' | 'fluent' | 'ielts_6_plus' | 'ielts_7_plus' | 'ielts_8_plus';

export type BudgetRange = 'free_scholarship_only' | 'low_under_3k' | 'mid_3k_10k' | 'high_10k_30k' | 'flexible_unlimited';

export type RegionPreference = 'uzbekistan' | 'usa' | 'uk' | 'europe' | 'asia' | 'australia_canada' | 'any';

export interface StudentProfile {
  id: string;
  name: string;
  age?: number;
  country: string;
  city?: string;
  educationLevel: EducationLevel;
  favoriteSubjects: string[];
  academicStrengths: string[];
  languages: string[];
  englishLevel: EnglishProficiency;
  interests: string[];
  careerInterests: string[];
  preferredRegions: RegionPreference[];
  budgetRange: BudgetRange;
  studyGoals: string;
  targetTimelineYears?: number; // e.g. 1 year to apply, 2 years to apply
  assessmentCompleted: boolean;
  lastUpdated: string;
}

export interface DimensionScore {
  dimension: string;
  label: string;
  score: number; // 0 - 100
  category: 'cognitive' | 'interest' | 'workstyle' | 'values';
  explanation: string;
}

export interface AdaptiveOption {
  id: string;
  text: string;
  dimensionHint?: string;
}

export interface AdaptiveAssessmentQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  contextNote?: string;
  dimensionTags: string[];
  differentiatingGoal?: string; // what this question specifically seeks to differentiate
  options: AdaptiveOption[];
  allowCustomAnswer?: boolean;
}

export interface AssessmentStateAnswer {
  questionId: string;
  questionNumber: number;
  questionText: string;
  selectedOptionId: string;
  selectedOptionText: string;
  customText?: string;
  timestamp: string;
}

export interface AssessmentState {
  answers: AssessmentStateAnswer[];
  interestSignals: Record<string, number>;
  strengthSignals: Record<string, number>;
  workStyleSignals: Record<string, number>;
  subjectSignals: Record<string, number>;
  careerSignals: Record<string, number>;
  uncertainties: string[];
  candidateCareers: string[];
  coveredDimensions: string[];
  remainingDimensions: string[];
  currentQuestionNumber: number;
  estimatedConfidence: number; // 0 - 100%
  isComplete: boolean;
  lastAnalysisNote?: string;
}

export interface AssessmentQuestion {
  id: string;
  questionNumber: number;
  questionText: {
    en: string;
    uz: string;
    ru: string;
  };
  contextNote?: {
    en: string;
    uz: string;
    ru: string;
  };
  dimensionTags: string[];
  options: {
    id: string;
    text: {
      en: string;
      uz: string;
      ru: string;
    };
    dimensionWeights: Record<string, number>; // dimension name -> score delta
  }[];
}

export interface AssessmentAnswer {
  questionId: string;
  optionId: string;
  timestamp: string;
}

export interface CareerMatchResult {
  careerId: string;
  title: string;
  category: string;
  matchScore: number; // e.g. 94 (AI Compatibility Estimate)
  fitBadge: 'exceptional' | 'strong' | 'promising';
  whyItMatches: string;
  topStrengths: {
    dimension: string;
    score: number;
  }[];
  potentialChallenges: string[];
  recommendedSubjects: string[];
  keyTools: string[];
  growthOutlook: string;
}

export interface AssessmentResult {
  id: string;
  timestamp: string;
  profileArchetype: string;
  archetypeSummary: string;
  topDimensions: DimensionScore[];
  allDimensions: DimensionScore[];
  careerMatches: CareerMatchResult[];
  identifiedStrengths: string[];
  growthOpportunities: string[];
  recommendedFocusAreas: string[];
  estimatedConfidence?: number;
  totalQuestionsAnswered?: number;
  keyUncertaintiesResolved?: string[];
}

export interface CareerDetail {
  id: string;
  title: string;
  category: 'Tech & AI' | 'Engineering' | 'Business & Product' | 'Design & Creative' | 'Science & Health' | 'Law & Governance';
  iconName: string;
  shortDescription: string;
  whatTheyDo: string[];
  dailyWorkEnvironment: string;
  coreTechnicalSkills: string[];
  coreSoftSkills: string[];
  recommendedSchoolSubjects: string[];
  popularTools: string[];
  specializations: string[];
  careerProgression: {
    stage: 'Entry Level' | 'Mid Level' | 'Senior / Lead' | 'Executive / Principal';
    roles: string[];
    focus: string;
  }[];
  relevantMajorNames: string[];
  uzbekistanOpportunities: string;
  globalOpportunities: string;
}

export interface UniversityProgram {
  id: string;
  name: string;
  degreeType: "Bachelor's" | "Master's" | 'Dual Degree' | 'Integrated Master';
  durationYears: number;
  languageOfInstruction: string[];
  targetCareers: string[];
  estimatedAnnualTuitionUsd?: number;
  scholarshipEligible: boolean;
  keySubjects: string[];
}

export interface AdmissionRequirement {
  academicGpaRequirement: string;
  languageRequirements: {
    test: 'IELTS' | 'TOEFL iBT' | 'CEFR' | 'Duolingo' | 'English Medium of Instruction';
    minimumScore: string;
    recommendedScore?: string;
  }[];
  standardizedTests: {
    test: 'SAT' | 'ACT' | 'National Entrance Exam (DTM/Uzbek)' | 'University Internal Exam' | 'GRE' | 'None Required';
    details: string;
  }[];
  requiredHighSchoolSubjects: string[];
  requiredDocuments: string[];
  applicationDeadlines: {
    round: string; // e.g. "Early Action", "Regular Fall Intake", "Spring Intake"
    date: string;
  }[];
  applicationProcessSummary: string[];
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  type: 'uzbekistan' | 'international';
  country: string;
  city: string;
  flagEmoji: string;
  rankingNote?: string;
  about: string;
  campusInfo: string;
  tuitionOverviewUsd: string;
  scholarshipInfo: string;
  internationalStudentsPolicy: string;
  programs: UniversityProgram[];
  admissions: AdmissionRequirement;
  careerOutcomes: string;
  officialWebsite: string;
  socialLinks: {
    platform: 'linkedin' | 'instagram' | 'facebook' | 'telegram' | 'youtube';
    url: string;
  }[];
  contactEmail?: string;
  lastVerified: string;
  featuredForCareers: string[]; // career IDs
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium';
  timeEstimate: string; // e.g. "15 hours" or "2 weeks"
  category: 'academics' | 'skills' | 'portfolio' | 'language_tests' | 'admissions';
  resources: {
    title: string;
    type: 'course' | 'book' | 'tool' | 'platform' | 'official_guide';
    urlHint?: string;
  }[];
  completionCriteria: string;
  completed: boolean;
}

export interface RoadmapPhase {
  phaseNumber: number;
  name: string;
  subtitle: string;
  timeframe: string; // e.g. "Months 1-3 (Foundation)"
  primaryGoal: string;
  tasks: RoadmapTask[];
}

export interface PersonalCareerRoadmap {
  id: string;
  title: string;
  createdAt: string;
  lastUpdated: string;
  studentName: string;
  targetCareer: {
    id: string;
    title: string;
    category: string;
  };
  targetUniversity?: {
    id: string;
    name: string;
    country: string;
    programName: string;
    degreeType: string;
  };
  customTimeline: string;
  overallStrategy: string;
  phases: RoadmapPhase[];
  currentWeeklyGoals: {
    id: string;
    taskText: string;
    priority: 'high' | 'medium';
    completed: boolean;
  }[];
  immediateNextActionToday: {
    action: string;
    timeRequiredMinutes: number;
    deliverable: string;
    guidePrompt: string;
  };
  criticalMilestones: {
    milestone: string;
    targetHorizon: string;
    proofOfCompletion: string;
  }[];
}

export interface DocumentAnalysisResult {
  id: string;
  documentType: 'motivation_letter' | 'personal_statement' | 'cv_resume' | 'admission_essay' | 'general_application_doc';
  targetUniversityOrProgram?: string;
  wordCount: number;
  overallRatingScore: number; // 1-100
  executiveReview: string;
  keyStrengthsFound: string[];
  missingCriticalInformation: string[];
  concreteImprovementPoints: {
    section: string;
    currentWeakness: string;
    recommendedRewrite: string;
  }[];
  alignmentWithAdmissionsCriteria: {
    criterion: string;
    status: 'strong' | 'needs_work' | 'missing';
    note: string;
  }[];
  grammarAndToneFeedback: string;
  timestamp: string;
}

export interface ContextualChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  contextType: 'career' | 'university' | 'roadmap' | 'general';
  contextId?: string;
}
