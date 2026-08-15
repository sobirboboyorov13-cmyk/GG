import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  MapPin,
  Sparkles,
  ExternalLink,
  Bookmark,
  Calendar,
  DollarSign,
  Award,
  CheckCircle2,
  BookOpen,
  Send,
  Building2,
  FileCheck2,
  Clock,
  Map,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';
import { University, Language, UniversityProgram } from '../types';
import { I18N } from '../lib/i18n';

interface UniversityDetailRoomProps {
  university: University | null;
  onClose: () => void;
  language: Language;
  isSaved: boolean;
  onToggleSave: (uniId: string) => void;
  onBuildRoadmap: (uniId: string, programName?: string) => void;
}

export const UniversityDetailRoom: React.FC<UniversityDetailRoomProps> = ({
  university,
  onClose,
  language,
  isSaved,
  onToggleSave,
  onBuildRoadmap,
}) => {
  if (!university) return null;

  const t = I18N[language]?.universities || I18N.en.universities;
  const [activeTab, setActiveTab] = useState<'programs' | 'admissions' | 'scholarships' | 'outcomes'>('programs');

  return (
    <div
      id="university-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="university-detail-room-modal"
        className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6 bg-slate-50/80 shrink-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{university.city}, {university.country}</span>
              </span>
              {university.rankingNote && (
                <span className="rounded-md bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                  {university.rankingNote}
                </span>
              )}
            </div>
            <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">{university.name}</h2>
            <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 flex-wrap">
              <span>{university.tuitionOverviewUsd}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Verified {university.lastVerified}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id={`modal-save-uni-${university.id}`}
              onClick={() => onToggleSave(university.id)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition cursor-pointer ${
                isSaved
                  ? 'border-blue-300 bg-blue-50 text-blue-600'
                  : 'border-slate-200 bg-white text-slate-500 hover:text-slate-900'
              }`}
              title={isSaved ? 'Saved' : 'Save university'}
            >
              <Bookmark className="h-4 w-4 fill-current" />
            </button>

            <button
              id="close-uni-detail-modal-btn"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-2 px-5 sm:px-6 pt-3 border-b border-slate-100 bg-white overflow-x-auto shrink-0 no-scrollbar">
          {[
            { id: 'programs', label: t.tabPrograms, icon: BookOpen },
            { id: 'admissions', label: t.tabAdmissions, icon: FileCheck2 },
            { id: 'scholarships', label: t.tabScholarships, icon: Award },
            { id: 'outcomes', label: t.tabOutcomes, icon: Compass },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`uni-modal-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-3 px-2.5 text-xs font-bold transition border-b-2 whitespace-nowrap cursor-pointer min-h-[38px] ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Room Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* TAB: PROGRAMS */}
          {activeTab === 'programs' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
                {university.about}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {university.programs.map((program) => (
                  <div
                    key={program.id}
                    id={`program-card-${program.id}`}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-md bg-blue-50 text-blue-700 px-2 py-0.5 text-[10px] font-bold">
                          {program.degreeType} • {program.durationYears} Years
                        </span>
                        {program.scholarshipEligible && (
                          <span className="rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-bold">
                            Grant Eligible
                          </span>
                        )}
                      </div>

                      <h4 className="mt-2 text-sm font-bold text-slate-900">{program.name}</h4>

                      <div className="mt-2 text-xs text-slate-500">
                        Language: {program.languageOfInstruction.join(', ')}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {program.keySubjects.map((sub, sIdx) => (
                          <span
                            key={sIdx}
                            className="rounded-md bg-slate-50 border border-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 font-medium"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      id={`roadmap-for-program-btn-${program.id}`}
                      onClick={() => {
                        onClose();
                        onBuildRoadmap(university.id, program.name);
                      }}
                      className="mt-2 flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 py-2.5 text-xs font-bold text-slate-700 transition cursor-pointer min-h-[36px]"
                    >
                      <Map className="h-3.5 w-3.5" />
                      <span>Roadmap for this Major</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ADMISSIONS */}
          {activeTab === 'admissions' && (
            <div className="space-y-6">
              
              {/* Language & Standardized Exam Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Language Test Prerequisites
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {university.admissions.languageRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-100">
                        <span className="font-semibold text-slate-800">{req.test}</span>
                        <span className="font-bold text-blue-600">{req.minimumScore}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Entrance & Standardized Exams
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {university.admissions.standardizedTests.map((test, idx) => (
                      <li key={idx} className="bg-white p-2.5 rounded-xl border border-slate-100 space-y-1">
                        <div className="font-bold text-slate-800">{test.test}</div>
                        <div className="text-[11px] text-slate-500 leading-relaxed">{test.details}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Deadlines */}
              <div className="rounded-2xl border border-slate-200 p-4 bg-white space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span>Upcoming Application Rounds & Deadlines</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {university.admissions.applicationDeadlines.map((dl, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-50 p-3 border border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{dl.round}</span>
                      <span className="text-xs font-bold text-blue-600">{dl.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents */}
              <div className="rounded-2xl border border-slate-200 p-4 bg-white space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Required Application Dossier
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {university.admissions.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB: SCHOLARSHIPS */}
          {activeTab === 'scholarships' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 space-y-2">
                <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-emerald-600" />
                  <span>Scholarships & Grants Policy</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed">
                  {university.scholarshipInfo}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5 bg-white space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  International Student Policy
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {university.internationalStudentsPolicy}
                </p>
              </div>
            </div>
          )}

          {/* TAB: OUTCOMES */}
          {activeTab === 'outcomes' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 p-5 bg-white space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="h-4 w-4 text-blue-600" />
                  <span>Graduate Career Outcomes & Alumni Placements</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {university.careerOutcomes}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Campus & Facilities
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {university.campusInfo}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Action Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 p-4 shrink-0">
          <a
            id="modal-external-website-link"
            href={university.officialWebsite}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 transition"
          >
            <span>Official University Portal</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <button
            id="modal-generate-roadmap-btn"
            onClick={() => {
              onClose();
              onBuildRoadmap(university.id);
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs cursor-pointer min-h-[38px]"
          >
            <Map className="h-4 w-4 text-blue-200" />
            <span>Generate Admissions Roadmap</span>
          </button>
        </div>

      </div>
    </div>
  );
};
