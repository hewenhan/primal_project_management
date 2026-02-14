import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Globe, ArrowRight } from 'lucide-react';

interface Props {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onConfirm: () => void;
}

export const LanguageSetup: React.FC<Props> = ({ currentLanguage, onLanguageChange, onConfirm }) => {
  const t = TRANSLATIONS[currentLanguage];

  const langs: { id: Language; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'zh', label: '简体中文' },
    { id: 'ja', label: '日本語' },
    { id: 'ko', label: '한국어' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="max-w-md w-full p-8 text-center space-y-8">
        <div className="flex justify-center mb-8">
            <div className="relative">
                <div className="absolute inset-0 bg-primary blur-xl opacity-50 rounded-full animate-pulse"></div>
                <Globe className="w-16 h-16 text-primary relative z-10" />
            </div>
        </div>

        <div>
            <h1 className="text-3xl font-black text-white tracking-widest uppercase mb-2">
                {t.welcomeTitle}
            </h1>
            <p className="text-gray-500 font-mono text-sm uppercase">
                {t.selectLanguage}
            </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {langs.map((lang) => (
                <button
                    key={lang.id}
                    onClick={() => onLanguageChange(lang.id)}
                    className={`p-4 rounded border transition-all duration-300 font-bold uppercase tracking-wider ${
                        currentLanguage === lang.id
                            ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                            : 'bg-surface text-gray-500 border-gray-800 hover:border-gray-600 hover:text-white'
                    }`}
                >
                    {lang.label}
                </button>
            ))}
        </div>

        <button
            onClick={onConfirm}
            className="w-full py-4 mt-8 bg-white text-black font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform flex items-center justify-center gap-3"
        >
            {t.getStarted}
            <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};