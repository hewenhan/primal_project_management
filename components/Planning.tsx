import React, { useState } from 'react';
import { Language, Project, UserData } from '../types';
import { generateMissionPlan } from '../services/geminiService';
import { TRANSLATIONS } from '../constants';
import { Loader2, Zap, Target, RefreshCw } from 'lucide-react';
import { useModal } from './ConfirmModal';

interface Props {
  userData: UserData;
  language: Language;
  onProjectCreated: (p: Project) => void;
  onCancel: () => void;
}

export const Planning: React.FC<Props> = ({ userData, language, onProjectCreated, onCancel }) => {
  const [description, setDescription] = useState('');
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const t = TRANSLATIONS[language];
  const { alert } = useModal();

  const handleGenerate = async () => {
    if (!description || !userData.profile) return;
    setLoading(true);
    try {
      const plan = await generateMissionPlan(description, userData.profile, language);

      const newProject: Project = {
        id: Date.now().toString(),
        name: projectName || description.substring(0, 20),
        description,
        tasks: plan.tasks,
        strategy: plan.strategy,
        planningLogs: [plan.log],
        createdAt: Date.now(),
        status: 'active'
      };
      onProjectCreated(newProject);
    } catch (error) {
      console.error(error);
      await alert(t.connectionFailed || "Failed to contact the neural network.", "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={onCancel} className="text-gray-500 hover:text-white mb-4">&larr; {t.back}</button>
      
      <div className="bg-surface border border-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="text-primary" />
            {t.newProject}
        </h2>
        
        <div className="space-y-4">
            <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">{t.codenameLabel}</label>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder={t.projectPlaceholder}
                    className="w-full bg-black/50 border border-gray-700 rounded p-4 text-white focus:border-primary outline-none"
                />
            </div>

            <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">{t.objectiveIntelLabel}</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t.descPlaceholder}
                    className="w-full bg-black/50 border border-gray-700 rounded p-4 text-white focus:border-primary outline-none h-32"
                />
            </div>
            
            <div className="bg-secondary/10 border border-secondary/30 p-4 rounded text-sm text-secondary-200">
                <p className="flex items-center gap-2 font-bold mb-1">
                    <Zap className="w-4 h-4" />
                    {t.aiAssistantTitle}
                </p>
                {t.aiAssistantDesc.replace('{archetype}', userData.profile?.archetype || 'User')}
            </div>

            <button
                onClick={handleGenerate}
                disabled={loading || !description}
                className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <RefreshCw />}
                {t.generatePlan}
            </button>
        </div>
      </div>
    </div>
  );
};