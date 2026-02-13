
export type Language = 'en' | 'zh' | 'ja' | 'ko';

export enum AppState {
  DASHBOARD = 'DASHBOARD',
  ASSESSMENT = 'ASSESSMENT',
  PLANNING = 'PLANNING',
  STRATEGY = 'STRATEGY',
  EXECUTION = 'EXECUTION',
}

export interface Task {
  id: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
}

export interface PsychologicalProfile {
  archetype: string; 
  traits: string[];
  coreFear: string;
  // New comprehensive fields
  analysisReport: string; // Markdown formatted deep analysis
  strengths: string[];
  weaknesses: string[];
  recommendedStrategies: string[];
}

export interface PlanningLog {
  id: string;
  timestamp: number;
  action: 'initial' | 'refinement';
  contextInput?: string; // What the user typed/provided
  aiReasoning: string; // The detailed "why" from the AI
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  strategy: string;
  planningLogs: PlanningLog[]; // Replaces single aiReasoning string
  createdAt: number;
  status: 'planning' | 'active' | 'completed';
}

export interface UserData {
  profile: PsychologicalProfile | null;
  projects: Project[];
}

export interface AssessmentQuestion {
  id: string;
  text: Record<Language, string>;
  options: {
    value: string;
    label: Record<Language, string>;
  }[];
}
