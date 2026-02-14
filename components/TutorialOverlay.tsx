import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { X, ChevronRight } from 'lucide-react';

export interface TutorialStep {
  targetId: string;
  titleKey: string;
  descKey: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface Props {
  steps: TutorialStep[];
  language: Language;
  onComplete: () => void;
  isActive: boolean;
}

export const TutorialOverlay: React.FC<Props> = ({ steps, language, onComplete, isActive }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const t = TRANSLATIONS[language];

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (!isActive) return;

    // Small delay to allow DOM to settle if entering a new view
    const timer = setTimeout(() => {
        updateTarget();
    }, 300);

    const handleUpdate = () => requestAnimationFrame(updateTarget);

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true); // Capture scroll events

    return () => {
        window.removeEventListener('resize', handleUpdate);
        window.removeEventListener('scroll', handleUpdate, true);
        clearTimeout(timer);
    };
  }, [currentStepIndex, isActive, steps]);

  const updateTarget = () => {
    if (!currentStep) return;
    const el = document.getElementById(currentStep.targetId);
    if (el) {
        setTargetRect(el.getBoundingClientRect());
        // Ensure element is visible
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        console.warn(`Tutorial target #${currentStep.targetId} not found`);
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
    } else {
        onComplete();
    }
  };

  if (!isActive || !targetRect || !currentStep) return null;

  // Layout Constants
  const tooltipWidth = 320;
  const tooltipHeightApprox = 240; // Increased estimate
  const margin = 20;

  const tooltipStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 1002,
      width: `${tooltipWidth}px`,
  };

  // 1. Calculate Horizontal Position (Left)
  let left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
  
  // Clamp Horizontal
  if (left < margin) left = margin;
  if (left + tooltipWidth > window.innerWidth - margin) {
      left = window.innerWidth - tooltipWidth - margin;
  }

  // 2. Calculate Vertical Position (Top)
  const spaceBelow = window.innerHeight - targetRect.bottom;
  const spaceAbove = targetRect.top;
  
  let top: number;

  // Prefer bottom placement if there is space
  if (spaceBelow >= tooltipHeightApprox + margin) {
      top = targetRect.bottom + margin;
  } 
  // Prefer top placement if there is space
  else if (spaceAbove >= tooltipHeightApprox + margin) {
      top = targetRect.top - tooltipHeightApprox - margin;
  }
  // Fallback: Place where there is more space
  else {
      if (spaceBelow > spaceAbove) {
          top = window.innerHeight - tooltipHeightApprox - margin; // Pin to bottom
      } else {
          top = margin + 60; // Pin to top (below header approx)
      }
  }

  // Final Safety Clamps
  if (top < margin + 60) top = margin + 60; // Ensure we don't cover header or go off top
  if (top + tooltipHeightApprox > window.innerHeight) top = window.innerHeight - tooltipHeightApprox - margin;

  tooltipStyle.top = top;
  tooltipStyle.left = left;

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden">
        {/* SVG Mask for spotlight effect */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
                <mask id="spotlight-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <rect 
                        x={targetRect.left - 5} 
                        y={targetRect.top - 5} 
                        width={targetRect.width + 10} 
                        height={targetRect.height + 10} 
                        rx="8" 
                        fill="black" 
                    />
                </mask>
            </defs>
            <rect 
                x="0" 
                y="0" 
                width="100%" 
                height="100%" 
                fill="rgba(0,0,0,0.7)" 
                mask="url(#spotlight-mask)" 
            />
            {/* Highlight Border */}
            <rect 
                x={targetRect.left - 5} 
                y={targetRect.top - 5} 
                width={targetRect.width + 10} 
                height={targetRect.height + 10} 
                rx="8" 
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2"
                className="animate-pulse"
            />
        </svg>

        {/* Tooltip Card */}
        <div style={tooltipStyle} className="bg-surface border border-primary text-left p-6 rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-2">
                <span className="text-primary text-xs font-mono uppercase tracking-widest">
                    {t.step} {currentStepIndex + 1} / {steps.length}
                </span>
                <button onClick={onComplete} className="text-gray-500 hover:text-white">
                    <X className="w-4 h-4" />
                </button>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{t[currentStep.titleKey]}</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {t[currentStep.descKey]}
            </p>

            <div className="flex justify-between items-center">
                <button 
                    onClick={onComplete}
                    className="text-xs text-gray-500 hover:text-white uppercase tracking-wider font-bold"
                >
                    {t.tutSkip}
                </button>
                <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-black text-xs font-bold uppercase tracking-wider hover:bg-white rounded transition-colors"
                >
                    {currentStepIndex === steps.length - 1 ? t.tutFinish : t.tutNext}
                    <ChevronRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    </div>
  );
};