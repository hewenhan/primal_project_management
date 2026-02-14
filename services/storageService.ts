import { UserData, Project, Language } from '../types';

const STORAGE_KEY = 'primal_focus_data';

const getSystemLanguage = (): Language => {
    if (typeof navigator === 'undefined') return 'en';
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith('zh')) return 'zh';
    if (lang.startsWith('ja')) return 'ja';
    if (lang.startsWith('ko')) return 'ko';
    return 'en';
};

export const loadData = (): UserData => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const systemLang = getSystemLanguage();
  
  if (raw) {
    try {
        const parsed = JSON.parse(raw);
        // Migration logic for existing users
        return {
            ...parsed,
            language: parsed.language || systemLang,
            // If they have existing data, assume they selected language implicitly to avoid nagging old users too much, 
            // OR enforce it. Let's enforce it only if strictly new fields missing.
            hasSelectedLanguage: parsed.hasSelectedLanguage ?? (parsed.profile !== null), 
            tutorial: parsed.tutorial || {
                assessment: false,
                dashboard: false,
                planning: false,
                execution: false,
            }
        };
    } catch(e) {
        console.error("Failed to parse storage", e);
    }
  }
  
  // New User Defaults
  return {
    profile: null,
    projects: [],
    language: systemLang,
    hasSelectedLanguage: false,
    tutorial: {
        assessment: false,
        dashboard: false,
        planning: false,
        execution: false,
    }
  };
};

export const saveData = (data: UserData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const clearData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const exportData = (data: UserData) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `primal-focus-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importData = async (file: File): Promise<UserData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        // Basic validation
        if (json.projects && Array.isArray(json.projects)) {
            // Apply defaults if missing
            if (!json.language) json.language = getSystemLanguage();
            if (json.hasSelectedLanguage === undefined) json.hasSelectedLanguage = true; // Imported data assumes setup done
            if (!json.tutorial) json.tutorial = { assessment: true, dashboard: true, planning: true, execution: true }; // Skip tutorials for imports
            resolve(json);
        } else {
            reject(new Error("Invalid JSON format"));
        }
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsText(file);
  });
};

export const exportProject = (project: Project) => {
    const jsonString = JSON.stringify(project, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    // Sanitize filename
    const filename = project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.href = url;
    link.download = `mission-${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const importProject = async (file: File): Promise<Project> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          
          // Project Validation Logic
          const isValidProject = 
            typeof json.id === 'string' &&
            typeof json.name === 'string' &&
            typeof json.description === 'string' &&
            Array.isArray(json.tasks) &&
            typeof json.strategy === 'string';
  
          if (isValidProject) {
              // Ensure ID is unique to avoid collision upon import by regenerating it if needed, 
              // but mostly we trust the user. Better to regenerate ID to be safe.
              const cleanProject: Project = {
                  ...json,
                  id: Date.now().toString() + Math.random().toString(36).substr(2, 5), // New ID
                  importedAt: Date.now()
              };
              resolve(cleanProject);
          } else {
              reject(new Error("Invalid Mission File"));
          }
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsText(file);
    });
  };
