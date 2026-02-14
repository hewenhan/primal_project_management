import React, { useState, useEffect, useRef } from 'react';
import { Project, Language, Task, UserData } from '../types';
import { TRANSLATIONS } from '../constants';
import { refineMissionPlan, decomposeTask } from '../services/geminiService';
import { CheckCircle2, Circle, Clock, ArrowLeft, Play, Pause, Trophy, Settings2, RefreshCw, Loader2, X, Brain, CheckSquare, Square, Medal, Lock, Unlock, Zap, Volume2, VolumeX, AlertTriangle } from 'lucide-react';
import { useModal } from './ConfirmModal';
import { LogModal } from './LogModal';
import { MissionComplete } from './MissionComplete';
import { TutorialOverlay, TutorialStep } from './TutorialOverlay';

interface Props {
  project: Project;
  userData: UserData;
  language: Language;
  onUpdateProject: (p: Project) => void;
  onBack: () => void;
  tutorialActive?: boolean;
  onTutorialComplete?: () => void;
}

// Simple internal hook for audio to avoid creating new file
const useAudioEngine = () => {
    const contextRef = useRef<AudioContext | null>(null);
    const whiteNoiseRef = useRef<AudioBufferSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [soundType, setSoundType] = useState<'none' | 'white' | 'pink' | 'binaural'>('none');

    useEffect(() => {
        return () => {
            if (contextRef.current) contextRef.current.close();
        };
    }, []);

    const initContext = () => {
        if (!contextRef.current) {
            contextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            const gain = contextRef.current.createGain();
            gain.connect(contextRef.current.destination);
            gainNodeRef.current = gain;
        }
        if (contextRef.current.state === 'suspended') {
            contextRef.current.resume();
        }
    };

    const playBeep = () => {
        initContext();
        if (!contextRef.current || !gainNodeRef.current) return;
        
        const osc = contextRef.current.createOscillator();
        const gain = contextRef.current.createGain();
        osc.connect(gain);
        gain.connect(contextRef.current.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, contextRef.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, contextRef.current.currentTime + 0.5);
        
        gain.gain.setValueAtTime(0.5, contextRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, contextRef.current.currentTime + 0.5);
        
        osc.start();
        osc.stop(contextRef.current.currentTime + 0.5);
    };

    const createNoiseBuffer = (ctx: AudioContext, type: 'white' | 'pink') => {
        const bufferSize = ctx.sampleRate * 2; // 2 seconds buffer
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        if (type === 'white') {
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
        } else {
             // Pink noise approximation
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                data[i] *= 0.11; // (roughly) compensate for gain
                b6 = white * 0.115926;
            }
        }
        return buffer;
    };

    const stopBackground = () => {
        if (whiteNoiseRef.current) {
            try { whiteNoiseRef.current.stop(); } catch(e){}
            whiteNoiseRef.current = null;
        }
        setIsPlaying(false);
        setSoundType('none'); // FIX: Explicitly set state to none
    };

    const playBackground = (type: 'white' | 'pink' | 'binaural') => {
        stopBackground();
        initContext();
        if (!contextRef.current || !gainNodeRef.current) return;
        
        setSoundType(type);
        setIsPlaying(true);
        gainNodeRef.current.gain.value = 0.1; // Low volume background

        if (type === 'white' || type === 'pink') {
            const buffer = createNoiseBuffer(contextRef.current, type);
            const source = contextRef.current.createBufferSource();
            source.buffer = buffer;
            source.loop = true;
            source.connect(gainNodeRef.current);
            source.start();
            whiteNoiseRef.current = source;
        } else if (type === 'binaural') {
            // 40Hz Gamma (Focus) - 200Hz Left, 240Hz Right
            const oscL = contextRef.current.createOscillator();
            const oscR = contextRef.current.createOscillator();
            const merger = contextRef.current.createChannelMerger(2);
            
            oscL.frequency.value = 200;
            oscR.frequency.value = 240;
            
            oscL.connect(merger, 0, 0);
            oscR.connect(merger, 0, 1);
            merger.connect(gainNodeRef.current);
            
            oscL.start();
            oscR.start();
            
            // Hacky way to store multiple sources in the ref for cleanup
            whiteNoiseRef.current = { stop: () => { oscL.stop(); oscR.stop(); } } as any;
        }
    };

    return { playBeep, playBackground, stopBackground, soundType, isPlaying };
};

export const Execution: React.FC<Props> = ({ project, userData, language, onUpdateProject, onBack, tutorialActive, onTutorialComplete }) => {
  const t = TRANSLATIONS[language];
  const { confirm, alert } = useModal();
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Audio
  const { playBeep, playBackground, stopBackground, soundType } = useAudioEngine();
  const [showSoundMenu, setShowSoundMenu] = useState(false);

  // Refinement State
  const [isRefining, setIsRefining] = useState(false);
  const [supplementText, setSupplementText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());

  // Panic State
  const [panicLoading, setPanicLoading] = useState(false);

  // Log View State
  const [showLogs, setShowLogs] = useState(false);
  
  // Celebration State
  const [showCelebration, setShowCelebration] = useState(false);

  // Derived state
  const isArchived = project.status === 'completed';

  useEffect(() => {
    let interval: number;
    if (isRunning && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      setIsRunning(false);
      playBeep(); // Play sound on completion
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  // Initialize selected tasks when entering refinement mode (Completed Only by Default)
  useEffect(() => {
      if (isRefining) {
          const completedIds = new Set(project.tasks.filter(t => t.completed).map(t => t.id));
          setSelectedTaskIds(completedIds);
      }
  }, [isRefining, project.tasks]);

  const startTask = (task: Task) => {
    if (isArchived) return;
    setActiveTaskId(task.id);
    setTimer(task.durationMinutes * 60);
    setIsRunning(true);
  };

  const handleSoundSelect = (type: 'none' | 'white' | 'pink' | 'binaural') => {
      if (type === 'none') {
          stopBackground();
      } else {
          playBackground(type);
      }
      setShowSoundMenu(false);
  };

  const getActiveSoundLabel = () => {
      switch(soundType) {
          case 'white': return t.soundWhite;
          case 'pink': return t.soundPink;
          case 'binaural': return t.soundBinaural;
          default: return t.soundOff;
      }
  };

  const handlePanic = async () => {
    if (!activeTaskId || !userData.profile) return;
    const task = project.tasks.find(t => t.id === activeTaskId);
    if (!task) return;

    setPanicLoading(true);
    try {
        const result = await decomposeTask(task.title, userData.profile, language);
        
        // Construct new task list: replace active task with new sub-tasks
        const activeIndex = project.tasks.findIndex(t => t.id === activeTaskId);
        if (activeIndex === -1) return;

        const newTasks = [...project.tasks];
        newTasks.splice(activeIndex, 1, ...result.tasks);

        const currentLogs = project.planningLogs || [];
        const panicLog = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            action: 'refinement' as const,
            contextInput: `PANIC BUTTON: Stuck on "${task.title}"`,
            aiReasoning: `BREAKDOWN: ${result.aiReasoning}`
        };

        const updated: Project = {
            ...project,
            tasks: newTasks,
            planningLogs: [...currentLogs, panicLog]
        };

        onUpdateProject(updated);
        
        // Reset execution state to the first new task
        setActiveTaskId(result.tasks[0].id);
        setTimer(result.tasks[0].durationMinutes * 60);
        setIsRunning(true); // Auto-start to keep momentum

        await alert(t.panicSuccess, t.panicResolved);

    } catch (error) {
        console.error(error);
        await alert(t.aiOffline, "Error");
    } finally {
        setPanicLoading(false);
    }
  };

  const handleMissionCompletion = async (updatedProject: Project) => {
    // If all tasks completed
    if (updatedProject.tasks.every(t => t.completed)) {
        const confirmed = await confirm(t.missionCompleteConfirm, t.complete);
        if (confirmed) {
            const finalProject = { ...updatedProject, status: 'completed' as const };
            onUpdateProject(finalProject);
            setShowCelebration(true);
        } else {
             // User cancelled completion but kept task checked.
             onUpdateProject(updatedProject);
        }
    } else {
        // If unchecking a task or normal progress, just update
        if (updatedProject.status === 'completed') {
             updatedProject.status = 'active';
        }
        onUpdateProject(updatedProject);
    }
  };

  const toggleTaskComplete = async (taskId: string) => {
    if (isArchived) return; // Locked

    const updatedTasks = project.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    // Don't set status here, handleMissionCompletion decides
    const updatedProject = { ...project, tasks: updatedTasks };
    
    // Stop timer if active task finished
    if (activeTaskId === taskId) {
        setIsRunning(false);
        setActiveTaskId(null);
    }

    await handleMissionCompletion(updatedProject);
  };

  // Manual Trigger for completion (e.g. if they cancelled before)
  const manualCompleteTrigger = async () => {
       const confirmed = await confirm(t.missionCompleteConfirm, t.complete);
       if (confirmed) {
           const finalProject = { ...project, status: 'completed' as const };
           onUpdateProject(finalProject);
           setShowCelebration(true);
       }
  };

  const handleReactivate = async () => {
      const confirmed = await confirm(t.reactivateConfirm, t.reactivate);
      if (confirmed) {
          const updated = { ...project, status: 'active' as const };
          onUpdateProject(updated);
      }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Refinement Logic
  const toggleRefinementSelection = (taskId: string) => {
      const newSet = new Set(selectedTaskIds);
      if (newSet.has(taskId)) {
          newSet.delete(taskId);
      } else {
          newSet.add(taskId);
      }
      setSelectedTaskIds(newSet);
  };

  const handleRefineExecute = async () => {
    if (!supplementText || !userData.profile) return;
    
    const confirmed = await confirm(t.regenerateConfirm, t.execute);
    if (!confirmed) return;

    setLoading(true);
    try {
        // Filter the actual task objects based on selection
        const retainedTasks = project.tasks.filter(t => selectedTaskIds.has(t.id));

        const plan = await refineMissionPlan(
            project.description,
            supplementText,
            retainedTasks,
            userData.profile,
            language
        );
        
        // Merge retained tasks with new tasks
        const mergedTasks = [...retainedTasks, ...plan.tasks];

        // Ensure logs array exists
        const currentLogs = project.planningLogs || [];

        const updated: Project = {
            ...project,
            strategy: plan.strategy,
            planningLogs: [...currentLogs, plan.log], // Append new log
            tasks: mergedTasks,
            status: 'active'
        };

        onUpdateProject(updated);
        setIsRefining(false);
        setSupplementText('');
        setActiveTaskId(null);
        setIsRunning(false);
        await alert(t.refining, t.systemUpdated);
    } catch (error) {
        console.error(error);
        await alert(t.regenFailed, "Error");
    } finally {
        setLoading(false);
    }
  };

  const progress = (project.tasks.filter(t => t.completed).length / project.tasks.length) * 100;
  const allTasksDone = project.tasks.length > 0 && project.tasks.every(t => t.completed);

  const tutorialSteps: TutorialStep[] = [
      { targetId: 'execution-zone', titleKey: 'tutExecutionTitle', descKey: 'tutExecutionDesc' },
      { targetId: 'panic-btn', titleKey: 'tutPanicTitle', descKey: 'tutPanicDesc' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[calc(100vh-100px)] pb-10">
      
      {/* Tutorial */}
      {tutorialActive && onTutorialComplete && (
          <TutorialOverlay 
            steps={tutorialSteps} 
            language={language} 
            onComplete={onTutorialComplete} 
            isActive={tutorialActive} 
          />
      )}

      {/* Left Column: Task List or Editor */}
      <div id="execution-zone" className={`lg:col-span-2 bg-surface border ${isArchived ? 'border-success/30' : 'border-gray-800'} rounded-lg p-6 flex flex-col relative transition-colors duration-500 overflow-visible lg:overflow-hidden min-h-[400px]`}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
            <button onClick={onBack} className="text-gray-500 hover:text-white flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> {t.back}
            </button>
            <div className="flex items-center gap-4">
                 {/* Sound Menu */}
                <div className="relative">
                    <button 
                        onClick={() => setShowSoundMenu(!showSoundMenu)}
                        className={`text-xs font-mono flex items-center gap-1 transition-colors uppercase ${soundType !== 'none' ? 'text-primary animate-pulse' : 'text-gray-500 hover:text-white'}`}
                        title={t.ambienceLabel}
                    >
                        {soundType !== 'none' ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        <span className="hidden sm:inline">{getActiveSoundLabel()}</span>
                    </button>
                    {showSoundMenu && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-black border border-gray-700 rounded shadow-xl z-50 py-1">
                            <button onClick={() => handleSoundSelect('none')} className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white">{t.soundOff}</button>
                            <button onClick={() => handleSoundSelect('white')} className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white">{t.soundWhite}</button>
                            <button onClick={() => handleSoundSelect('pink')} className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white">{t.soundPink}</button>
                            <button onClick={() => handleSoundSelect('binaural')} className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white">{t.soundBinaural}</button>
                        </div>
                    )}
                </div>

                {!isRefining && (
                    <>
                    <button 
                        onClick={() => setShowLogs(true)}
                        className="text-xs font-mono text-gray-500 flex items-center gap-1 hover:text-white transition-colors uppercase"
                    >
                        <Brain className="w-3 h-3" />
                        {t.viewLogs}
                    </button>
                    {!isArchived && (
                        <button 
                            onClick={() => setIsRefining(true)}
                            className="text-xs font-mono text-primary flex items-center gap-1 hover:text-white transition-colors uppercase"
                        >
                            <Settings2 className="w-3 h-3" />
                            {t.editMission}
                        </button>
                    )}
                    </>
                )}
            </div>
        </div>

        {/* Refinement Mode */}
        {isRefining ? (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-top-4 duration-300 lg:overflow-hidden">
                <div className="flex justify-between items-center mb-4 shrink-0">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Settings2 className="w-5 h-5 text-primary" />
                        {t.missionIntel}
                    </h3>
                    <button onClick={() => setIsRefining(false)} className="text-gray-500 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                    <div className="space-y-2 mb-4 shrink-0">
                        <label className="text-xs font-mono text-gray-500 uppercase">{t.supplementLabel}</label>
                        <textarea 
                            value={supplementText}
                            onChange={(e) => setSupplementText(e.target.value)}
                            placeholder="e.g. 'I finished the research but am stuck on the intro. I'm feeling overwhelmed.'"
                            className="w-full bg-black/50 border border-primary/30 rounded p-4 text-white focus:border-primary outline-none resize-none h-24"
                        />
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 bg-black/20 border border-gray-800 rounded p-4">
                        <div className="mb-2 shrink-0">
                            <h4 className="text-xs font-mono text-primary uppercase font-bold">{t.keepCompleted}</h4>
                            <p className="text-[10px] text-gray-500">{t.keepCompletedDesc}</p>
                        </div>
                        
                        <div className="overflow-y-auto space-y-2 pr-2 flex-1 max-h-[300px] lg:max-h-none">
                            {project.tasks.map(task => (
                                <div 
                                    key={task.id}
                                    onClick={() => toggleRefinementSelection(task.id)}
                                    className={`flex items-center p-3 rounded border cursor-pointer transition-all ${
                                        selectedTaskIds.has(task.id) 
                                            ? 'bg-primary/5 border-primary/50' 
                                            : 'bg-black/40 border-gray-800 opacity-50'
                                    }`}
                                >
                                    <div className={`mr-3 ${selectedTaskIds.has(task.id) ? 'text-primary' : 'text-gray-600'}`}>
                                        {selectedTaskIds.has(task.id) ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>{task.title}</p>
                                    </div>
                                    {task.completed && <span className="text-[10px] bg-green-900/30 text-green-500 px-2 py-0.5 rounded ml-2">DONE</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex gap-3 justify-end shrink-0">
                    <button 
                        onClick={() => setIsRefining(false)}
                        className="px-4 py-2 text-gray-400 hover:text-white text-sm"
                    >
                        {t.cancel}
                    </button>
                    <button 
                        onClick={handleRefineExecute}
                        disabled={loading || !supplementText}
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-black font-bold uppercase hover:bg-cyan-400 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                        {t.execute}
                    </button>
                </div>
            </div>
        ) : (
            // View Mode
            <>
                <div className="text-right mb-6">
                    <h2 className={`text-xl font-bold truncate ${isArchived ? 'text-success' : 'text-white'}`}>{project.name}</h2>
                    <div className="h-1 w-full bg-gray-800 mt-2 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-500 ${isArchived ? 'bg-success' : 'bg-primary'}`} 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Strategy Banner */}
                <div className="space-y-4 mb-4 bg-secondary/5 border border-secondary/20 p-4 rounded text-gray-300 italic text-sm font-serif">
                    <span className="text-secondary font-bold not-italic font-mono uppercase text-xs block mb-1">{t.overrideLabel}:</span>
                    "{project.strategy}"
                </div>

                {/* Locked Message */}
                {isArchived && (
                     <div className="mb-4 p-3 bg-black/40 border border-success/20 rounded flex items-center justify-center gap-2 text-success/70 text-sm font-mono uppercase">
                        <Lock className="w-4 h-4" />
                        {t.missionLocked}
                     </div>
                )}

                <div className={`flex-1 lg:overflow-y-auto space-y-2 pr-2 ${isArchived ? 'opacity-50 pointer-events-none' : ''}`}>
                    {project.tasks.map((task) => (
                        <div 
                            key={task.id} 
                            className={`flex items-center p-4 rounded border transition-all ${
                                task.completed 
                                    ? 'bg-black/40 border-gray-800 opacity-50' 
                                    : activeTaskId === task.id
                                        ? 'bg-primary/10 border-primary shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                                        : 'bg-surface border-gray-700 hover:border-gray-500'
                            }`}
                        >
                            <button 
                                onClick={() => toggleTaskComplete(task.id)}
                                disabled={isArchived}
                                className="mr-4 text-gray-500 hover:text-primary transition-colors disabled:cursor-not-allowed"
                            >
                                {task.completed ? <CheckCircle2 className="w-6 h-6 text-success" /> : <Circle className="w-6 h-6" />}
                            </button>
                            
                            <div className="flex-1">
                                <h4 className={`font-medium ${task.completed ? 'line-through text-gray-600' : 'text-gray-200'}`}>
                                    {task.title}
                                </h4>
                                <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {task.durationMinutes} min
                                </span>
                            </div>

                            {!task.completed && (
                                <button 
                                    onClick={() => startTask(task)}
                                    disabled={activeTaskId === task.id || isArchived}
                                    className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                                        activeTaskId === task.id
                                            ? 'text-primary'
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                                    }`}
                                >
                                    {activeTaskId === task.id ? t.activeStatus : t.startStatus}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </>
        )}
      </div>

      {/* Right Column: Active Focus Mode OR Completion State */}
      <div className={`bg-surface border ${isArchived ? 'border-success/30' : 'border-gray-800'} rounded-lg p-6 flex flex-col justify-center items-center relative overflow-hidden transition-colors duration-500 min-h-[400px]`}>
        
        {isArchived ? (
            // Archived / Completed State
             <div className="text-center space-y-6 z-10 animate-in fade-in zoom-in duration-500">
                <Medal className="w-24 h-24 text-success mx-auto drop-shadow-[0_0_15px_rgba(0,255,157,0.5)]" />
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t.archived}</h3>
                    <p className="text-gray-400 text-sm max-w-[250px] mx-auto uppercase tracking-wider">{t.missionCompleteSubtitle}</p>
                </div>
                <button
                    onClick={handleReactivate}
                    className="flex items-center gap-2 px-8 py-4 bg-gray-900 border border-success/30 text-success hover:bg-success hover:text-black font-bold uppercase tracking-widest transition-all rounded"
                >
                    <Unlock className="w-4 h-4" />
                    {t.reactivate}
                </button>
             </div>
        ) : !isRefining && allTasksDone ? (
             // All Tasks Done but NOT Archived State
             <div className="text-center space-y-6 z-10 animate-in fade-in zoom-in duration-500">
                <Medal className="w-24 h-24 text-primary mx-auto animate-bounce" />
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t.missionCompleteTitle}</h3>
                    <p className="text-gray-400 text-sm max-w-[250px] mx-auto">{t.missionCompleteSubtitle}</p>
                </div>
                <button
                    onClick={manualCompleteTrigger}
                    className="px-8 py-4 bg-primary text-black font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                    {t.finalizeMission}
                </button>
             </div>
        ) : activeTaskId ? (
            // Active Timer State
            <>
                <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse"></div>
                <div className="text-center space-y-6 z-10">
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-mono rounded uppercase tracking-[0.2em] animate-pulse">
                        {t.focusMode}
                    </span>
                    <div className="font-mono text-6xl md:text-7xl font-bold text-white tracking-tighter">
                        {formatTime(timer)}
                    </div>
                    <div className="text-gray-400 max-w-[200px] mx-auto text-center">
                        {project.tasks.find(t => t.id === activeTaskId)?.title}
                    </div>
                    
                    <div className="flex gap-4 justify-center items-center">
                        <button 
                            onClick={() => setIsRunning(!isRunning)}
                            className="p-4 rounded-full bg-gray-800 border border-gray-700 hover:border-primary text-white hover:bg-gray-700 transition-all"
                        >
                            {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                        </button>
                        
                        {/* Panic Button */}
                        <button 
                            id="panic-btn"
                            onClick={handlePanic}
                            disabled={panicLoading}
                            className="p-4 rounded-full bg-danger/10 border border-danger/50 text-danger hover:bg-danger hover:text-white transition-all group relative"
                            title={t.panicButton}
                        >
                           {panicLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Zap className="w-8 h-8" />}
                           <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-danger text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                               {t.panicButton}
                           </span>
                        </button>
                    </div>
                </div>
            </>
        ) : (
            // Idle State
            <div className="text-center text-gray-600 space-y-4">
                <Trophy className="w-16 h-16 mx-auto opacity-20" />
                <p>{t.allSystemsGo}</p>
                <p className="text-xs max-w-[200px] mx-auto">{t.selectTaskHelp}</p>
            </div>
        )}
         {/* Background decorative elements */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
      </div>

      {/* Modals */}
      {showLogs && project.planningLogs && (
          <LogModal 
            logs={project.planningLogs} 
            language={language} 
            onClose={() => setShowLogs(false)} 
          />
      )}
      
      {showCelebration && (
          <MissionComplete 
            project={project}
            language={language}
            onClose={() => {
                setShowCelebration(false);
                onBack(); // Navigate back to dashboard on close
            }}
          />
      )}
    </div>
  );
};