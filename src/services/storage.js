import { SEED_RESUMES, RESUME_TEMPLATES, DEMO_USERS } from '../data/seedData';
import { ROLE_REQUIREMENTS } from '../data/roleRequirements';

const STORAGE_KEYS = {
  USERS: 'resumexray_users',
  SESSION: 'resumexray_session',
  ADMIN_SESSION: 'resumexray_admin_session',
  RESUMES: 'resumexray_resumes',
  ANALYSES: 'resumexray_analyses',
  JOB_MATCHES: 'resumexray_job_matches',
  SKILL_GAPS: 'resumexray_skill_gaps',
  ROADMAPS: 'resumexray_roadmaps',
  TEMPLATES: 'resumexray_templates',
  SETTINGS: 'resumexray_settings',
  INITIALIZED: 'resumexray_initialized'
};

function safeGet(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return defaultValue;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing to localStorage key "${key}":`, err);
  }
}

export const StorageService = {
  // Initialize default demo state if not present
  initialize() {
    const isInit = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!isInit) {
      safeSet(STORAGE_KEYS.USERS, DEMO_USERS);
      safeSet(STORAGE_KEYS.RESUMES, SEED_RESUMES);
      safeSet(STORAGE_KEYS.TEMPLATES, RESUME_TEMPLATES);
      safeSet(STORAGE_KEYS.SETTINGS, {
        theme: 'light',
        emailNotifications: true,
        reducedMotion: false,
        atsStrictness: 'balanced',
        demoModeDisclaimerDismissed: false
      });
      safeSet(STORAGE_KEYS.INITIALIZED, 'true');
    }
  },

  resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    localStorage.removeItem(STORAGE_KEYS.RESUMES);
    localStorage.removeItem(STORAGE_KEYS.ANALYSES);
    localStorage.removeItem(STORAGE_KEYS.JOB_MATCHES);
    localStorage.removeItem(STORAGE_KEYS.SKILL_GAPS);
    localStorage.removeItem(STORAGE_KEYS.ROADMAPS);
    localStorage.removeItem(STORAGE_KEYS.TEMPLATES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
    this.initialize();
  },

  // Auth & Session
  getCurrentUser() {
    return safeGet(STORAGE_KEYS.SESSION, null);
  },

  setCurrentUser(user) {
    safeSet(STORAGE_KEYS.SESSION, user);
  },

  logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  getCurrentAdmin() {
    return safeGet(STORAGE_KEYS.ADMIN_SESSION, null);
  },

  setCurrentAdmin(admin) {
    safeSet(STORAGE_KEYS.ADMIN_SESSION, admin);
  },

  logoutAdmin() {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  },

  // Resumes
  getResumes() {
    return safeGet(STORAGE_KEYS.RESUMES, []);
  },

  getResumeById(id) {
    const list = this.getResumes();
    return list.find(r => r.id === id) || null;
  },

  saveResume(resume) {
    const list = this.getResumes();
    const index = list.findIndex(r => r.id === resume.id);
    if (index >= 0) {
      list[index] = { ...list[index], ...resume, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({
        ...resume,
        id: resume.id || `res-${Date.now()}`,
        uploadedAt: resume.uploadedAt || new Date().toISOString()
      });
    }
    safeSet(STORAGE_KEYS.RESUMES, list);
    return resume;
  },

  deleteResume(id) {
    const list = this.getResumes().filter(r => r.id !== id);
    safeSet(STORAGE_KEYS.RESUMES, list);
  },

  // Analyses
  getAnalyses() {
    return safeGet(STORAGE_KEYS.ANALYSES, []);
  },

  getAnalysisById(id) {
    const list = this.getAnalyses();
    return list.find(a => a.id === id) || null;
  },

  saveAnalysis(analysis) {
    const list = this.getAnalyses();
    const index = list.findIndex(a => a.id === analysis.id);
    if (index >= 0) {
      list[index] = analysis;
    } else {
      list.unshift(analysis);
    }
    safeSet(STORAGE_KEYS.ANALYSES, list);
    return analysis;
  },

  // Templates
  getTemplates() {
    return safeGet(STORAGE_KEYS.TEMPLATES, RESUME_TEMPLATES);
  },

  saveTemplate(tpl) {
    const list = this.getTemplates();
    const index = list.findIndex(t => t.id === tpl.id);
    if (index >= 0) {
      list[index] = tpl;
    } else {
      list.push(tpl);
    }
    safeSet(STORAGE_KEYS.TEMPLATES, list);
  },

  // Settings
  getSettings() {
    return safeGet(STORAGE_KEYS.SETTINGS, {
      theme: 'light',
      emailNotifications: true,
      reducedMotion: false,
      atsStrictness: 'balanced'
    });
  },

  saveSettings(newSettings) {
    const current = this.getSettings();
    safeSet(STORAGE_KEYS.SETTINGS, { ...current, ...newSettings });
  },

  // Roadmaps
  getRoadmaps() {
    return safeGet(STORAGE_KEYS.ROADMAPS, {});
  },

  saveRoadmap(roleId, roadmapData) {
    const maps = this.getRoadmaps();
    maps[roleId] = {
      ...roadmapData,
      updatedAt: new Date().toISOString()
    };
    safeSet(STORAGE_KEYS.ROADMAPS, maps);
  }
};
