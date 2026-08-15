import {
  StudentProfile,
  AssessmentResult,
  PersonalCareerRoadmap,
  Language,
  DocumentAnalysisResult
} from '../types';

const STORAGE_KEYS = {
  PROFILE: 'navigator_student_profile',
  ASSESSMENT_RESULT: 'navigator_latest_assessment',
  SAVED_CAREERS: 'navigator_saved_careers',
  SAVED_UNIVERSITIES: 'navigator_saved_universities',
  ACTIVE_ROADMAP: 'navigator_active_roadmap',
  SAVED_ROADMAPS: 'navigator_saved_roadmaps',
  DOC_AUDITS: 'navigator_document_audits',
  SETTINGS: 'navigator_user_settings'
};

export interface AppSettings {
  language: Language;
  theme: 'light';
  notificationsEnabled: boolean;
  demoModeEnabled?: boolean;
}

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  id: 'student-default',
  name: 'Sobir Boboyorov',
  age: 18,
  country: 'Uzbekistan',
  city: 'Tashkent',
  educationLevel: 'high_school',
  favoriteSubjects: ['Mathematics', 'Informatics / Computer Science', 'Physics', 'English'],
  academicStrengths: ['Analytical Problem Solving', 'Logic & Algorithms', 'Self-Directed Learning'],
  languages: ['Uzbek (Native)', 'English (B2/C1)', 'Russian (Fluent)'],
  englishLevel: 'ielts_7_plus',
  interests: ['Artificial Intelligence', 'Software Architecture', 'Robotics', 'Startups'],
  careerInterests: ['Software Engineer', 'Data Scientist & AI Specialist'],
  preferredRegions: ['uzbekistan', 'usa', 'europe', 'asia'],
  budgetRange: 'mid_3k_10k',
  studyGoals: 'Pursue a world-class degree in Computer Science and build innovative AI solutions that solve real regional and global challenges.',
  targetTimelineYears: 1,
  assessmentCompleted: true,
  lastUpdated: new Date().toISOString()
};

export function getStoredProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) return DEFAULT_STUDENT_PROFILE;
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_STUDENT_PROFILE;
  }
}

export function saveStoredProfile(profile: StudentProfile): StudentProfile {
  try {
    const updated = { ...profile, lastUpdated: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save profile:', e);
    return profile;
  }
}

export function getStoredAssessmentResult(): AssessmentResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_RESULT);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function saveStoredAssessmentResult(result: AssessmentResult): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT_RESULT, JSON.stringify(result));
  } catch (e) {
    console.error('Failed to save assessment result:', e);
  }
}

export function getSavedCareerIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_CAREERS);
    return raw ? JSON.parse(raw) : ['software-engineer', 'data-scientist-ai'];
  } catch (e) {
    return ['software-engineer', 'data-scientist-ai'];
  }
}

export function toggleSaveCareerId(careerId: string): string[] {
  try {
    const current = getSavedCareerIds();
    const exists = current.includes(careerId);
    const updated = exists ? current.filter((id) => id !== careerId) : [...current, careerId];
    localStorage.setItem(STORAGE_KEYS.SAVED_CAREERS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

export function getSavedUniversityIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_UNIVERSITIES);
    return raw ? JSON.parse(raw) : ['inha-tashkent', 'new-uzbekistan-university', 'mit-usa'];
  } catch (e) {
    return ['inha-tashkent', 'new-uzbekistan-university', 'mit-usa'];
  }
}

export function toggleSaveUniversityId(uniId: string): string[] {
  try {
    const current = getSavedUniversityIds();
    const exists = current.includes(uniId);
    const updated = exists ? current.filter((id) => id !== uniId) : [...current, uniId];
    localStorage.setItem(STORAGE_KEYS.SAVED_UNIVERSITIES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

export function getStoredActiveRoadmap(): PersonalCareerRoadmap | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_ROADMAP);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function saveStoredActiveRoadmap(roadmap: PersonalCareerRoadmap): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ROADMAP, JSON.stringify(roadmap));
  } catch (e) {
    console.error('Failed to save active roadmap:', e);
  }
}

export function updateRoadmapTaskStatus(taskId: string, completed: boolean): PersonalCareerRoadmap | null {
  const current = getStoredActiveRoadmap();
  if (!current) return null;

  let modified = false;
  const updatedPhases = current.phases.map((phase) => ({
    ...phase,
    tasks: phase.tasks.map((task) => {
      if (task.id === taskId) {
        modified = true;
        return { ...task, completed };
      }
      return task;
    })
  }));

  const updatedWeekly = current.currentWeeklyGoals?.map((g) => {
    if (g.id === taskId) {
      return { ...g, completed };
    }
    return g;
  });

  if (modified) {
    const updated = {
      ...current,
      lastUpdated: new Date().toISOString(),
      phases: updatedPhases,
      currentWeeklyGoals: updatedWeekly || current.currentWeeklyGoals
    };
    saveStoredActiveRoadmap(updated);
    return updated;
  }
  return current;
}

export function getStoredSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      return {
        language: 'en',
        theme: 'light',
        notificationsEnabled: true,
        demoModeEnabled: false
      };
    }
    return JSON.parse(raw);
  } catch (e) {
    return {
      language: 'en',
      theme: 'light',
      notificationsEnabled: true,
      demoModeEnabled: false
    };
  }
}

export function saveStoredSettings(settings: Partial<AppSettings>): AppSettings {
  const current = getStoredSettings();
  const updated = { ...current, ...settings };
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
  return updated;
}
