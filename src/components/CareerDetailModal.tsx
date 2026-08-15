import React from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  GraduationCap,
  Map,
  CheckCircle2,
  TrendingUp,
  Bookmark,
  Code2,
  Brain,
  Building2,
  Users
} from 'lucide-react';
import { CareerDetail, Language, AssessmentResult } from '../types';
import { I18N } from '../lib/i18n';

interface CareerDetailModalProps {
  career: CareerDetail | null;
  onClose: () => void;
  language: Language;
  assessmentResult: AssessmentResult | null;
  isSaved: boolean;
  onToggleSave: (careerId: string) => void;
  onExploreUniversities: (careerId: string) => void;
  onBuildRoadmap: (careerId: string) => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  onClose,
  language,
  assessmentResult,
  isSaved,
  onToggleSave,
  onExploreUniversities,
  onBuildRoadmap,
}) => {
  if (!career) return null;

  const t = I18N[language]?.careers || I18N.en.careers;
  const matchObj = assessmentResult?.careerMatches.find((m) => m.careerId === career.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-slate-100 p-6 bg-slate-50/80 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800">
                {career.category}
              </span>
              {matchObj && (
                <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>{matchObj.matchScore}% Match for You</span>
                </span>
              )}
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">{career.title}</h2>
            <p className="mt-1 text-xs text-slate-500">{career.shortDescription}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(career.id)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition cursor-pointer ${
                isSaved
                  ? 'border-blue-300 bg-blue-50 text-blue-600'
                  : 'border-slate-200 bg-white text-slate-500 hover:text-slate-900'
              }`}
              title={isSaved ? 'Saved' : 'Save career'}
            >
              <Bookmark className="h-4 w-4 fill-current" />
            </button>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Match Insight (If Assessment Was Taken) */}
          {matchObj && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4">
              <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                <Brain className="h-4 w-4 text-blue-600" />
                <span>{t.whyFitsYou}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {matchObj.whyItMatches}
              </p>
            </div>
          )}

          {/* Core Description & Work Environment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 p-4 bg-white">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span>{t.whatTheyDo}</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
                {career.whatTheyDo.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 bg-white">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-indigo-600" />
                <span>Work Environment & Routine</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{career.dailyWorkEnvironment}</p>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Technical Skills */}
            <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-blue-600" />
                <span>{t.coreSkills}</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {career.coreTechnicalSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-2xs"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Users className="h-4 w-4 text-indigo-600" />
                <span>{t.softSkills}</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {career.coreSoftSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-2xs"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* School Subjects & Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-xs font-bold text-slate-900 mb-2">
                {t.schoolSubjects}
              </h4>
              <ul className="space-y-1 text-xs text-slate-600">
                {career.recommendedSchoolSubjects.map((sub, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-xs font-bold text-slate-900 mb-2">
                {t.tools}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {career.popularTools.map((tl, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-800"
                  >
                    {tl}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Career Progression Stages */}
          <div className="rounded-2xl border border-slate-200 p-4">
            <h4 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>{t.progression}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {career.careerProgression.map((stage, idx) => (
                <div key={idx} className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <div className="text-[10px] font-bold uppercase text-slate-400">{stage.stage}</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{stage.roles.join(' • ')}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{stage.focus}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Action Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 p-4 shrink-0">
          <button
            onClick={() => {
              onClose();
              onExploreUniversities(career.id);
            }}
            className="flex items-center gap-2 rounded-xl bg-white border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-2xs cursor-pointer"
          >
            <GraduationCap className="h-4 w-4 text-slate-600" />
            <span>{t.exploreUnisBtn}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onBuildRoadmap(career.id);
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs cursor-pointer"
          >
            <Map className="h-4 w-4 text-blue-200" />
            <span>{t.buildRoadmapBtn}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
