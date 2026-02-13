import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Language, PsychologicalProfile, Task, PlanningLog } from '../types';

const getClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const MODEL_NAME = 'gemini-3-flash-preview';

interface MissionPlan {
    tasks: Task[];
    strategy: string;
    log: PlanningLog;
}

export const analyzeProfile = async (
  answers: Record<string, string>,
  language: Language
): Promise<PsychologicalProfile> => {
  const ai = getClient();
  
  const prompt = `
    Analyze the user's procrastination phenotype based on these 30 behavioral data points: ${JSON.stringify(answers)}.
    
    The data covers:
    1. Initiation Friction (How hard it is to start)
    2. Perfectionism & Anxiety (Fear of failure/judgment)
    3. Distraction Patterns (Specific "weapons of choice")
    4. Autonomy & Rebellion (Psychological reactance)
    5. Physiology (Sleep, energy peaks)
    6. Environmental Triggers

    Act as an Evolutionary Psychologist and Behavioral Scientist.
    
    Generate a deep profile including:
    1. **Archetype**: A vivid, "Primal" archetype name.
    2. **Core Fear**: Deepest evolutionary fear driving this.
    3. **Traits**: 4 specific observations.
    4. **Analysis Report**: A comprehensive 150-word MARKDOWN psychological dossier. Explain *why* they function this way. Use bolding and lists.
    5. **Strengths**: 3 strengths of this archetype (e.g., "High burst energy", "Deep focus when engaged").
    6. **Weaknesses**: 3 vulnerabilities.
    7. **Recommended Strategies**: 3 specific protocols to use.

    Output JSON.
    Language: ${language}.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      archetype: { type: Type.STRING },
      traits: { type: Type.ARRAY, items: { type: Type.STRING } },
      coreFear: { type: Type.STRING },
      analysisReport: { type: Type.STRING },
      strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
      weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
      recommendedStrategies: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ["archetype", "traits", "coreFear", "analysisReport", "strengths", "weaknesses", "recommendedStrategies"],
  };

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const text = response?.text;
  return JSON.parse(text || "{}");
};

export const generateMissionPlan = async (
  taskDescription: string,
  profile: PsychologicalProfile,
  language: Language
): Promise<MissionPlan> => {
  const ai = getClient();

  const prompt = `
    User Profile: ${JSON.stringify(profile)}.
    Goal: "${taskDescription}".
    
    Act as an Evolutionary Psychologist. Break this goal into very small, non-threatening, actionable steps.
    
    STRATEGY:
    - If user is "Perfectionist", make the first step "Draft a terrible version".
    - If user is "Low Energy", make the first step "Open the file and stare at it for 1 minute".
    - If user is "Rebellious", frame tasks as challenges, not chores.
    
    Use Evolutionary Psychology principles: make the first steps require almost zero "caloric cost" to trick the brain into starting.
    Each task should take 5-20 minutes.

    OUTPUT REQUIREMENTS:
    1. **tasks**: Array of tasks.
    2. **strategy**: A short, aggressive psychological framing (under 15 words).
    3. **aiReasoning**: A DETAILED, BULLET-POINT LIST (in Markdown) explaining *exactly* why you chose these steps. 
       Format it like a log entry. Example:
       - "Detected high perfectionism: Added 'Trash Draft' task to lower barrier."
       - "User fatigues easily: limited initial tasks to 5 mins."

    Language: ${language}.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
        tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                durationMinutes: { type: Type.INTEGER },
                completed: { type: Type.BOOLEAN },
              },
              required: ["id", "title", "durationMinutes"],
            },
        },
        strategy: { type: Type.STRING },
        aiReasoning: { type: Type.STRING },
    },
    required: ["tasks", "strategy", "aiReasoning"],
  };

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const text = response?.text;
  const result = JSON.parse(text || "{}");
  
  if (result.tasks) {
      result.tasks = result.tasks.map((t: any) => ({ ...t, completed: false, id: Math.random().toString(36).substr(2, 9) }));
  }

  const log: PlanningLog = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      action: 'initial',
      contextInput: taskDescription,
      aiReasoning: result.aiReasoning
  };

  return { tasks: result.tasks, strategy: result.strategy, log };
};


export const refineMissionPlan = async (
    originalDescription: string,
    supplementText: string,
    retainedTasks: Task[],
    profile: PsychologicalProfile,
    language: Language
  ): Promise<MissionPlan> => {
    const ai = getClient();
  
    const contextList = retainedTasks.map(t => `- [${t.completed ? 'COMPLETED' : 'PENDING'}] ${t.title}`).join('\n');
    
    const prompt = `
      User Profile: ${JSON.stringify(profile)}.
      Original Goal: "${originalDescription}".
      New Intelligence / Supplement: "${supplementText}".
      
      CURRENT PLAN CONTEXT (User selected these to KEEP):
      ${contextList}
      
      OBJECTIVE:
      The user is refining their mission. 
      You must RESPECT the "CURRENT PLAN CONTEXT". These are tasks the user explicitly wants to keep.
      
      YOUR JOB:
      1. Analyze the supplement text.
      2. Generate the *remaining* or *new* tasks needed to finish the goal, given the retained tasks.
      3. Do NOT duplicate the retained tasks in your output array. Only output NEW tasks that should be appended/inserted.
      
      Adjust the strategy based on the new info.
  
      OUTPUT REQUIREMENTS:
      1. **tasks**: Array of NEW/ADDITIONAL tasks only.
      2. **strategy**: A new psychological framing.
      3. **aiReasoning**: A DETAILED log entry explaining your adjustments. Why did you add these specific new tasks? How does it address the supplement?

      Language: ${language}.
    `;
  
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
          tasks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  durationMinutes: { type: Type.INTEGER },
                  completed: { type: Type.BOOLEAN },
                },
                required: ["id", "title", "durationMinutes"],
              },
          },
          strategy: { type: Type.STRING },
          aiReasoning: { type: Type.STRING },
      },
      required: ["tasks", "strategy", "aiReasoning"],
    };
  
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
  
    const text = response?.text;
    const result = JSON.parse(text || "{}");
    
    if (result.tasks) {
        result.tasks = result.tasks.map((t: any) => ({ ...t, completed: false, id: Math.random().toString(36).substr(2, 9) }));
    }

    const log: PlanningLog = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        action: 'refinement',
        contextInput: supplementText,
        aiReasoning: result.aiReasoning
    };

    return { tasks: result.tasks, strategy: result.strategy, log };
  };

export const decomposeTask = async (
  taskTitle: string,
  profile: PsychologicalProfile,
  language: Language
): Promise<{ tasks: Task[], aiReasoning: string }> => {
  const ai = getClient();
  const prompt = `
    User Profile: ${JSON.stringify(profile)}.
    CURRENT STUCK TASK: "${taskTitle}".
    
    SITUATION: The user hit the "Panic Button". They are frozen or overwhelmed by this specific task.
    
    OBJECTIVE:
    Break this SINGLE task down into 3 extremely small, non-threatening "micro-steps" that require almost zero willpower.
    The total duration of these 3 steps should equal roughly the original task's duration (or slightly more).
    
    OUTPUT:
    1. **tasks**: Array of 3 micro-tasks. IMPORTANT: The 'title' of these tasks MUST be in ${language === 'zh' ? 'Chinese' : language === 'ja' ? 'Japanese' : language === 'ko' ? 'Korean' : 'English'}.
    2. **aiReasoning**: Brief explanation of why these steps unblock the user.
    
    Language: ${language}. Ensure the OUTPUT content is in ${language}.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
        tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                durationMinutes: { type: Type.INTEGER },
                completed: { type: Type.BOOLEAN },
              },
              required: ["id", "title", "durationMinutes"],
            },
        },
        aiReasoning: { type: Type.STRING },
    },
    required: ["tasks", "aiReasoning"],
  };

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const text = response?.text;
  const result = JSON.parse(text || "{}");
  
  if (result.tasks) {
      result.tasks = result.tasks.map((t: any) => ({ ...t, completed: false, id: Math.random().toString(36).substr(2, 9) }));
  }

  return { tasks: result.tasks, aiReasoning: result.aiReasoning };
};