import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  BookOpen,
  GraduationCap,
  Map,
  Bookmark,
  ArrowRight,
  CheckCircle2,
  Code2,
  TrendingUp,
  X,
  Compass,
  Zap,
  Briefcase
} from 'lucide-react';
import { CareerDetail, Language, AssessmentResult } from '../types';
import { CAREERS_DATABASE } from '../data/careersData';
import { I18N } from '../lib/i18n';
import { CareerDetailModal } from './CareerDetailModal';

interface CareersExplorerProps {
  language: Language;
  assessmentResult: AssessmentResult | null;
  savedCareerIds: string[];
  onToggleSaveCareer: (careerId: string) => void;
  onSelectUniversityFromCareer: (careerId: string) => void;
  onBuildRoadmapForCareer: (careerId: string) => void;
}

export const CareersExplorer: React.FC<CareersExplorerProps> = ({
  language,
  assessmentResult,
  savedCareerIds,
  onToggleSaveCareer,
  onSelectUniversityFromCareer,
  onBuildRoadmapForCareer,
}) => {
  const t = I18N[language]?.careers || I18N.en.careers;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCareerModal, setActiveCareerModal] = useState<CareerDetail | null>(null);

  // Available categories
  const categories = [
    { id: 'all', label: t.categoryAll },
    { id: 'Tech & AI', label: t.categoryTech },
    { id: 'Engineering', label: t.categoryEngineering },
    { id: 'Business & Product', label: t.categoryBusiness },
    { id: 'Design & Creative', label: t.categoryDesign },
    { id: 'Science & Health', label: t.categoryScience },
  ];

  // Build a fast lookup for assessment scores
  const matchMap = useMemo(() => {
    const map: Record<string, { score: number; rationale: string }> = {};
    if (assessmentResult?.careerMatches) {
      assessmentResult.careerMatches.forEach((m) => {
        map[m.careerId] = { score: m.matchScore, rationale: m.whyItMatches };
      });
    }
    return map;
  }, [assessmentResult]);

  // Filtered & sorted careers
  const filteredCareers = useMemo(() => {
    return CAREERS_DATABASE.filter((career) => {
      // Category filter
      const matchesCat =
        selectedCategory === 'all' ||
        career.category.toLowerCase().includes(selectedCategory.toLowerCase());

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        career.title.toLowerCase().includes(q) ||
        career.shortDescription.toLowerCase().includes(q) ||
        career.coreTechnicalSkills.some((sk) => sk.toLowerCase().includes(q)) ||
        career.popularTools.some((tl) => tl.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      // If assessment results exist, sort by match score
      const scoreA = matchMap[a.id]?.score || 0;
      const scoreB = matchMap[b.id]?.score || 0;
      return scoreB - scoreA;
    });
  }, [selectedCategory, searchQuery, matchMap]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
            <Compass className="h-3.5 w-3.5" />
            <span>Curated Career Matrix</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {t.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Assessment Status Notice */}
        {assessmentResult ? (
          <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-xs font-bold text-emerald-800 shadow-2xs">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>Ranked by your cognitive profile: {assessmentResult.profileArchetype}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 border border-slate-200 px-3 py-2 text-xs text-slate-600">
            <Zap className="h-3.5 w-3.5 text-blue-600" />
            <span>Complete Career Assessment to unlock personalized match %</span>
          </div>
        )}
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((career) => {
          const matchData = matchMap[career.id];
          const isSaved = savedCareerIds.includes(career.id);

          return (
            <div
              key={career.id}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs hover:border-blue-300 hover:shadow-xs transition duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Top badges & save button */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="rounded-md bg-slate-100 text-slate-700 px-2.5 py-0.5 text-[11px] font-bold">
                      {career.category}
                    </span>
                    {matchData && (
                      <span className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        <span>{matchData.score}% Fit</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onToggleSaveCareer(career.id)}
                    className={`h-8 w-8 rounded-lg flex items-center justify-center border transition shrink-0 ${
                      isSaved
                        ? 'border-blue-200 bg-blue-50 text-blue-600'
                        : 'border-slate-100 bg-slate-50 text-slate-400 hover:text-slate-800'
                    }`}
                    title={isSaved ? 'Saved' : 'Save career'}
                  >
                    <Bookmark className="h-3.5 w-3.5 fill-current" />
                  </button>
                </div>

                {/* Career Title & Summary */}
                <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                  {career.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {career.shortDescription}
                </p>

                {/* Match rationale preview if available */}
                {matchData?.rationale && (
                  <div className="mt-3 rounded-xl bg-blue-50/70 p-2.5 border border-blue-100 text-[11px] text-blue-900 line-clamp-2 leading-relaxed">
                    <strong>Why fits you: </strong>
                    {matchData.rationale}
                  </div>
                )}

                {/* Skills tags preview */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {career.coreTechnicalSkills.slice(0, 3).map((sk, sIdx) => (
                    <span
                      key={sIdx}
                      className="rounded-md bg-slate-50 border border-slate-200/80 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                    >
                      {sk}
                    </span>
                  ))}
                  {career.coreTechnicalSkills.length > 3 && (
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-400">
                      +{career.coreTechnicalSkills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveCareerModal(career)}
                  className="text-xs font-bold text-slate-700 hover:text-blue-600 transition flex items-center gap-1"
                >
                  <span>{t.viewDetailsBtn}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectUniversityFromCareer(career.id)}
                    className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition"
                    title={t.exploreUnisBtn}
                  >
                    <GraduationCap className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onBuildRoadmapForCareer(career.id)}
                    className="rounded-xl bg-blue-600 p-2 text-white hover:bg-blue-700 shadow-2xs transition"
                    title={t.buildRoadmapBtn}
                  >
                    <Map className="h-4 w-4 text-blue-200" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Career Detail Modal */}
      {activeCareerModal && (
        <CareerDetailModal
          career={activeCareerModal}
          onClose={() => setActiveCareerModal(null)}
          language={language}
          assessmentResult={assessmentResult}
          isSaved={savedCareerIds.includes(activeCareerModal.id)}
          onToggleSave={onToggleSaveCareer}
          onExploreUniversities={onSelectUniversityFromCareer}
          onBuildRoadmap={onBuildRoadmapForCareer}
        />
      )}

    </div>
  );
};
