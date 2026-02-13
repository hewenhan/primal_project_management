import React from 'react';
import { PsychologicalProfile, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { X, Brain, ShieldAlert, Zap, BookOpen } from 'lucide-react';

interface Props {
  profile: PsychologicalProfile;
  language: Language;
  onClose: () => void;
}

export const ProfileModal: React.FC<Props> = ({ profile, language, onClose }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto p-4">
      <div className="bg-surface border border-secondary/50 rounded-lg max-w-2xl w-full shadow-[0_0_50px_rgba(112,0,255,0.2)] animate-in slide-in-from-bottom-4 duration-300 relative my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-start bg-black/20">
            <div>
                <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                    <Brain className="text-secondary w-6 h-6" />
                    {profile.archetype}
                </h2>
                <p className="text-secondary font-mono text-sm mt-1 uppercase tracking-wider">{t.profileReport}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white">
                <X className="w-6 h-6" />
            </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Analysis Report */}
            <div className="prose prose-invert prose-sm max-w-none">
                <div className="bg-secondary/5 p-4 rounded border border-secondary/20 text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {profile.analysisReport || t.analysisUnavailable}
                </div>
            </div>

            {/* Core Fear */}
            <div>
                <h3 className="text-xs font-mono text-gray-500 uppercase mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> {t.coreFear}
                </h3>
                <div className="text-white font-medium p-3 bg-black/40 rounded border border-gray-800">
                    {profile.coreFear}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div>
                    <h3 className="text-xs font-mono text-gray-500 uppercase mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-success" /> {t.strengths}
                    </h3>
                    <ul className="space-y-2">
                        {profile.strengths?.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <span className="text-success mt-1">●</span> {s}
                            </li>
                        )) || <li className="text-gray-500 italic">{t.noData}</li>}
                    </ul>
                </div>

                {/* Weaknesses */}
                <div>
                    <h3 className="text-xs font-mono text-gray-500 uppercase mb-2 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-danger" /> {t.weaknesses}
                    </h3>
                    <ul className="space-y-2">
                        {profile.weaknesses?.map((w, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <span className="text-danger mt-1">●</span> {w}
                            </li>
                        )) || <li className="text-gray-500 italic">{t.noData}</li>}
                    </ul>
                </div>
            </div>

             {/* Strategies */}
             <div>
                <h3 className="text-xs font-mono text-gray-500 uppercase mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" /> {t.strategies}
                </h3>
                <div className="space-y-2">
                    {profile.recommendedStrategies?.map((s, i) => (
                        <div key={i} className="p-3 bg-primary/5 border border-primary/20 rounded text-sm text-gray-300">
                            {s}
                        </div>
                    )) || <div className="text-gray-500 italic">{t.noData}</div>}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};