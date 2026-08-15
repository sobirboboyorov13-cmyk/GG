import React, { useState, useEffect } from 'react';
import {
  Language,
  StudentProfile,
  AssessmentResult,
  PersonalCareerRoadmap
} from './types';
import {
  getStoredProfile,
  saveStoredProfile,
  getStoredAssessmentResult,
  saveStoredAssessmentResult,
  getSavedCareerIds,
  toggleSaveCareerId,
  getSavedUniversityIds,
  toggleSaveUniversityId,
  getStoredActiveRoadmap,
  saveStoredActiveRoadmap,
  updateRoadmapTaskStatus,
  getStoredSettings,
  saveStoredSettings
} from './lib/storage';
import {
  SAMPLE_DEMO_ASSESSMENT,
  SAMPLE_DEMO_ROADMAP
} from './lib/demoData';
import { CAREERS_DATABASE } from './data/careersData';
import { UNIVERSITIES_DATABASE } from './data/universitiesData';
import { Navbar } from './components/Navbar';
import { HomeLanding } from './components/HomeLanding';
import { CareerAssessment } from './components/CareerAssessment';
import { CareersExplorer } from './components/CareersExplorer';
import { UniversitiesExplorer } from './components/UniversitiesExplorer';
import { PersonalRoadmapView } from './components/PersonalRoadmapView';
import { StudentProfileView } from './components/StudentProfileView';
import { ApplicationDocAssistant } from './components/ApplicationDocAssistant';
import { JudgeDemoTourModal } from './components/JudgeDemoTourModal';
import { ContextualAIChatDrawer } from './components/ContextualAIChatDrawer';
import { ErrorBoundary } from './components/ErrorBoundary';

export function App() {
  // App state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguageState] = useState<Language>(() => getStoredSettings().language || 'en');
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(getStoredProfile);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(getStoredAssessmentResult);
  const [activeRoadmap, setActiveRoadmap] = useState<PersonalCareerRoadmap | null>(getStoredActiveRoadmap);

  // Saved collections
  const [savedCareerIds, setSavedCareerIds] = useState<string[]>(getSavedCareerIds);
  const [savedUniversityIds, setSavedUniversityIds] = useState<string[]>(getSavedUniversityIds);

  // Cross-navigation preselection states
  const [preselectedCareerId, setPreselectedCareerId] = useState<string | null>(null);
  const [preselectedUniId, setPreselectedUniId] = useState<string | null>(null);

  // Modals & Drawers
  const [isJudgeTourOpen, setIsJudgeTourOpen] = useState<boolean>(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveStoredSettings({ language: lang });
  };

  const handleSaveProfile = (updated: StudentProfile) => {
    const saved = saveStoredProfile(updated);
    setStudentProfile(saved);
  };

  const handleSaveAssessmentResult = (result: AssessmentResult) => {
    saveStoredAssessmentResult(result);
    setAssessmentResult(result);
    // Automatically flag assessmentCompleted in profile
    handleSaveProfile({ ...studentProfile, assessmentCompleted: true });
  };

  const handleToggleSaveCareer = (careerId: string) => {
    const updated = toggleSaveCareerId(careerId);
    setSavedCareerIds(updated);
  };

  const handleToggleSaveUniversity = (uniId: string) => {
    const updated = toggleSaveUniversityId(uniId);
    setSavedUniversityIds(updated);
  };

  const handleUpdateTaskStatus = (taskId: string, completed: boolean) => {
    const updated = updateRoadmapTaskStatus(taskId, completed);
    if (updated) {
      setActiveRoadmap(updated);
    }
  };

  // Cross-Navigation handlers
  const handleSelectCareerFromAssessment = (careerId: string) => {
    setPreselectedCareerId(careerId);
    setCurrentTab('careers');
  };

  const handleExploreUniversitiesForCareer = (careerId: string) => {
    setPreselectedCareerId(careerId);
    setCurrentTab('universities');
  };

  const handleBuildRoadmapForCareer = async (careerId: string, universityId?: string) => {
    setPreselectedCareerId(careerId);
    if (universityId) setPreselectedUniId(universityId);

    const career = CAREERS_DATABASE.find((c) => c.id === careerId);
    const uni = universityId ? UNIVERSITIES_DATABASE.find((u) => u.id === universityId) : UNIVERSITIES_DATABASE[0];

    if (career) {
      await handleGenerateRoadmap(careerId, uni?.id, 1);
    }
    setCurrentTab('roadmap');
  };

  const handleBuildRoadmapForUniversity = async (uniId: string, programName?: string) => {
    setPreselectedUniId(uniId);
    const targetCareer = CAREERS_DATABASE[0];
    await handleGenerateRoadmap(targetCareer.id, uniId, 1);
    setCurrentTab('roadmap');
  };

  const handleGenerateRoadmap = async (
    careerId: string,
    universityId?: string,
    timelineYears: number = 1
  ) => {
    const career = CAREERS_DATABASE.find((c) => c.id === careerId) || CAREERS_DATABASE[0];
    const uni = universityId ? UNIVERSITIES_DATABASE.find((u) => u.id === universityId) : UNIVERSITIES_DATABASE[0];

    try {
      const response = await fetch('/api/roadmap/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentProfile,
          assessmentResult,
          targetCareer: {
            id: career.id,
            title: career.title,
            category: career.category,
          },
          targetUniversity: uni
            ? {
                id: uni.id,
                name: uni.name,
                country: uni.country,
                programName: uni.programs[0]?.name || 'Computer Science',
                degreeType: uni.programs[0]?.degreeType || "Bachelor's",
              }
            : undefined,
          timelineYears,
          language,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate roadmap from API');
      const data: PersonalCareerRoadmap = await response.json();
      saveStoredActiveRoadmap(data);
      setActiveRoadmap(data);
    } catch (err) {
      console.warn('Using demo roadmap fallback:', err);
      saveStoredActiveRoadmap(SAMPLE_DEMO_ROADMAP);
      setActiveRoadmap(SAMPLE_DEMO_ROADMAP);
    }
  };

  const handleLoadDemoStudent = () => {
    handleSaveAssessmentResult(SAMPLE_DEMO_ASSESSMENT);
    saveStoredActiveRoadmap(SAMPLE_DEMO_ROADMAP);
    setActiveRoadmap(SAMPLE_DEMO_ROADMAP);
    setCurrentTab('roadmap');
  };

  const totalSavedCount = savedCareerIds.length + savedUniversityIds.length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* Top Main Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        onOpenDemoTour={() => setIsJudgeTourOpen(true)}
        savedCount={totalSavedCount}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <ErrorBoundary fallbackTitle="Home View Error">
            <HomeLanding
              language={language}
              onStartAssessment={() => setCurrentTab('assessment')}
              onExploreUniversities={() => setCurrentTab('universities')}
              onExploreCareers={() => setCurrentTab('careers')}
              onLoadDemoStudent={handleLoadDemoStudent}
              onOpenJudgeTour={() => setIsJudgeTourOpen(true)}
            />
          </ErrorBoundary>
        )}

        {currentTab === 'assessment' && (
          <ErrorBoundary fallbackTitle="Career Assessment Error">
            <CareerAssessment
              language={language}
              studentProfile={studentProfile}
              assessmentResult={assessmentResult}
              onSaveAssessmentResult={handleSaveAssessmentResult}
              onSelectCareer={handleSelectCareerFromAssessment}
              onExploreUniversitiesForCareer={handleExploreUniversitiesForCareer}
              onBuildRoadmapForCareer={handleBuildRoadmapForCareer}
            />
          </ErrorBoundary>
        )}

        {currentTab === 'careers' && (
          <ErrorBoundary fallbackTitle="Careers Explorer Error">
            <CareersExplorer
              language={language}
              assessmentResult={assessmentResult}
              savedCareerIds={savedCareerIds}
              onToggleSaveCareer={handleToggleSaveCareer}
              onSelectUniversityFromCareer={handleExploreUniversitiesForCareer}
              onBuildRoadmapForCareer={handleBuildRoadmapForCareer}
            />
          </ErrorBoundary>
        )}

        {currentTab === 'universities' && (
          <ErrorBoundary fallbackTitle="Universities Explorer Error">
            <UniversitiesExplorer
              language={language}
              studentProfile={studentProfile}
              assessmentResult={assessmentResult}
              savedUniversityIds={savedUniversityIds}
              onToggleSaveUniversity={handleToggleSaveUniversity}
              onBuildRoadmapForUniversity={handleBuildRoadmapForUniversity}
              initialSelectedUniId={preselectedUniId}
            />
          </ErrorBoundary>
        )}

        {currentTab === 'roadmap' && (
          <ErrorBoundary fallbackTitle="Roadmap View Error">
            <PersonalRoadmapView
              roadmap={activeRoadmap}
              language={language}
              studentProfile={studentProfile}
              assessmentResult={assessmentResult}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onGenerateRoadmap={handleGenerateRoadmap}
              preselectedCareerId={preselectedCareerId}
              preselectedUniId={preselectedUniId}
            />
          </ErrorBoundary>
        )}

        {currentTab === 'doc-assistant' && (
          <ErrorBoundary fallbackTitle="Document Assistant Error">
            <ApplicationDocAssistant language={language} />
          </ErrorBoundary>
        )}

        {currentTab === 'profile' && (
          <ErrorBoundary fallbackTitle="Student Profile Error">
            <StudentProfileView
              profile={studentProfile}
              onSaveProfile={handleSaveProfile}
              language={language}
              savedCareerIds={savedCareerIds}
              savedUniversityIds={savedUniversityIds}
              onOpenCareer={(id) => {
                setPreselectedCareerId(id);
                setCurrentTab('careers');
              }}
              onOpenUniversity={(id) => {
                setPreselectedUniId(id);
                setCurrentTab('universities');
              }}
              onRemoveSavedCareer={handleToggleSaveCareer}
              onRemoveSavedUniversity={handleToggleSaveUniversity}
            />
          </ErrorBoundary>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Navigator AI</span>
            <span>•</span>
            <span>Intelligent Career Discovery & University Platform</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <button onClick={() => setIsJudgeTourOpen(true)} className="hover:text-blue-600 transition">
              2-Min Judge Tour
            </button>
            <span>•</span>
            <button onClick={() => setCurrentTab('assessment')} className="hover:text-blue-600 transition">
              Career Assessment
            </button>
            <span>•</span>
            <button onClick={() => setCurrentTab('universities')} className="hover:text-blue-600 transition">
              Universities
            </button>
            <span>•</span>
            <button onClick={() => setCurrentTab('doc-assistant')} className="hover:text-blue-600 transition">
              Doc Assistant
            </button>
          </div>
        </div>
      </footer>

      {/* 2-Minute Interactive Judge Tour Modal */}
      <JudgeDemoTourModal
        isOpen={isJudgeTourOpen}
        onClose={() => setIsJudgeTourOpen(false)}
        language={language}
        onJumpToTab={(tab) => setCurrentTab(tab)}
        onLoadFullDemo={handleLoadDemoStudent}
      />

      {/* Contextual AI Advisor Chat Drawer */}
      <ContextualAIChatDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(!isAIChatOpen)}
        language={language}
        contextType={
          currentTab === 'careers'
            ? 'career'
            : currentTab === 'universities'
            ? 'university'
            : currentTab === 'roadmap'
            ? 'roadmap'
            : 'general'
        }
        contextData={{
          currentTab,
          preselectedCareerId,
          preselectedUniId,
        }}
        studentProfile={studentProfile}
      />

    </div>
  );
}

export default App;
