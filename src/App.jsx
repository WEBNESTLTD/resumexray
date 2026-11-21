import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AppLayout from './components/layout/AppLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';

// User Auth & Pages
import Login from './user/Login';
import Register from './user/Register';
import Dashboard from './user/Dashboard';
import UploadResume from './user/UploadResume';
import AnalysisResults from './user/AnalysisResults';
import ResumeLibrary from './user/ResumeLibrary';
import ResumeEditor from './user/ResumeEditor';
import JobMatcher from './user/JobMatcher';
import SkillGap from './user/SkillGap';
import CareerRoadmap from './user/CareerRoadmap';
import Templates from './user/Templates';
import Profile from './user/Profile';
import Settings from './user/Settings';
import History from './user/History';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import UsersList from './admin/Users';
import Analytics from './admin/Analytics';
import TemplateManagement from './admin/TemplateManagement';
import AdminSettings from './admin/AdminSettings';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* User Application Routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analyze" element={<UploadResume />} />
            <Route path="/analysis/:id" element={<AnalysisResults />} />
            <Route path="/my-resumes" element={<ResumeLibrary />} />
            <Route path="/resume-editor/:id" element={<ResumeEditor />} />
            <Route path="/job-match" element={<JobMatcher />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route path="/career-roadmap" element={<CareerRoadmap />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/history" element={<History />} />
          </Route>

          {/* Admin Application Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UsersList />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="templates" element={<TemplateManagement />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
