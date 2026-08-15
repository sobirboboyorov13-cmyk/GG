import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  GraduationCap,
  MapPin,
  Sparkles,
  ExternalLink,
  Bookmark,
  Calendar,
  DollarSign,
  Award,
  CheckCircle2,
  Map,
  X,
  Globe2,
  Clock
} from 'lucide-react';
import { University, Language, StudentProfile, AssessmentResult } from '../types';
import { UNIVERSITIES_DATABASE } from '../data/universitiesData';
import { I18N } from '../lib/i18n';
import { UniversityDetailRoom } from './UniversityDetailRoom';

interface UniversitiesExplorerProps {
  language: Language;
  studentProfile: StudentProfile;
  assessmentResult: AssessmentResult | null;
  savedUniversityIds: string[];
  onToggleSaveUniversity: (uniId: string) => void;
  onBuildRoadmapForUniversity: (uniId: string, programName?: string) => void;
  initialSelectedUniId?: string | null;
}

export const UniversitiesExplorer: React.FC<UniversitiesExplorerProps> = ({
  language,
  studentProfile,
  assessmentResult,
  savedUniversityIds,
  onToggleSaveUniversity,
  onBuildRoadmapForUniversity,
  initialSelectedUniId,
}) => {
  const t = I18N[language]?.universities || I18N.en.universities;

  const [activeTab, setActiveTab] = useState<'uzbekistan' | 'international'>('uzbekistan');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDegree, setSelectedDegree] = useState<string>('all');
  const [scholarshipOnly, setScholarshipOnly] = useState<boolean>(false);
  const [activeUniModal, setActiveUniModal] = useState<University | null>(() => {
    if (initialSelectedUniId) {
      return UNIVERSITIES_DATABASE.find((u) => u.id === initialSelectedUniId) || null;
    }
    return null;
  });

  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES_DATABASE.filter((u) => {
      // Tab filter
      const matchesTab = u.type === activeTab;

      // Degree filter
      const matchesDegree =
        selectedDegree === 'all' ||
        u.programs.some((p) => p.degreeType.toLowerCase().includes(selectedDegree));

      // Scholarship filter
      const matchesScholarship =
        !scholarshipOnly ||
        u.scholarshipInfo.toLowerCase().includes('grant') ||
        u.scholarshipInfo.toLowerCase().includes('available') ||
        u.scholarshipInfo.toLowerCase().includes('merit') ||
        u.scholarshipInfo.toLowerCase().includes('full') ||
        u.scholarshipInfo.toLowerCase().includes('need-blind');

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q) ||
        u.programs.some((p) => p.name.toLowerCase().includes(q));

      return matchesTab && matchesDegree && matchesScholarship && matchesSearch;
    });
  }, [activeTab, selectedDegree, scholarshipOnly, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Verified Higher Education Database</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {t.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Room Switcher: Uzbekistan vs International */}
        <div className="flex items-center rounded-2xl bg-slate-100 p-1 border border-slate-200 shadow-2xs self-start md:self-auto">
          <button
            id="uni-tab-uzbekistan"
            onClick={() => setActiveTab('uzbekistan')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer min-h-[38px] ${
              activeTab === 'uzbekistan'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{t.tabUzbekistan}</span>
          </button>

          <button
            id="uni-tab-international"
            onClick={() => setActiveTab('international')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer min-h-[38px] ${
              activeTab === 'international'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{t.tabInternational}</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            id="uni-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 shadow-2xs"
          />
          {searchQuery && (
            <button
              id="clear-uni-search-btn"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Degree Level Filter */}
          <select
            id="uni-degree-filter"
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Degrees</option>
            <option value="bachelor">Bachelor's</option>
            <option value="master">Master's</option>
          </select>

          {/* Scholarship Toggle */}
          <button
            id="uni-scholarship-toggle"
            onClick={() => setScholarshipOnly((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition cursor-pointer min-h-[38px] ${
              scholarshipOnly
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800 shadow-2xs'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Award className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t.filterScholarship}</span>
          </button>
        </div>
      </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredUniversities.map((uni) => {
          const isSaved = savedUniversityIds.includes(uni.id);
          const ieltsReq = uni.admissions?.languageRequirements?.find((l) => l.test === 'IELTS')?.minimumScore || '6.0';

          return (
            <div
              key={uni.id}
              id={`uni-card-${uni.id}`}
              className="group rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs hover:border-blue-300 hover:shadow-xs transition duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Top Badge Strip */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="rounded-md bg-blue-50 text-blue-800 border border-blue-100 px-2 py-0.5 text-[10px] font-bold flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{uni.city}, {uni.country}</span>
                    </span>
                    {uni.rankingNote && (
                      <span className="rounded-md bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 text-[10px] font-bold truncate max-w-[170px]">
                        {uni.rankingNote}
                      </span>
                    )}
                  </div>

                  <button
                    id={`toggle-save-uni-${uni.id}`}
                    onClick={() => onToggleSaveUniversity(uni.id)}
                    className={`h-8 w-8 rounded-lg flex items-center justify-center border transition shrink-0 cursor-pointer ${
                      isSaved
                        ? 'border-blue-200 bg-blue-50 text-blue-600'
                        : 'border-slate-100 bg-slate-50 text-slate-400 hover:text-slate-800'
                    }`}
                    title={isSaved ? 'Saved' : 'Save university'}
                  >
                    <Bookmark className="h-3.5 w-3.5 fill-current" />
                  </button>
                </div>

                {/* University Name */}
                <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                  {uni.name}
                </h3>
                <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {uni.about}
                </p>

                {/* Quick Academic Highlights */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100/80 space-y-1">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-[11px] text-slate-500 font-medium">IELTS Min:</span>
                      <span className="font-bold text-slate-900">{ieltsReq}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-[11px] text-slate-500 font-medium">Tuition:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[170px]">{uni.tuitionOverviewUsd}</span>
                    </div>
                  </div>

                  {/* Programs Snippet */}
                  <div className="flex flex-wrap gap-1">
                    {uni.programs.slice(0, 2).map((pr, pIdx) => (
                      <span
                        key={pIdx}
                        className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                      >
                        {pr.name}
                      </span>
                    ))}
                    {uni.programs.length > 2 && (
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-400">
                        +{uni.programs.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Verified {uni.lastVerified}</span>
                  </span>
                  <a
                    href={uni.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-semibold hover:underline flex items-center gap-0.5"
                  >
                    <span>Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    id={`open-uni-profile-btn-${uni.id}`}
                    onClick={() => setActiveUniModal(uni)}
                    className="flex items-center justify-center gap-1 rounded-xl bg-slate-100 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer min-h-[38px]"
                  >
                    <span>{t.viewDetails}</span>
                  </button>

                  <button
                    id={`build-roadmap-uni-btn-${uni.id}`}
                    onClick={() => onBuildRoadmapForUniversity(uni.id)}
                    className="flex items-center justify-center gap-1 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-2xs cursor-pointer min-h-[38px]"
                  >
                    <Map className="h-3.5 w-3.5 text-blue-200" />
                    <span>Roadmap</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* University Detail Room Modal */}
      {activeUniModal && (
        <UniversityDetailRoom
          university={activeUniModal}
          onClose={() => setActiveUniModal(null)}
          language={language}
          isSaved={savedUniversityIds.includes(activeUniModal.id)}
          onToggleSave={onToggleSaveUniversity}
          onBuildRoadmap={onBuildRoadmapForUniversity}
        />
      )}

    </div>
  );
};
