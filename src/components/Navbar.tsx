import React from 'react';
import {
  Compass,
  Sparkles,
  Award,
  Bookmark,
  Languages,
  BookOpen,
  GraduationCap,
  Map,
  User,
  FileCheck2,
  ChevronDown
} from 'lucide-react';
import { Language } from '../types';
import { I18N } from '../lib/i18n';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenDemoTour: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenDemoTour,
  savedCount,
}) => {
  const t = I18N[language] || I18N.en;

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'assessment', label: t.nav.discover, icon: Sparkles, highlight: true },
    { id: 'careers', label: t.nav.careers, icon: BookOpen },
    { id: 'universities', label: t.nav.universities, icon: GraduationCap },
    { id: 'roadmap', label: t.nav.roadmap, icon: Map },
    { id: 'doc-assistant', label: t.nav.docAssistant, icon: FileCheck2 },
    { id: 'profile', label: t.nav.profile, icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          
          {/* Brand Logo & Tagline */}
          <div
            id="brand-header-logo"
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F172A] text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
              <Compass className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  {t.nav.brand}
                </span>
                <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-100">
                  EdTech AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                {t.nav.tagline}
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : item.highlight
                      ? 'text-blue-700 bg-blue-50/80 hover:bg-blue-100 font-bold border border-blue-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-300' : item.highlight ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* 2-Min Judge Tour Button */}
            <button
              id="open-judge-tour-btn"
              onClick={onOpenDemoTour}
              className="flex items-center gap-1.5 rounded-xl bg-amber-50 border border-amber-200 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-100 active:scale-95 transition shadow-2xs cursor-pointer"
              title="2-Minute Competition Judge Tour"
            >
              <Award className="h-3.5 w-3.5 text-amber-700 shrink-0" />
              <span className="hidden sm:inline">{t.nav.tour}</span>
              <span className="sm:hidden text-[11px]">Tour</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center rounded-xl bg-slate-100 p-0.5 text-xs font-semibold border border-slate-200">
              {(['en', 'uz', 'ru'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  id={`lang-toggle-${lang}`}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded-lg uppercase text-[11px] font-bold transition cursor-pointer ${
                    language === lang
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Profile / Saved quick button */}
            <button
              id="quick-profile-btn"
              onClick={() => setCurrentTab('profile')}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              title="Saved items and profile"
            >
              <Bookmark className="h-3.5 w-3.5 text-blue-600" />
              <span>{savedCount}</span>
            </button>

          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 border-t border-slate-100 no-scrollbar items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 min-h-[40px] rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : item.highlight
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-300' : item.highlight ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
