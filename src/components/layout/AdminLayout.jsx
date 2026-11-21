import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../common/AdminSidebar';
import DemoBanner from '../common/DemoBanner';
import Toast from '../common/Toast';
import { useApp } from '../../context/AppContext';

export default function AdminLayout() {
  const { toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <DemoBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Admin Sidebar */}
        <div className="w-64 flex-shrink-0">
          <AdminSidebar />
        </div>

        {/* Admin Content Area */}
        <div className="flex-1 overflow-y-auto">
          <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-base text-navy-900">Administrator Console</h1>
              <p className="text-xs text-txt-secondary">Aggregate System Telemetry & Role Dataset Configuration</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Simulated Mode Active</span>
              </span>
            </div>
          </header>

          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
}
