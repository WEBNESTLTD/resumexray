import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { SEED_RESUMES } from '../data/seedData';
import { analyzeResumeText } from '../services/resumeAnalyzer';
import { SAMPLE_RESUME_TEXT } from '../data/seedData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Initialize storage
  useEffect(() => {
    StorageService.initialize();
  }, []);

  const [currentUser, setCurrentUser] = useState(() => {
    return StorageService.getCurrentUser() || {
      id: 'demo-user-01',
      name: 'Alex Chen',
      email: 'demo@resumexray.demo',
      targetCareer: 'Senior Frontend Engineer',
      role: 'Job Seeker'
    };
  });

  const [currentAdmin, setCurrentAdmin] = useState(() => {
    return StorageService.getCurrentAdmin() || null;
  });

  const [resumes, setResumes] = useState(() => StorageService.getResumes());
  const [analyses, setAnalyses] = useState(() => StorageService.getAnalyses());
  const [settings, setSettings] = useState(() => StorageService.getSettings());
  const [toast, setToast] = useState(null);

  // Show temporary toast message
  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const loginDemoUser = (email = 'demo@resumexray.demo') => {
    const user = {
      id: 'demo-user-01',
      name: email.split('@')[0].replace('.', ' '),
      email,
      targetCareer: 'Senior Frontend Engineer',
      role: 'Job Seeker'
    };
    StorageService.setCurrentUser(user);
    setCurrentUser(user);
    showToast(`Logged in successfully as ${user.email} (Demo Mode)`, 'success');
    return user;
  };

  const logoutUser = () => {
    StorageService.logoutUser();
    setCurrentUser(null);
    showToast('Logged out of demo session.', 'info');
  };

  const loginDemoAdmin = (email = 'admin@resumexray.demo') => {
    const admin = {
      id: 'admin-01',
      name: 'System Administrator',
      email,
      role: 'Superadmin'
    };
    StorageService.setCurrentAdmin(admin);
    setCurrentAdmin(admin);
    showToast('Welcome to the Admin Intelligence Portal', 'success');
    return admin;
  };

  const logoutAdmin = () => {
    StorageService.logoutAdmin();
    setCurrentAdmin(null);
    showToast('Admin session ended.', 'info');
  };

  const saveNewResumeAndAnalysis = (fileData, targetRoleKey, customJobDesc = '') => {
    // Determine effective role: prioritize fileData.detectedRole if targetRole was default
    let roleToUse = targetRoleKey;
    if (fileData.detectedRole && (!targetRoleKey || targetRoleKey === 'frontend-developer')) {
      roleToUse = fileData.detectedRole;
    }

    // 1. Analyze text
    const analysisResult = analyzeResumeText(fileData.rawText, roleToUse, customJobDesc);

    // 2. Prepare resume object
    const newResume = {
      id: `res-${Date.now()}`,
      fileName: fileData.fileName,
      fileSize: fileData.fileSize,
      fileType: fileData.fileType,
      uploadedAt: new Date().toISOString(),
      targetRole: analysisResult.targetRoleKey || roleToUse,
      targetRoleTitle: analysisResult.targetRoleTitle,
      scores: analysisResult.scores,
      sectionsDetected: analysisResult.sections.detected,
      skillsFound: analysisResult.skills.allFound,
      skillsMissing: analysisResult.keywords.missingRoleSkills,
      summary: fileData.rawText.slice(0, 240) + '...',
      rawText: fileData.rawText,
      analysisId: analysisResult.id
    };

    // Attach resume ID to analysis
    analysisResult.resumeId = newResume.id;
    analysisResult.fileName = newResume.fileName;

    // 3. Persist
    StorageService.saveResume(newResume);
    StorageService.saveAnalysis(analysisResult);

    setResumes(StorageService.getResumes());
    setAnalyses(StorageService.getAnalyses());

    showToast('Resume analyzed successfully with 100% in-browser rules engine!', 'success');
    return { resume: newResume, analysis: analysisResult };
  };

  const deleteResume = (id) => {
    StorageService.deleteResume(id);
    setResumes(StorageService.getResumes());
    showToast('Resume removed from your library.', 'info');
  };

  const resetAllDemoData = () => {
    StorageService.resetAllData();
    setResumes(StorageService.getResumes());
    setAnalyses(StorageService.getAnalyses());
    setSettings(StorageService.getSettings());
    setCurrentUser(StorageService.getCurrentUser());
    showToast('Application state reset to factory demonstration defaults.', 'success');
  };

  const updateSettings = (newSettings) => {
    StorageService.saveSettings(newSettings);
    setSettings(StorageService.getSettings());
    showToast('Settings saved.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentAdmin,
        loginDemoUser,
        logoutUser,
        loginDemoAdmin,
        logoutAdmin,
        resumes,
        analyses,
        settings,
        toast,
        showToast,
        saveNewResumeAndAnalysis,
        deleteResume,
        resetAllDemoData,
        updateSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
