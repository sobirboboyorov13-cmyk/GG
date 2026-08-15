import React, { useState } from 'react';
import {
  User,
  Sparkles,
  BookOpen,
  GraduationCap,
  Bookmark,
  CheckCircle2,
  Save,
  MapPin,
  Award,
  Globe2,
  Target,
  ArrowRight,
  Trash2
} from 'lucide-react';
import { StudentProfile, Language } from '../types';
import { CAREERS_DATABASE } from '../data/careersData';
import { UNIVERSITIES_DATABASE } from '../data/universitiesData';
import { I18N } from '../lib/i18n';

interface StudentProfileViewProps {
  profile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
  language: Language;
  savedCareerIds: string[];
  savedUniversityIds: string[];
  onOpenCareer: (careerId: string) => void;
  onOpenUniversity: (uniId: string) => void;
  onRemoveSavedCareer: (careerId: string) => void;
  onRemoveSavedUniversity: (uniId: string) => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  profile,
  onSaveProfile,
  language,
  savedCareerIds,
  savedUniversityIds,
  onOpenCareer,
  onOpenUniversity,
  onRemoveSavedCareer,
  onRemoveSavedUniversity,
}) => {
  const t = I18N[language]?.profile || I18N.en.profile;

  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  const savedCareers = CAREERS_DATABASE.filter((c) => savedCareerIds.includes(c.id));
  const savedUnis = UNIVERSITIES_DATABASE.filter((u) => savedUniversityIds.includes(u.id));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
            <User className="h-3.5 w-3.5" />
            <span>Student Dossier</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            {t.subtitle}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          {savedStatus ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Save className="h-4 w-4" />}
          <span>{savedStatus ? 'Saved Successfully!' : t.saveBtn}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Form fields */}
        <form onSubmit={handleSave} className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Academic & Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.name}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City & Country</label>
                <input
                  type="text"
                  value={`${formData.city || 'Tashkent'}, ${formData.country || 'Uzbekistan'}`}
                  onChange={(e) => {
                    const [city, country] = e.target.value.split(',');
                    setFormData({ ...formData, city: city?.trim(), country: country?.trim() });
                  }}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.educationLevel}</label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value as any })}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-800"
                >
                  <option value="middle_school">Middle School (Grades 7-9)</option>
                  <option value="high_school">High School / Lyceum (Grades 10-11)</option>
                  <option value="undergraduate">University Undergraduate</option>
                  <option value="graduate">Graduate / Working Professional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.englishLevel}</label>
                <select
                  value={formData.englishLevel}
                  onChange={(e) => setFormData({ ...formData, englishLevel: e.target.value as any })}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-800"
                >
                  <option value="beginner">Beginner (A1/A2)</option>
                  <option value="intermediate">Intermediate (B1/B2)</option>
                  <option value="ielts_6_65">IELTS 6.0 - 6.5 (Upper Intermediate)</option>
                  <option value="ielts_7_plus">IELTS 7.0+ (Advanced / Fluent)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.favoriteSubjects}</label>
              <input
                type="text"
                value={formData.favoriteSubjects.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    favoriteSubjects: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="e.g. Mathematics, Informatics, Physics, English"
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.budget}</label>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value as any })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-800"
              >
                <option value="full_grant_only">100% Scholarship / State Grant Only</option>
                <option value="budget_under_3k">Under $3,000 / year (Standard Local Rate)</option>
                <option value="mid_3k_10k">$3,000 - $10,000 / year (International Branch Campuses)</option>
                <option value="flexible_10k_plus">$10,000+ / year (Global Direct Admission)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.studyGoals}</label>
              <textarea
                rows={3}
                value={formData.studyGoals}
                onChange={(e) => setFormData({ ...formData, studyGoals: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-900 leading-relaxed"
              />
            </div>
          </div>
        </form>

        {/* Right 1 Col: Saved Careers & Saved Universities */}
        <div className="space-y-6">
          
          {/* Saved Careers */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
              <span>{t.savedCareers.replace('{count}', String(savedCareers.length))}</span>
              <Bookmark className="h-3.5 w-3.5 text-blue-600" />
            </h3>

            {savedCareers.length === 0 ? (
              <p className="text-xs text-slate-400 py-3">No saved careers yet.</p>
            ) : (
              <div className="space-y-2">
                {savedCareers.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 flex items-center justify-between gap-2"
                  >
                    <div
                      onClick={() => onOpenCareer(c.id)}
                      className="cursor-pointer hover:text-blue-600 transition truncate"
                    >
                      <div className="text-xs font-bold text-slate-800 truncate">{c.title}</div>
                      <div className="text-[10px] text-slate-400">{c.category}</div>
                    </div>

                    <button
                      onClick={() => onRemoveSavedCareer(c.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Universities */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
              <span>{t.savedUnis.replace('{count}', String(savedUnis.length))}</span>
              <GraduationCap className="h-3.5 w-3.5 text-indigo-600" />
            </h3>

            {savedUnis.length === 0 ? (
              <p className="text-xs text-slate-400 py-3">No saved universities yet.</p>
            ) : (
              <div className="space-y-2">
                {savedUnis.map((u) => (
                  <div
                    key={u.id}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 flex items-center justify-between gap-2"
                  >
                    <div
                      onClick={() => onOpenUniversity(u.id)}
                      className="cursor-pointer hover:text-blue-600 transition truncate"
                    >
                      <div className="text-xs font-bold text-slate-800 truncate">{u.name}</div>
                      <div className="text-[10px] text-slate-400">{u.city}, {u.country}</div>
                    </div>

                    <button
                      onClick={() => onRemoveSavedUniversity(u.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
