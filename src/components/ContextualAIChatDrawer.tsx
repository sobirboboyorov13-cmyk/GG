import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Bot,
  User,
  HelpCircle,
  RefreshCw,
  Compass,
  ArrowRight,
  GraduationCap,
  Map,
  BookOpen
} from 'lucide-react';
import { Language, StudentProfile } from '../types';

interface ContextualAIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  contextType: 'career' | 'university' | 'roadmap' | 'general';
  contextData?: any;
  studentProfile: StudentProfile;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const ContextualAIChatDrawer: React.FC<ContextualAIChatDrawerProps> = ({
  isOpen,
  onClose,
  language,
  contextType,
  contextData,
  studentProfile,
}) => {
  const isUz = language === 'uz';
  const isRu = language === 'ru';

  const initialGreeting = isUz
    ? `Salom, ${studentProfile?.name || 'Talaba'}! Men sizning Navigator AI ta'lim va kasbiy maslahatchingizman. Universitetga kirish imtihonlari, IELTS talablari yoki kasb tanlash bo'yicha qanday yordam bera olaman?`
    : isRu
    ? `Здравствуйте, ${studentProfile?.name || 'Студент'}! Я ваш консультант Navigator AI по образованию и карьере. Чем могу помочь по поступлению в университеты, баллам IELTS или выбору профессии?`
    : `Hello ${studentProfile?.name || 'Student'}! I am your Navigator AI Education & Career Advisor. How can I help you regarding your admissions, career choices, or preparation strategy today?`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  // Suggested questions in English, Uzbek, and Russian
  const suggestedQuestionsMap: Record<Language, Record<string, string[]>> = {
    uz: {
      career: [
        'Dasturiy ta\'minot muhandisi bo\'lish uchun qaysi matematika bo\'limlari zarur?',
        'O\'zbekiston va xalqaro kompaniyalar orasida masofaviy maosh farqi qanday?',
        '1-kursda amaliyotga kirish uchun qanday loyihalar qilish kerak?',
      ],
      university: [
        'Toshkentdagi Inha universiteti matematika imtihoniga qanday tayyorlanish kerak?',
        'O\'zbekiston IT yo\'nalishlarida qanday davlat grantlari mavjud?',
        'Xalqaro universitetlar grantlari uchun qanday IELTS bali talab qilinadi?',
      ],
      roadmap: [
        'Maktab davrida IELTS va dasturlashni birgalikda qanday olib borish mumkin?',
        'Ushbu dam olish kunlarida bajarish mumkin bo\'lgan eng samarali qadam nima?',
        'Universitetga topshirish uchun GitHub portfoliosini qanday yaratish kerak?',
      ],
      general: [
        'Navigator AI mening kasbiy mosligimni qanday baholaydi?',
        'Kelgusi 5 yilda eng talabgir IT sohalari qaysilar?',
        'O\'zbekistondagi qaysi universitetlarda xalqaro qo\'shma diplom dasturlari bor?',
      ],
    },
    ru: {
      career: [
        'Какие разделы математики критичны для программиста на 1-м курсе?',
        'Как соотносится зарплата разработчика в Узбекистане и на удаленке за рубежом?',
        'Какие проекты помогут получить первую стажировку в IT?',
      ],
      university: [
        'Как подготовиться к экзамену по математике в Университет Инха в Ташкенте?',
        'Какие государственные гранты и стипендии доступны в вузах Узбекистана?',
        'Какой балл IELTS нужен для получения академического гранта за рубежом?',
      ],
      roadmap: [
        'Как совмещать подготовку к IELTS и практику по программированию в старших классах?',
        'Какое самое полезное действие я могу сделать за эти выходные?',
        'Как оформить GitHub портфолио для поступления в университет?',
      ],
      general: [
        'Как Navigator AI вычисляет процент совместимости с профессией?',
        'Какие IT-специальности будут наиболее востребованы в ближайшие 5 лет?',
        'Какие университеты Узбекистана предлагают программы двойного диплома?',
      ],
    },
    en: {
      career: [
        'What math topics are essential for software engineering in freshman year?',
        'How does remote compensation compare between Uzbekistan and international tech companies?',
        'What first-year projects will help me land an internship?',
      ],
      university: [
        'How can I prepare for the Inha University Tashkent math entrance exam?',
        'What scholarships or state grants are available for IT students in Uzbekistan?',
        'What IELTS band score is required for international university merit scholarships?',
      ],
      roadmap: [
        'How can I balance IELTS test preparation with coding practice during high school?',
        'What is the highest-yield action I can complete this weekend?',
        'How do I create a GitHub portfolio for university applications?',
      ],
      general: [
        'How does Navigator AI evaluate my career compatibility?',
        'What are the most in-demand tech specializations for the next 5 years?',
        'Which Uzbekistan universities have dual-degree programs with international universities?',
      ],
    },
  };

  const currentSuggestions =
    suggestedQuestionsMap[language]?.[contextType] ||
    suggestedQuestionsMap.en[contextType] ||
    suggestedQuestionsMap.en.general;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: 'user_' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsSending(true);

    try {
      const response = await fetch('/api/contextual-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          contextType,
          contextData,
          studentProfile,
          history: messages.slice(-4),
          language,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      const data = await response.json();

      const assistantText = typeof data.content === 'string'
        ? data.content
        : data.content?.text || (typeof data.text === 'string' ? data.text : JSON.stringify(data.content || ''));

      setMessages((prev) => [
        ...prev,
        {
          id: data.id || 'ai_' + Date.now(),
          role: 'assistant',
          content: assistantText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      const fallbackMsg = isUz
        ? 'Asosiy uch ustuvor yo\'nalishga e\'tibor qarating: (1) Til to\'siqlarini yengish uchun erta IELTS 7.0+ oling, (2) Universitet kirish imtihonlari uchun Matematika va Mantiqni chuqur o\'rganing, (3) Portfolioda ko\'rsatish uchun 2 ta real loyiha yarating.'
        : isRu
        ? 'Сфокусируйтесь на трех ключевых направлениях: (1) Сдайте IELTS на 7.0+ заранее, (2) Углубитесь в профильную математику для вступительных экзаменов, (3) Создайте 2 практических проекта для портфолио.'
        : 'Focus on three foundational pillars: (1) Secure IELTS 7.0+ early to clear all language prerequisites, (2) Master Calculus and Discrete Math for university entrance exams, and (3) Build 2 real-world coding projects to showcase in your portfolio.';

      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          role: 'assistant',
          content: fallbackMsg,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        id="ask-ai-advisor-fab"
        onClick={onClose}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-xl hover:bg-blue-700 active:scale-95 transition-all duration-200 cursor-pointer"
        title={isUz ? "AI Maslahatchidan so'rang" : isRu ? "Спросить AI-советника" : "Ask Navigator AI Advisor"}
      >
        <Sparkles className="h-4 w-4 text-blue-200" />
        <span>{isUz ? "AI Maslahatchi" : isRu ? "AI-Советник" : "Ask AI Advisor"}</span>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs sm:hidden"
        onClick={onClose}
      />

      <div
        id="contextual-ai-chat-drawer"
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-all duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-2xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {isUz ? "Navigator AI Maslahatchi" : isRu ? "Navigator AI Советник" : "Navigator AI Advisor"}
              </h3>
              <span className="text-[10px] text-slate-500 capitalize flex items-center gap-1">
                <Compass className="h-3 w-3 text-blue-500" />
                <span>{contextType} {isUz ? "yo'nalishi" : isRu ? "контекст" : "Guidance"}</span>
              </span>
            </div>
          </div>

          <button
            id="close-ai-chat-btn"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed text-xs ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                }`}
              >
                {m.content}
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-2 text-slate-400 text-[11px] italic p-2 bg-slate-50 rounded-xl border border-slate-100">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-600" />
              <span>{isUz ? "AI tahlil qilmoqda..." : isRu ? "AI готовит ответ..." : "AI Advisor is crafting guidance..."}</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80 space-y-1.5 shrink-0">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <HelpCircle className="h-3 w-3" />
            <span>{isUz ? "Tavsiya etilgan savollar" : isRu ? "Рекомендуемые вопросы" : "Recommended Questions"}</span>
          </div>
          <div className="flex flex-col gap-1">
            {currentSuggestions.slice(0, 2).map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sug)}
                className="text-left text-[11px] text-slate-600 hover:text-blue-700 bg-white border border-slate-200/90 rounded-lg p-2 truncate transition shadow-2xs cursor-pointer hover:border-blue-300"
              >
                • {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Input Field Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-slate-200 bg-white flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              isUz
                ? "Universitetlar, fanlar yoki kasb haqida so'rang..."
                : isRu
                ? "Спросите о вузах, экзаменах или карьере..."
                : "Ask a question about universities, careers..."
            }
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isSending}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
};
