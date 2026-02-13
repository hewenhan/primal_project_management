import { UserData, Project } from '../types';

const STORAGE_KEY = 'primal_focus_data';

export const loadData = (): UserData => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
        return JSON.parse(raw);
    } catch(e) {
        console.error("Failed to parse storage", e);
    }
  }
  return {
    profile: null,
    projects: [],
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