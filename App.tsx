import React, { useState, useEffect } from 'react';
import { AppState, Language, Project, UserData, PsychologicalProfile } from './types';
import { loadData, saveData, exportData, clearData } from './services/storageService';
import { LanguageSelector } from './components/LanguageSelector';
import { ProjectList } from './components/ProjectList';
import { Assessment } from './components/Assessment';
import { Planning } from './components/Planning';
import { Execution } from './components/Execution';
import { TRANSLATIONS, APP_VERSION } from './constants';
import { Brain, Layers, Download } from 'lucide-react';
import { ModalProvider } from './components/ConfirmModal';
import { ProfileModal } from './components/ProfileModal';

const AppContent: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({ profile: null, projects: [] });
  const [state, setState] = useState<AppState>(AppState.DASHBOARD);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [showProfile, setShowProfile] = useState(false);

  // Load data on mount
  useEffect(() => {
    const data = loadData();
    setUserData(data);
    // If no profile, force assessment
    if (!data.profile) {
      setState(AppState.ASSESSMENT);
    }
  }, []);

  // Save data on change
  useEffect(() => {
    if (userData.profile) { // Only save if initialized
        saveData(userData);
    }
  }, [userData]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S or Cmd+S to export/backup
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        exportData(userData);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userData]);

  const handleAssessmentComplete = (profile: PsychologicalProfile) => {
    setUserData(prev => ({ ...prev, profile }));
    setState(AppState.DASHBOARD);
  };

  const handleCreateProject = (project: Project) => {
    setUserData(prev => ({ ...prev, projects: [project, ...prev.projects] }));
    setActiveProject(project);
    setState(AppState.EXECUTION);
  };

  const handleAddProject = (project: Project) => {
    setUserData(prev => ({ ...prev, projects: [project, ...prev.projects] }));
  };

  const handleUpdateProject = (updated: Project) => {
    setUserData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === updated.id ? updated : p)
    }));
    setActiveProject(updated);
  };

  const handleDeleteProject = (id: string) => {
      // Confirmation handled in ProjectList via Modal now, this just updates state
      setUserData(prev => ({
          ...prev,
          projects: prev.projects.filter(p => p.id !== id)
      }));
  };

  const handleImport = (data: UserData) => {
      setUserData(data);
      if(!data.profile) setState(AppState.ASSESSMENT);
      else setState(AppState.DASHBOARD);
  };

  const handleReset = () => {
    clearData();
    setUserData({ profile: null, projects: [] });
    setState(AppState.ASSESSMENT);
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-background text-gray-200 font-sans selection:bg-primary selection:text-black flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-50 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { if(userData.profile) setState(AppState.DASHBOARD) }}
          >
            <Layers className="w-6 h-6 text-primary" />
            <div className="flex flex-col">
                <h1 className="font-bold text-xl tracking-wider font-mono text-white leading-none">
                  {t.appTitle}
                </h1>
                <span className="text-[10px] text-gray-600 font-mono leading-none mt-0.5">{APP_VERSION}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            {/* Shortcut Hint */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded text-xs font-bold text-primary animate-pulse cursor-help" title="Press Ctrl+S (or Cmd+S) anywhere to save">
                <span className="font-mono">CTRL + S</span>
                <span className="opacity-70 tracking-widest">{t.saveShortcut}</span>
            </div>

            {userData.profile && (
              <button 
                onClick={() => setShowProfile(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 transition-colors"
                title={t.viewProfile}
              >
                <Brain className="w-4 h-4 text-secondary" />
                <span className="text-xs text-secondary-200 font-mono">
                  {userData.profile.archetype}
                </span>
              </button>
            )}
            <LanguageSelector current={language} onChange={setLanguage} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {state === AppState.ASSESSMENT && (
          <Assessment 
            language={language} 
            onComplete={handleAssessmentComplete} 
            onImport={handleImport} 
          />
        )}

        {state === AppState.DASHBOARD && (
          <ProjectList 
            projects={userData.projects} 
            userData={userData}
            language={language}
            onSelect={(p) => { setActiveProject(p); setState(AppState.EXECUTION); }}
            onCreate={() => setState(AppState.PLANNING)}
            onImport={handleImport}
            onProjectAdd={handleAddProject}
            onDelete={handleDeleteProject}
            onReset={handleReset}
          />
        )}

        {state === AppState.PLANNING && (
          <Planning 
            userData={userData} 
            language={language} 
            onProjectCreated={handleCreateProject}
            onCancel={() => setState(AppState.DASHBOARD)}
          />
        )}

        {state === AppState.EXECUTION && activeProject && (
          <Execution 
            project={activeProject}
            userData={userData} 
            language={language}
            onUpdateProject={handleUpdateProject}
            onBack={() => setState(AppState.DASHBOARD)}
          />
        )}
      </main>

      {/* Profile Modal */}
      {showProfile && userData.profile && (
          <ProfileModal 
            profile={userData.profile} 
            language={language} 
            onClose={() => setShowProfile(false)} 
          />
      )}
    </div>
  );
};

const App: React.FC = () => {
    return (
        <ModalProvider>
            <AppContent />
        </ModalProvider>
    );
};

export default App;