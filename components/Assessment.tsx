import React, { useState, useEffect, useRef } from 'react';
import { Language, PsychologicalProfile, UserData } from '../types';
import { ASSESSMENT_QUESTIONS, TRANSLATIONS } from '../constants';
import { analyzeProfile } from '../services/geminiService';
import { importData } from '../services/storageService';
import { BrainCircuit, ArrowRight, ArrowLeft, Loader2, Check, Upload } from 'lucide-react';
import { useModal } from './ConfirmModal';
import { TutorialOverlay, TutorialStep } from './TutorialOverlay';

interface Props {
  language: Language;
  onComplete: (profile: PsychologicalProfile) => void;
  onImport?: (data: UserData) => void;
  tutorialActive?: boolean;
  onTutorialComplete?: () => void;
}

export const Assessment: React.FC<Props> = ({ language, onComplete, onImport, tutorialActive, onTutorialComplete }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const t = TRANSLATIONS[language];
  const { alert } = useModal();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Safe Derived Data
  const hasQuestions = ASSESSMENT_QUESTIONS && ASSESSMENT_QUESTIONS.length > 0;
  const totalSteps = hasQuestions ? ASSESSMENT_QUESTIONS.length : 0;
  const currentQ = hasQuestions ? ASSESSMENT_QUESTIONS[currentStep] : undefined;
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  // Cleanup timeout
  useEffect(() => {
      return () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const profile = await analyzeProfile(answers, language);
      onComplete(profile);
    } catch (error) {
      console.error(error);
      await alert("Analysis failed. Check API Key.", "Error");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (isTransitioning) return;
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSelect = (val: string) => {
    if (!currentQ || isTransitioning) return;
    
    // Lock interactions
    setIsTransitioning(true);
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Auto advance after slight delay for better UX
    timeoutRef.current = window.setTimeout(() => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
            setIsTransitioning(false); // Unlock after step change
        } else {
            // Last step, just unlock
            setIsTransitioning(false);
        }
    }, 250);
  };

  const handleImportClick = () => {
      fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0] && onImport) {
          try {
              const data = await importData(e.target.files[0]);
              // Validate that imported data actually has a profile if we are skipping assessment
              if (!data.profile) {
                   await alert(t.importError || "Invalid Data: Missing Profile", "Error");
                   return;
              }
              onImport(data);
              await alert(t.importSuccess || "System Recovered", "Success");
          } catch (err) {
              await alert(t.importError || "Import Failed", "Error");
          }
      }
      if (e.target) e.target.value = '';
  };

  // Effect - Unconditional
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading || isTransitioning) return;
      if (currentQ && e.key === 'Enter' && answers[currentQ.id]) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answers, currentStep, loading, currentQ, isTransitioning]);

  // Conditional Rendering Checks (Must be after all hooks)
  if (!hasQuestions) {
      return <div className="p-8 text-center text-red-500">Error: Assessment data not loaded.</div>;
  }
  
  if (!currentQ) {
      // Recovery mechanism or error display
      return (
          <div className="p-8 text-center flex flex-col items-center gap-4">
              <div className="text-red-500">Error: Question not found.</div>
              <button 
                onClick={() => setCurrentStep(0)}
                className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 text-sm"
              >
                  Restart Assessment
              </button>
          </div>
      );
  }

  const tutorialSteps: TutorialStep[] = [
    { targetId: 'assessment-card', titleKey: 'tutAssessmentTitle', descKey: 'tutAssessmentDesc' }
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-[600px] relative">
      
      {/* Tutorial */}
      {tutorialActive && onTutorialComplete && (
          <TutorialOverlay 
            steps={tutorialSteps} 
            language={language} 
            onComplete={onTutorialComplete} 
            isActive={tutorialActive} 
          />
      )}

      <div id="assessment-card" className="flex-1 p-8 bg-surface border border-gray-800 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col relative">
        {/* Import Skip Option */}
        {onImport && (
            <div className="absolute top-4 right-8 z-10">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".json"
                    onChange={handleFileChange}
                />
                <button 
                  onClick={handleImportClick}
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-primary transition-colors uppercase tracking-wider"
                  title={t.importSkip}
                >
                    <Upload className="w-3 h-3" />
                    {t.uploadConfig}
                </button>
            </div>
        )}

        {/* Header & Progress */}
        <div className="mb-8 space-y-4 mt-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                    <h2 className="text-xl font-bold text-white tracking-wider">{t.assessmentTitle}</h2>
                </div>
                <span className="font-mono text-primary text-sm">
                    {currentStep + 1} / {totalSteps}
                </span>
            </div>
            
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div 
                    className="bg-primary h-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,240,255,0.5)]" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>

        {/* Question Card */}
        <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-300" key={currentQ.id}>
            <h3 className="text-2xl md:text-3xl text-white font-medium mb-8 leading-tight">
                {currentQ.text[language]}
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
                {currentQ.options.map((opt) => {
                    const isSelected = answers[currentQ.id] === opt.value;
                    return (
                        <button
                            key={opt.value}
                            onClick={() => handleSelect(opt.value)}
                            disabled={isTransitioning}
                            className={`group relative p-6 rounded-xl border text-left transition-all duration-200 flex items-center justify-between ${
                                isSelected
                                ? 'bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(0,240,255,0.1)]'
                                : 'bg-black/40 border-gray-700 text-gray-400 hover:border-gray-500 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
                            }`}
                        >
                            <span className="text-lg">{opt.label[language]}</span>
                            {isSelected && <Check className="w-6 h-6 text-primary" />}
                            <div className={`absolute inset-0 border-2 border-primary rounded-xl opacity-0 scale-95 transition-all duration-200 pointer-events-none ${isSelected ? 'opacity-100 scale-100' : ''}`}></div>
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-10 flex justify-between items-center pt-6 border-t border-gray-800">
            <button
                onClick={handlePrev}
                disabled={currentStep === 0 || loading || isTransitioning}
                className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                {t.prev}
            </button>

            {currentStep === totalSteps - 1 ? (
                <button
                    onClick={handleSubmit}
                    disabled={loading || !answers[currentQ.id] || isTransitioning}
                    className="flex items-center gap-3 px-8 py-3 bg-primary text-black font-bold uppercase tracking-widest hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t.analyzing}
                        </>
                    ) : (
                        <>
                            {t.submit}
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            ) : (
                <button
                    onClick={handleNext}
                    disabled={!answers[currentQ.id] || isTransitioning}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    {t.next}
                    <ArrowRight className="w-4 h-4" />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};