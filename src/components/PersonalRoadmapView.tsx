import React, { useState } from 'react';
import {
  Map,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Award,
  BookOpen,
  GraduationCap,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Zap,
  ArrowRight,
  ExternalLink,
  Target,
  ListTodo
} from 'lucide-react';
import {
  PersonalCareerRoadmap,
  Language,
  StudentProfile,
  AssessmentResult,
  RoadmapPhase,
  RoadmapTask
} from '../types';
import { CAREERS_DATABASE } from '../data/careersData';
import { UNIVERSITIES_DATABASE } from '../data/universitiesData';
import { SAMPLE_DEMO_ROADMAP } from '../lib/demoData';
import { I18N } from '../lib/i18n';

interface PersonalRoadmapViewProps {
  roadmap: PersonalCareerRoadmap | null;
  language: Language;
  studentProfile: StudentProfile;
  assessmentResult: AssessmentResult | null;
  onUpdateTaskStatus: (taskId: string, completed: boolean) => void;
  onGenerateRoadmap: (careerId: string, universityId?: string, timelineYears?: number) => Promise<void>;
  preselectedCareerId?: string | null;
  preselectedUniId?: string | null;
}

export const PersonalRoadmapView: React.FC<PersonalRoadmapViewProps> = ({
  roadmap,
  language,
  studentProfile,
  assessmentResult,
  onUpdateTaskStatus,
  onGenerateRoadmap,
  preselectedCareerId,
  preselectedUniId,
}) => {
  const t = I18N[language]?.roadmap || I18N.en.roadmap;

  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
  });
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);

  // Modal configuration states
  const [selectedCareerId, setSelectedCareerId] = useState<string>(
    preselectedCareerId || roadmap?.targetCareer.id || 'software-engineer'
  );
  const [selectedUniId, setSelectedUniId] = useState<string>(
    preselectedUniId || roadmap?.targetUniversity?.id || 'inha-tashkent'
  );
  const [selectedTimeline, setSelectedTimeline] = useState<number>(1);

  const togglePhase = (phaseNumber: number) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseNumber]: !prev[phaseNumber],
    }));
  };

  const handleCopyRoadmap = () => {
    if (!roadmap) return;
    const text = `NAVIGATOR AI - PERSONAL ROADMAP
Target Career: ${roadmap.targetCareer.title}
Target University: ${roadmap.targetUniversity?.name || 'Top Global Institutions'}
Timeline: ${roadmap.customTimeline}

STRATEGY:
${roadmap.overallStrategy}

IMMEDIATE NEXT ACTION TODAY:
${roadmap.immediateNextActionToday?.action || ''}
Deliverable: ${roadmap.immediateNextActionToday?.deliverable || ''}

PHASES:
${roadmap.phases
  .map(
    (p) => `\n[Phase ${p.phaseNumber}: ${p.name} (${p.timeframe})]
Goal: ${p.primaryGoal}
Tasks:\n${p.tasks.map((t) => ` - [${t.completed ? 'X' : ' '}] ${t.title} (${t.timeEstimate})`).join('\n')}`
  )
  .join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRunGeneration = async () => {
    setIsGenerating(true);
    setShowConfigModal(false);
    try {
      await onGenerateRoadmap(selectedCareerId, selectedUniId, selectedTimeline);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Fallback / active display roadmap
  const activeRoadmap = roadmap || SAMPLE_DEMO_ROADMAP;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
            <Map className="h-3.5 w-3.5" />
            <span>AI Step-by-Step Trajectory</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {t.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          <button
            id="copy-roadmap-btn"
            onClick={handleCopyRoadmap}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs cursor-pointer min-h-[38px]"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-500" />}
            <span>{copied ? 'Copied' : t.copyRoadmap}</span>
          </button>

          <button
            id="customize-roadmap-btn"
            onClick={() => setShowConfigModal(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-2xs cursor-pointer min-h-[38px]"
          >
            <Sparkles className="h-4 w-4 text-blue-200" />
            <span>{t.regenerateBtn}</span>
          </button>
        </div>
      </div>

      {/* Target Alignment Card */}
      <div
        id="roadmap-target-alignment-card"
        className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/90 via-white to-slate-50 p-6 sm:p-8 shadow-xs"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-blue-600" />
              <span>Target Career</span>
            </div>
            <div className="text-lg font-extrabold text-slate-900">
              {activeRoadmap.targetCareer.title}
            </div>
            <div className="text-xs text-slate-600">
              {activeRoadmap.targetCareer.category}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
              <span>Target Institution</span>
            </div>
            <div className="text-lg font-extrabold text-slate-900">
              {activeRoadmap.targetUniversity?.name || 'Top Global Tech Institutions'}
            </div>
            <div className="text-xs text-slate-600">
              {activeRoadmap.targetUniversity?.country
                ? `${activeRoadmap.targetUniversity.programName || 'Degree Program'} • ${activeRoadmap.targetUniversity.country}`
                : 'Direct & Transfer Pathways'}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-blue-600" />
              <span>Horizon & Timeline</span>
            </div>
            <div className="text-lg font-extrabold text-slate-900">
              {activeRoadmap.customTimeline}
            </div>
            <div className="text-xs text-slate-600">
              Structured Milestones & Proof Deliverables
            </div>
          </div>

        </div>

        <div className="mt-6 pt-5 border-t border-blue-100/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-bold">Strategic Synthesis: </strong>
          {activeRoadmap.overallStrategy}
        </div>
      </div>

      {/* Immediate Next Action Today */}
      {activeRoadmap.immediateNextActionToday && (
        <div
          id="roadmap-today-action-card"
          className="rounded-3xl border border-amber-300 bg-amber-50/70 p-6 sm:p-8 shadow-xs"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-xs">
              <Zap className="h-6 w-6" />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                  {t.todayAction}
                </span>
                <span className="rounded-md bg-amber-200/80 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                  ~{activeRoadmap.immediateNextActionToday.timeRequiredMinutes} Minutes
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {activeRoadmap.immediateNextActionToday.action}
              </h3>
              <div className="text-xs text-slate-700 bg-white/90 p-3 rounded-xl border border-amber-200">
                <strong>Expected Deliverable: </strong>
                {activeRoadmap.immediateNextActionToday.deliverable}
              </div>
              {activeRoadmap.immediateNextActionToday.guidePrompt && (
                <p className="text-[11px] text-amber-800 italic">
                  💡 {activeRoadmap.immediateNextActionToday.guidePrompt}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Weekly Goal Tracker */}
      {activeRoadmap.currentWeeklyGoals && activeRoadmap.currentWeeklyGoals.length > 0 && (
        <div
          id="roadmap-weekly-goals-card"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
        >
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <ListTodo className="h-4 w-4 text-blue-600" />
            <span>{t.weeklyGoals}</span>
          </h3>
          <div className="space-y-2">
            {activeRoadmap.currentWeeklyGoals.map((goal) => (
              <div
                key={goal.id}
                id={`weekly-goal-item-${goal.id}`}
                onClick={() => onUpdateTaskStatus(goal.id, !goal.completed)}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition min-h-[44px] ${
                  goal.completed
                    ? 'border-emerald-200 bg-emerald-50/50 text-slate-500'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800'
                }`}
              >
                {goal.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-slate-400 shrink-0" />
                )}
                <span className={`text-xs font-medium ${goal.completed ? 'line-through' : ''}`}>
                  {goal.taskText}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Multi-Phase Execution Timeline */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <span>Structured Phase Breakdown ({activeRoadmap.phases.length} Phases)</span>
        </h2>

        {activeRoadmap.phases.map((phase) => {
          const isExpanded = Boolean(expandedPhases[phase.phaseNumber]);
          const completedCount = phase.tasks.filter((t) => t.completed).length;

          return (
            <div
              key={phase.phaseNumber}
              id={`roadmap-phase-card-${phase.phaseNumber}`}
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs transition"
            >
              {/* Phase Accordion Header */}
              <div
                id={`toggle-phase-header-${phase.phaseNumber}`}
                onClick={() => togglePhase(phase.phaseNumber)}
                className="flex items-center justify-between p-5 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer border-b border-slate-100 select-none min-h-[52px]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white text-xs font-bold shrink-0">
                    {phase.phaseNumber}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{phase.name}</h3>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{phase.timeframe}</span>
                      <span>•</span>
                      <span>{phase.subtitle}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-600">
                    {completedCount} / {phase.tasks.length} Tasks
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Phase Tasks Body */}
              {isExpanded && (
                <div className="p-5 space-y-4">
                  <div className="text-xs text-slate-600 bg-blue-50/60 p-3 rounded-xl border border-blue-100">
                    <strong>Primary Outcome: </strong>
                    {phase.primaryGoal}
                  </div>

                  <div className="space-y-3">
                    {phase.tasks.map((task) => (
                      <div
                        key={task.id}
                        id={`phase-task-card-${task.id}`}
                        className={`rounded-2xl border p-4 transition ${
                          task.completed
                            ? 'border-emerald-200 bg-emerald-50/30'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <button
                              id={`toggle-task-${task.id}`}
                              onClick={() => onUpdateTaskStatus(task.id, !task.completed)}
                              className="mt-0.5 text-slate-400 hover:text-blue-600 transition cursor-pointer"
                            >
                              {task.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              ) : (
                                <Circle className="h-5 w-5" />
                              )}
                            </button>
                            <div>
                              <h4
                                className={`text-xs sm:text-sm font-bold text-slate-900 ${
                                  task.completed ? 'line-through text-slate-400' : ''
                                }`}
                              >
                                {task.title}
                              </h4>
                              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                                {task.description}
                              </p>
                              
                              {/* Completion criteria */}
                              {task.completionCriteria && (
                                <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                  <strong>Proof of Completion: </strong>
                                  {task.completionCriteria}
                                </div>
                              )}
                            </div>
                          </div>

                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 whitespace-nowrap">
                            {task.timeEstimate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Critical Milestones */}
      {activeRoadmap.criticalMilestones && activeRoadmap.criticalMilestones.length > 0 && (
        <div
          id="roadmap-critical-milestones-card"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
        >
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Award className="h-4 w-4 text-amber-600" />
            <span>{t.milestones}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeRoadmap.criticalMilestones.map((ms, mIdx) => (
              <div key={mIdx} className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">{ms.targetHorizon}</div>
                <div className="text-xs font-bold text-slate-900">{ms.milestone}</div>
                <div className="text-[11px] text-slate-500">{ms.proofOfCompletion}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Roadmap Configuration / Adjustment Modal */}
      {showConfigModal && (
        <div
          id="roadmap-config-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div
            id="roadmap-config-modal"
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-5"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900">Customize Your Roadmap</h3>
              <p className="text-xs text-slate-500">
                Select your target career, target institution, and timeline.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Career</label>
                <select
                  id="config-career-select"
                  value={selectedCareerId}
                  onChange={(e) => setSelectedCareerId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 font-semibold text-slate-800"
                >
                  {CAREERS_DATABASE.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target University</label>
                <select
                  id="config-university-select"
                  value={selectedUniId}
                  onChange={(e) => setSelectedUniId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 font-semibold text-slate-800"
                >
                  {UNIVERSITIES_DATABASE.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.city}, {u.country})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Preparation Horizon (Years)</label>
                <select
                  id="config-timeline-select"
                  value={selectedTimeline}
                  onChange={(e) => setSelectedTimeline(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 font-semibold text-slate-800"
                >
                  <option value={1}>1 Year (Intensive Fast-Track)</option>
                  <option value={2}>2 Years (High School 10th-11th Grade)</option>
                  <option value={3}>3 Years (Long-Term Mastery)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                id="cancel-roadmap-config-btn"
                onClick={() => setShowConfigModal(false)}
                className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer min-h-[38px]"
              >
                Cancel
              </button>
              <button
                id="generate-custom-roadmap-btn"
                onClick={handleRunGeneration}
                className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer min-h-[38px]"
              >
                Generate Roadmap
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
