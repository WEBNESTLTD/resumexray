import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  FileText,
  FileEdit,
  GitCompare,
  TrendingUp,
  Compass,
  Palette,
  History,
  User,
  Settings,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const { currentUser, resumes } = useApp();

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/analyze', label: 'Analyze Resume', icon: UploadCloud, badge: 'New' },
    { to: '/my-resumes', label: 'Resume Library', icon: FileText, count: resumes?.length || 0 },
    { to: '/resume-editor/default', label: 'Resume Editor', icon: FileEdit },
    { to: '/job-match', label: 'Job Description Matcher', icon: GitCompare },
    { to: '/skill-gap', label: 'Skill Gap Analyzer', icon: TrendingUp },
    { to: '/career-roadmap', label: 'Career Roadmap', icon: Compass },
    { to: '/templates', label: 'Resume Templates', icon: Palette },
    { to: '/history', label: 'Analysis History', icon: History },
  ];

  const secondaryLinks = [
    { to: '/profile', label: 'User Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full select-none">
      {/* Top Brand */}
      <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-accent flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-heading font-extrabold text-lg text-navy-900">
            Resume<span className="text-violet-600">Xray</span>
          </span>
        </Link>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">App</span>
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-txt-secondary">
          Platform Workspace
        </div>
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-violet-50 text-violet-700 font-semibold shadow-sm'
                    : 'text-txt-primary hover:bg-slate-50 hover:text-violet-600'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-violet-600 text-white">
                  {item.badge}
                </span>
              )}
              {item.count !== undefined && item.count > 0 && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  {item.count}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="pt-6 px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-txt-secondary">
          Preferences
        </div>
        {secondaryLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-violet-50 text-violet-700 font-semibold shadow-sm'
                    : 'text-txt-primary hover:bg-slate-50 hover:text-violet-600'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Admin Quick Switch & User Info */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        <Link
          to="/admin/dashboard"
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-accent" />
            <span>Admin Intelligence</span>
          </div>
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </Link>

        {currentUser && (
          <div className="px-3 py-2 rounded-xl bg-slate-50 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center">
              {currentUser.name?.[0] || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-navy-900 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-txt-secondary truncate">{currentUser.email}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
