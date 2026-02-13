import React from 'react';
import { PlanningLog, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { X, History, ChevronRight } from 'lucide-react';

interface Props {
  logs: PlanningLog[];
  language: Language;
  onClose: () => void;
}

export const LogModal: React.FC<Props> = ({ logs, language, onClose }) => {
  const t = TRANSLATIONS[language];
  // Sort logs by newest first
  const sortedLogs = [...logs].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto p-4">
      <div className="bg-surface border border-gray-700 rounded-lg max-w-3xl w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-4 duration-300 relative my-8 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-black/20">
            <div>
                <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                    <History className="text-primary w-5 h-5" />
                    {t.logsTitle}
                </h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white">
                <X className="w-6 h-6" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {sortedLogs.length === 0 ? (
                <p className="text-center text-gray-500 italic">{t.noLogs}</p>
            ) : (
                sortedLogs.map((log) => (
                    <div key={log.id} className="relative pl-8 border-l border-gray-800">
                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
                        <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:gap-3">
                            <span className="text-xs font-mono text-gray-500 uppercase">
                                {new Date(log.timestamp).toLocaleString()}
                            </span>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded w-fit ${log.action === 'initial' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                                {log.action}
                            </span>
                        </div>
                        
                        <div className="bg-black/40 border border-gray-800 rounded p-4">
                            {log.contextInput && (
                                <div className="mb-3 pb-3 border-b border-gray-800">
                                    <h4 className="text-xs font-mono text-gray-500 uppercase mb-1">{t.inputContext}</h4>
                                    <p className="text-sm text-gray-300 italic">"{log.contextInput}"</p>
                                </div>
                            )}
                            <div>
                                <h4 className="text-xs font-mono text-gray-500 uppercase mb-2">{t.aiLogic}</h4>
                                <div className="prose prose-invert prose-sm max-w-none text-gray-400 whitespace-pre-wrap">
                                    {log.aiReasoning}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};