import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Palette,
  Settings,
  ArrowLeft,
  ShieldAlert,
  Terminal,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminSidebar() {
  const { currentAdmin, logoutAdmin } = useApp();

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Demo Users', icon: Users },
    { to: '/admin/analytics', label: 'Platform Analytics', icon: BarChart3 },
    { to: '/admin/templates', label: 'Template Management', icon: Palette },
    { to: '/admin/settings', label: 'Admin Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-navy-900 text-white flex flex-col h-full select-none border-r border-slate-800">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white">
            <ShieldAlert className="w-4 h-4 text-cyan-accent" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-sm tracking-wide text-white">Admin Portal</h2>
            <p className="text-[10px] text-slate-400">ResumeXray Control</p>
          </div>
        </div>
      </div>

      {/* Admin Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Superadmin Controls
        </div>
        {adminLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-violet-600 text-white font-semibold shadow-md shadow-violet-600/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Switch Back to User App */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <Link
          to="/dashboard"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to User Workspace</span>
        </Link>
        <div className="px-3 py-2 rounded-xl bg-slate-800/60 flex items-center justify-between text-xs text-slate-300">
          <span className="truncate">admin@resumexray.demo</span>
          <button
            onClick={logoutAdmin}
            title="Log out of Admin"
            className="text-slate-400 hover:text-red-400 p-1"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
