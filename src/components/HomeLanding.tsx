import React from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Map,
  BookOpen,
  CheckCircle2,
  Award,
  Layers,
  Search,
  Globe2,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Language } from '../types';
import { I18N } from '../lib/i18n';

interface HomeLandingProps {
  language: Language;
  onStartAssessment: () => void;
  onExploreUniversities: () => void;
  onExploreCareers: () => void;
  onLoadDemoStudent: () => void;
  onOpenJudgeTour: () => void;
}

export const HomeLanding: React.FC<HomeLandingProps> = ({
  language,
  onStartAssessment,
  onExploreUniversities,
  onExploreCareers,
  onLoadDemoStudent,
  onOpenJudgeTour,
}) => {
  const t = I18N[language]?.home || I18N.en.home;

  return (
    <div className="space-y-16 py-6 md:py-10">
      
      {/* 1. HERO SECTION */}
      <section className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        
        {/* Top subtle badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-800 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span>AI-Powered Career Discovery & University Platform for Students</span>
        </div>

        {/* Hero Title */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-[1.15]">
          {t.heroTitle}
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {t.heroSub}
        </p>

        {/* Primary and Secondary Call to Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartAssessment}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-blue-700 shadow-sm hover:shadow transition-all duration-150 group cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-blue-200 group-hover:rotate-12 transition-transform" />
            <span>{t.ctaDiscover}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={onExploreUniversities}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-300 px-5 py-3.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:border-slate-400 shadow-2xs transition cursor-pointer"
          >
            <GraduationCap className="h-4 w-4 text-slate-600" />
            <span>{t.ctaUniversities}</span>
          </button>

          <button
            onClick={onOpenJudgeTour}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-5 py-3.5 text-sm font-bold text-amber-900 hover:bg-amber-100 transition cursor-pointer"
          >
            <Award className="h-4 w-4 text-amber-700" />
            <span>{t.ctaJudgeTour}</span>
          </button>
        </div>

      </section>

      {/* 2. VISUAL FLOW: YOU → AI ASSESSMENT → CAREER MATCH → UNIVERSITIES → YOUR ROADMAP */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {t.journeyTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {t.journeySub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            
            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 flex flex-col justify-between hover:border-blue-200 transition">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold mb-4">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900">{t.step1Title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {t.step1Desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-blue-700">
                15+ Cognitive Dimensions
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 flex flex-col justify-between hover:border-blue-200 transition">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 font-bold mb-4">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900">{t.step2Title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {t.step2Desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-indigo-700">
                Evidence-Based Match Scores
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 flex flex-col justify-between hover:border-blue-200 transition">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold mb-4">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900">{t.step3Title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {t.step3Desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-emerald-700">
                🇺🇿 Uzbekistan & 🌍 International
              </div>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold mb-4">
                  4
                </div>
                <h3 className="text-base font-bold text-slate-900">{t.step4Title}</h3>
                <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                  {t.step4Desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-200 text-[11px] font-bold text-blue-800">
                Custom Timeline & Today's Action
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. QUICK DEMO SCENARIO FOR COMPETITION JUDGES & NEW VISITORS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-[#0F172A] text-white p-6 sm:p-10 shadow-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-lg bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 mb-3 border border-blue-500/30">
                <Award className="h-3.5 w-3.5 text-blue-400" />
                <span>Ready-to-Test Student Case</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {t.demoCaseTitle}
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                "{language === 'uz' 
                  ? "Men matematika, texnologiya va murakkab masalalarni yechishni yoqtiraman. Narsalarni mustaqil o'rganib yaratishni xohlayman. Sun'iy intellekt sohasida ishlashni va O'zbekiston yoki xorijda o'qishni istayman."
                  : language === 'ru'
                  ? "Я люблю математику, технологии и решение сложных задач. Мне нравится создавать вещи и учиться самостоятельно. Хочу учиться в Узбекистане или за рубежом и работать в сфере ИИ."
                  : "I enjoy mathematics, technology and solving difficult problems. I like building things and learning independently. I want to study in Uzbekistan or abroad and eventually work in AI."}"
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="rounded-md bg-slate-800 px-2.5 py-1 font-medium border border-slate-700">
                  🎯 Software Engineering (95% Match)
                </span>
                <span className="rounded-md bg-slate-800 px-2.5 py-1 font-medium border border-slate-700">
                  🏛️ INHA University in Tashkent
                </span>
                <span className="rounded-md bg-slate-800 px-2.5 py-1 font-medium border border-slate-700">
                  🗺️ 12-Month Custom Roadmap
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={onLoadDemoStudent}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-400 px-6 py-3.5 text-sm font-bold text-white transition shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="h-4 w-4" />
                <span>{t.demoCaseBtn}</span>
              </button>
              <button
                onClick={onOpenJudgeTour}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-5 py-3 text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span>Launch 2-Min Interactive Tour</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TRUST & ACCURACY NOTICE */}
      <section className="mx-auto max-w-4xl px-4 text-center">
        <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-200 pt-6">
          {I18N[language]?.common?.aiCompatibilityNotice || I18N.en.common.aiCompatibilityNotice}
        </p>
      </section>

    </div>
  );
};
