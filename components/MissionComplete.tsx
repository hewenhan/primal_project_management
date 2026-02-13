import React, { useEffect, useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, Project } from '../types';
import { CheckCircle2, Trophy, ArrowLeft } from 'lucide-react';

interface Props {
  project: Project;
  language: Language;
  onClose: () => void;
}

export const MissionComplete: React.FC<Props> = ({ project, language, onClose }) => {
  const t = TRANSLATIONS[language];
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Slight delay for animation entry
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const totalDuration = project.tasks.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black opacity-50 animate-pulse"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMjQwLCAyNTUsIDAuMSkiLz48L3N2Zz4=')] opacity-20"></div>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center text-center p-8 transition-all duration-1000 transform ${showContent ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        
        {/* Animated Rings */}
        <div className="relative mb-8">
            <div className="absolute inset-0 border-4 border-primary rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50"></div>
            <div className="absolute inset-[-20px] border border-secondary rounded-full animate-[spin_10s_linear_infinite] opacity-30"></div>
            <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-full shadow-[0_0_100px_rgba(0,240,255,0.5)]">
                <Trophy className="w-24 h-24 text-black" />
            </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary mb-4 tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
            {t.missionCompleteTitle}
        </h1>

        <p className="text-xl text-primary font-mono mb-12 tracking-widest uppercase border-y border-primary/30 py-2">
            {t.missionCompleteSubtitle}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-8 mb-12 w-full max-w-lg">
            <div className="bg-surface/50 border border-gray-800 p-6 rounded-lg backdrop-blur-sm">
                <div className="text-gray-500 text-xs uppercase font-mono mb-2">{t.totalTime}</div>
                <div className="text-3xl font-bold text-white">{totalDuration} min</div>
            </div>
            <div className="bg-surface/50 border border-gray-800 p-6 rounded-lg backdrop-blur-sm">
                <div className="text-gray-500 text-xs uppercase font-mono mb-2">{t.objectivesCleared}</div>
                <div className="text-3xl font-bold text-white">{project.tasks.length}</div>
            </div>
        </div>

        <button 
            onClick={onClose}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-lg"
        >
            <div className="absolute inset-0 w-3 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full opacity-10 group-hover:opacity-100"></div>
            <div className="absolute inset-0 border border-primary/50 rounded-lg"></div>
            <span className="relative flex items-center gap-3 text-primary group-hover:text-black font-bold uppercase tracking-widest transition-colors">
                <ArrowLeft className="w-5 h-5" />
                {t.returnToBase}
            </span>
        </button>
      </div>

      {/* Confetti/Particles (Simple CSS implementation) */}
      <style>{`
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .particle {
            position: absolute;
            bottom: -20px;
            width: 10px;
            height: 10px;
            background: #00f0ff;
            opacity: 0;
            animation: float 5s linear infinite;
        }
      `}</style>
      {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                background: Math.random() > 0.5 ? '#00f0ff' : '#7000ff'
            }}
          ></div>
      ))}
    </div>
  );
};
