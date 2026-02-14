import React, { useState, useRef, useEffect } from 'react';
import { Project, Language, UserData } from '../types';
import { TRANSLATIONS } from '../constants';
import { Plus, Upload, Download, Trash2, ArrowRight, FileJson, MoreVertical, X, CheckCircle2, FileSearch, RotateCcw } from 'lucide-react';
import { importData, exportData, exportProject, importProject } from '../services/storageService';
import { useModal } from './ConfirmModal';
import { TutorialOverlay, TutorialStep } from './TutorialOverlay';

interface Props {
  projects: Project[];
  userData: UserData;
  language: Language;
  onSelect: (p: Project) => void;
  onCreate: () => void;
  onImport: (data: UserData) => void;
  onProjectAdd: (p: Project) => void;
  onDelete: (id: string) => void;
  onReset?: () => void;
  tutorialActive?: boolean;
  onTutorialComplete?: () => void;
}

export const ProjectList: React.FC<Props> = ({ projects, userData, language, onSelect, onCreate, onImport, onProjectAdd, onDelete, onReset, tutorialActive, onTutorialComplete }) => {
  const t = TRANSLATIONS[language];
  const { confirm, alert } = useModal();
  const globalFileInputRef = useRef<HTMLInputElement>(null);
  const projectFileInputRef = useRef<HTMLInputElement>(null);
  
  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, projectId: string} | null>(null);

  // Close context menu on click outside
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleGlobalImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const data = await importData(e.target.files[0]);
        onImport(data);
        await alert(t.importSuccess || "System Recovered", "Success");
      } catch (err) {
        await alert(t.importError || "Import Failed", "Error");
      }
    }
    // Reset value so same file can be selected again if needed
    if(e.target) e.target.value = '';
  };

  const handleProjectImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const project = await importProject(e.target.files[0]);
        onProjectAdd(project);
        await alert(t.importSuccess || "Mission Loaded", "Success");
      } catch (err) {
        await alert(t.importError || "Invalid Mission File", "Error");
      }
    }
    if(e.target) e.target.value = '';
  };

  const handleContextMenu = (e: React.MouseEvent, projectId: string) => {
      e.preventDefault();
      e.stopPropagation();
      setContextMenu({ x: e.clientX, y: e.clientY, projectId });
  };

  const handleExportProject = (projectId: string) => {
      const p = projects.find(proj => proj.id === projectId);
      if (p) exportProject(p);
      setContextMenu(null);
  };

  const handleDeleteClick = async (id: string) => {
      const confirmed = await confirm(t.deleteConfirm, t.delete);
      if (confirmed) {
          onDelete(id);
      }
  };

  const handleResetClick = async () => {
      if (onReset) {
          const confirmed = await confirm(t.resetWarning || "Reset app?", t.resetApp || "Reset");
          if (confirmed) {
              onReset();
          }
      }
  };

  const tutorialSteps: TutorialStep[] = [
      { targetId: 'mission-control-header', titleKey: 'tutDashboardTitle', descKey: 'tutDashboardDesc' },
      { targetId: 'new-mission-btn', titleKey: 'tutNewProjectTitle', descKey: 'tutNewProjectDesc' }
  ];

  return (
    <div className="space-y-6 min-h-[500px] pb-10">
      
      {/* Tutorial */}
      {tutorialActive && onTutorialComplete && (
          <TutorialOverlay 
            steps={tutorialSteps} 
            language={language} 
            onComplete={onTutorialComplete} 
            isActive={tutorialActive} 
          />
      )}

      <div id="mission-control-header" className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          {t.missionControl || "Mission Control"}
        </h2>
        <div className="flex gap-2 flex-wrap">
            {/* Hidden Inputs */}
            <input 
                type="file" 
                ref={globalFileInputRef} 
                className="hidden" 
                accept=".json" 
                onChange={handleGlobalImport}
            />
            <input 
                type="file" 
                ref={projectFileInputRef} 
                className="hidden" 
                accept=".json" 
                onChange={handleProjectImport}
            />

            {/* Project Import */}
            <button 
                onClick={() => projectFileInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-surface border border-gray-700 hover:border-primary text-gray-300 hover:text-primary rounded transition-colors"
                title={t.importProject}
            >
                <FileJson className="w-4 h-4" />
                <span className="hidden sm:inline">{t.importProject}</span>
            </button>

            {/* Global Actions */}
            <div className="w-px h-8 bg-gray-800 mx-2 hidden sm:block"></div>

            <button 
                onClick={() => globalFileInputRef.current?.click()}
                className="p-2 text-gray-500 hover:text-white border border-transparent hover:border-gray-700 rounded" 
                title={t.import}
            >
                <Upload className="w-5 h-5" />
            </button>
            <button 
                onClick={() => exportData(userData)}
                className="p-2 text-gray-500 hover:text-white border border-transparent hover:border-gray-700 rounded" 
                title={t.export}
            >
                <Download className="w-5 h-5" />
            </button>
            
            {onReset && (
                <button 
                    onClick={handleResetClick}
                    className="p-2 text-danger hover:text-red-400 border border-transparent hover:border-red-900/50 rounded" 
                    title={t.resetApp}
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Create Button */}
        <button
            id="new-mission-btn"
            onClick={onCreate}
            className="w-full h-[240px] border-2 border-dashed border-gray-800 rounded-lg hover:border-primary hover:bg-primary/5 group transition-all flex flex-col items-center justify-center gap-2"
        >
            <Plus className="w-10 h-10 text-gray-600 group-hover:text-primary transition-colors" />
            <span className="text-gray-500 group-hover:text-primary font-mono uppercase tracking-widest">{t.newProject}</span>
        </button>

        {/* Project Cards */}
        {projects.map((p) => {
          const isCompleted = p.status === 'completed';
          return (
            <div 
                key={p.id} 
                onContextMenu={(e) => handleContextMenu(e, p.id)}
                className={`group relative p-6 rounded-lg transition-all flex flex-col h-[240px] ${
                    isCompleted 
                        ? 'bg-success/5 border border-success/30 hover:shadow-[0_0_20px_rgba(0,255,157,0.1)]' 
                        : 'bg-surface border border-gray-800 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]'
                }`}
            >
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xl font-bold truncate w-4/5 ${isCompleted ? 'text-success' : 'text-gray-200 group-hover:text-primary'}`} title={p.name}>
                        {p.name}
                    </h3>
                    <div className="relative flex gap-2">
                        {isCompleted && <CheckCircle2 className="w-5 h-5 text-success" />}
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteClick(p.id); }}
                            className="text-gray-700 hover:text-danger p-1 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                
                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">{p.description}</p>
                
                <div className="space-y-4 mt-auto">
                    <div className="flex justify-between items-center text-xs font-mono text-gray-600 uppercase">
                        <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                        <span className={isCompleted ? 'text-success font-bold' : ''}>
                            {isCompleted ? t.archived : `${p.tasks.filter(t => t.completed).length}/${p.tasks.length} TASKS`}
                        </span>
                    </div>

                    <button 
                        onClick={() => onSelect(p)}
                        className={`w-full flex items-center justify-center gap-2 py-3 font-bold uppercase tracking-wider text-xs rounded transition-all ${
                            isCompleted
                                ? 'bg-transparent border border-success text-success hover:bg-success hover:text-black'
                                : 'bg-gray-900 hover:bg-primary hover:text-black text-gray-400'
                        }`}
                    >
                        {isCompleted ? (
                            <>
                                {t.reviewMission} <FileSearch className="w-3 h-3" />
                            </>
                        ) : (
                            <>
                                {t.continue} <ArrowRight className="w-3 h-3" />
                            </>
                        )}
                    </button>
                </div>
            </div>
          );
        })}
      </div>

      {/* Custom Context Menu */}
      {contextMenu && (
        <div 
            className="fixed z-50 bg-black border border-primary/50 shadow-[0_0_15px_rgba(0,240,255,0.3)] rounded py-1 w-48 animate-in fade-in duration-100"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
            <button 
                onClick={() => handleExportProject(contextMenu.projectId)}
                className="w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-primary hover:text-black font-mono flex items-center gap-2"
            >
                <Download className="w-4 h-4" />
                {t.exportProject}
            </button>
            <button 
                onClick={() => handleDeleteClick(contextMenu.projectId)}
                className="w-full text-left px-4 py-3 text-sm text-danger hover:bg-danger hover:text-white font-mono flex items-center gap-2 border-t border-gray-800"
            >
                <Trash2 className="w-4 h-4" />
                {t.delete}
            </button>
        </div>
      )}

      {projects.length === 0 && (
        <div className="text-center py-10 text-gray-700 italic font-mono">
            {t.noProjects}
        </div>
      )}
    </div>
  );
};