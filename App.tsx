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
import { LanguageSetup } from './components/LanguageSetup';

const AppContent: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({ 
    profile: null, 
    projects: [], 
    language: 'en',
    hasSelectedLanguage: false,
    tutorial: {
        assessment: false,
        dashboard: false,
        planning: false,
        execution: false
    }
  });
  
  const [state, setState] = useState<AppState>(AppState.DASHBOARD);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [showProfile, setShowProfile] = useState(false);

  // Load data on mount
  useEffect(() => {
    const data = loadData();
    setUserData(data);
    setLanguage(data.language);
    // If no profile, force assessment (but only after language setup if needed)
    if (data.hasSelectedLanguage && !data.profile) {
      setState(AppState.ASSESSMENT);
    }
  }, []);

  // Save data on change
  useEffect(() => {
    // We save even if profile is null, to persist language selection
    saveData(userData);
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
      setUserData(prev => ({
          ...prev,
          projects: prev.projects.filter(p => p.id !== id)
      }));
  };

  const handleImport = (data: UserData) => {
      setUserData(data);
      setLanguage(data.language);
      if(!data.profile) setState(AppState.ASSESSMENT);
      else setState(AppState.DASHBOARD);
  };

  const handleReset = () => {
    clearData();
    const newData = loadData(); 
    // Force reset to unchecked language state so they see onboarding again
    newData.hasSelectedLanguage = false; 
    setUserData(newData);
    setLanguage(newData.language);
    setState(AppState.DASHBOARD); 
  };

  const handleLanguageChange = (lang: Language) => {
      setLanguage(lang);
      setUserData(prev => ({ ...prev, language: lang }));
  };

  const handleInitialLanguageConfirm = () => {
      setUserData(prev => ({ ...prev, hasSelectedLanguage: true }));
      // If no profile, go to assessment
      if (!userData.profile) {
          setState(AppState.ASSESSMENT);
      }
  };

  // Generic tutorial completion handler
  const handleTutorialComplete = (key: keyof typeof userData.tutorial) => {
      setUserData(prev => ({
          ...prev,
          tutorial: {
              ...prev.tutorial,
              [key]: true
          }
      }));
  };

  const t = TRANSLATIONS[language];

  // 1. Language Setup Modal (Top priority)
  if (!userData.hasSelectedLanguage) {
      return (
          <LanguageSetup 
            currentLanguage={language} 
            onLanguageChange={handleLanguageChange}
            onConfirm={handleInitialLanguageConfirm}
          />
      );
  }

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
            {/* Shortcut Hint / Backup Button */}
            <button 
                id="header-backup-btn"
                onClick={() => exportData(userData)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/50 hover:bg-primary/20 rounded text-xs font-bold text-primary transition-colors cursor-pointer" 
                title="Click to Backup (or Ctrl+S)"
            >
                <span className="font-mono">CTRL + S</span>
                <span className="opacity-90 tracking-widest">{t.saveShortcut}</span>
            </button>

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
            <LanguageSelector current={language} onChange={handleLanguageChange} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full relative">
        {state === AppState.ASSESSMENT && (
          <Assessment 
            language={language} 
            onComplete={handleAssessmentComplete} 
            onImport={handleImport} 
            tutorialActive={!userData.tutorial.assessment}
            onTutorialComplete={() => handleTutorialComplete('assessment')}
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
            tutorialActive={!userData.tutorial.dashboard && !!userData.profile} // Only show dashboard tutorial if profile exists
            onTutorialComplete={() => handleTutorialComplete('dashboard')}
          />
        )}

        {state === AppState.PLANNING && (
          <Planning 
            userData={userData} 
            language={language} 
            onProjectCreated={handleCreateProject}
            onCancel={() => setState(AppState.DASHBOARD)}
            tutorialActive={!userData.tutorial.planning}
            onTutorialComplete={() => handleTutorialComplete('planning')}
          />
        )}

        {state === AppState.EXECUTION && activeProject && (
          <Execution 
            project={activeProject}
            userData={userData} 
            language={language}
            onUpdateProject={handleUpdateProject}
            onBack={() => setState(AppState.DASHBOARD)}
            tutorialActive={!userData.tutorial.execution}
            onTutorialComplete={() => handleTutorialComplete('execution')}
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