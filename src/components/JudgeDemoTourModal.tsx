import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Brain,
  BookOpen,
  GraduationCap,
  Map,
  Zap,
  Target
} from 'lucide-react';
import { Language } from '../types';

interface JudgeDemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onJumpToTab: (tab: string) => void;
  onLoadFullDemo: () => void;
}

export const JudgeDemoTourModal: React.FC<JudgeDemoTourModalProps> = ({
  isOpen,
  onClose,
  language,
  onJumpToTab,
  onLoadFullDemo,
}) => {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      title: '1. The Problem & Student Persona',
      badge: 'Step 1: Discovery',
      icon: Brain,
      color: 'blue',
      content:
        'Millions of high school students in Uzbekistan and globally struggle with generic, disconnected career advice and outdated university lists. Meet our sample student: Sobir (18), strong in mathematics and logic, aspiring to build AI products.',
      keyTakeaway: 'Navigator AI replaces static lists with an integrated, multi-dimensional cognitive assessment measuring 15+ dimensions.',
      actionTab: 'assessment',
      actionLabel: 'View Assessment Demo'
    },
    {
      title: '2. Evidence-Based Career Compatibility',
      badge: 'Step 2: AI Matching',
      icon: Sparkles,
      color: 'indigo',
      content:
        'Rather than black-box recommendations, Navigator AI generates transparent, evidence-based compatibility scores with detailed "why it fits you" rationales, core skills, required school subjects, and tools.',
      keyTakeaway: 'Our model identified Software Engineer (95% Fit) and Data Scientist & AI (92% Fit) grounded in the student\'s mathematical rigor.',
      actionTab: 'careers',
      actionLabel: 'Explore Career Matrix'
    },
    {
      title: '3. Real University Admissions Gateway',
      badge: 'Step 3: University Navigation',
      icon: GraduationCap,
      color: 'emerald',
      content:
        'We connect career paths directly with verified higher education programs across Uzbekistan (INHA Tashkent, TUIT, WIUT, Turin, New Uzbekistan) and globally (MIT, Imperial, NUS, TUM).',
      keyTakeaway: 'Includes real IELTS/TOEFL requirements, entrance examination syllabi, tuition fees, state grant availability, and direct portal links.',
      actionTab: 'universities',
      actionLabel: 'Open Universities Room'
    },
    {
      title: '4. Actionable 12-Month Personal Roadmap',
      badge: 'Step 4: Execution Plan',
      icon: Map,
      color: 'amber',
      content:
        'The journey concludes with a personal step-by-step roadmap: 5 structured phases, weekly goal tracking, IELTS/Math entrance milestones, and an immediate 60-minute deliverable for today.',
      keyTakeaway: 'Turns abstract career dreams into concrete, measurable daily execution.',
      actionTab: 'roadmap',
      actionLabel: 'Inspect Active Roadmap'
    }
  ];

  const step = steps[currentStep];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((p) => p + 1);
    } else {
      onLoadFullDemo();
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((p) => p - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700 font-bold border border-amber-200">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Navigator AI: 2-Minute Judge Tour
              </h2>
              <p className="text-xs text-slate-500">
                Interactive architecture walkthrough for hackathon judges
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Indicator Progress */}
        <div className="flex items-center justify-between gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                idx === currentStep
                  ? 'bg-blue-600'
                  : idx < currentStep
                  ? 'bg-blue-300'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Step Card Content */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5">
              {step.badge}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {currentStep + 1} of {steps.length}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <StepIcon className="h-5 w-5 text-blue-600" />
            <span>{step.title}</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {step.content}
          </p>

          <div className="rounded-xl bg-white border border-slate-200/80 p-3.5 text-xs text-slate-800">
            <strong className="text-blue-700 font-semibold">Key Innovation: </strong>
            {step.keyTakeaway}
          </div>
        </div>

        {/* Quick jump trigger */}
        <div className="flex items-center justify-between text-xs pt-2">
          <button
            onClick={() => {
              onLoadFullDemo();
              onJumpToTab(step.actionTab);
              onClose();
            }}
            className="text-blue-600 font-bold hover:underline flex items-center gap-1"
          >
            <span>Launch Live: {step.actionLabel}</span>
            <ArrowRight className="h-3 w-3" />
          </button>

          <button
            onClick={() => {
              onLoadFullDemo();
              onClose();
            }}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Load Full Student Scenario
          </button>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl transition ${
              currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-xs transition"
          >
            <span>{currentStep === steps.length - 1 ? 'Start Complete Demo' : 'Next Step'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
