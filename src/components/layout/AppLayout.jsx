import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import DemoBanner from '../common/DemoBanner';
import Toast from '../common/Toast';
import { useApp } from '../../context/AppContext';
import { Menu, X, UploadCloud, Bell, Sparkles, User, LogOut } from 'lucide-react';

export default function AppLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { currentUser, logoutUser, toast } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <DemoBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 max-w-[80vw] bg-white h-full z-10 shadow-2xl flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="font-heading font-bold text-navy-900">Workspace Menu</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto" onClick={() => setMobileSidebarOpen(false)}>
                <Sidebar />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Application Bar */}
          <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                aria-label="Open Workspace Navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-xs text-txt-secondary">
                <span className="font-semibold text-navy-900">Workspace</span>
                <span>/</span>
                <span>AI Resume Intelligence</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition shadow-sm hover:shadow-violet-500/20"
              >
                <UploadCloud className="w-4 h-4" />
                <span className="hidden sm:inline">Upload New Resume</span>
                <span className="sm:hidden">Upload</span>
              </Link>

              <div className="h-4 w-px bg-slate-200 mx-1" />

              {currentUser && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center border border-violet-200">
                    {currentUser.name?.[0] || 'U'}
                  </div>
                  <button
                    onClick={() => {
                      logoutUser();
                      navigate('/login');
                    }}
                    title="Log out"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Page Content Body */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </div>
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
}
