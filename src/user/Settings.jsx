import React from 'react';
import { Settings as SettingsIcon, Bell, Moon, Sun, Trash2, RotateCcw, ShieldCheck, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExportService } from '../services/exportService';

export default function Settings() {
  const { settings, updateSettings, resetAllDemoData, showToast, resumes, analyses } = useApp();

  const handleExportAllData = () => {
    ExportService.exportJsonData(
      { settings, resumes, analyses, exportedAt: new Date().toISOString() },
      'resumexray_backup_state.json'
    );
    showToast('Exported complete local workspace state.', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900">
          Preferences & Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-txt-secondary">
          Configure application preferences and manage in-browser demonstration storage.
        </p>
      </div>

      <div className="space-y-6">
        {/* Preference Toggles */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-6">
          <h2 className="font-heading font-bold text-base text-navy-900">Application Configuration</h2>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-navy-900">Email Notifications (Simulated)</p>
                <p className="text-txt-secondary">Receive weekly updates on newly supported role taxonomies.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => updateSettings({ emailNotifications: e.target.checked })}
                className="w-4 h-4 text-violet-600 rounded"
              />
            </div>

            <div className="py-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-navy-900">Respect Reduced Motion</p>
                <p className="text-txt-secondary">Minimize animations across scanner progress bars and dashboard rings.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => updateSettings({ reducedMotion: e.target.checked })}
                className="w-4 h-4 text-violet-600 rounded"
              />
            </div>

            <div className="py-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-navy-900">ATS Strictness Mode</p>
                <p className="text-txt-secondary">Adjust heuristic rigor for heading recognition and word counts.</p>
              </div>
              <select
                value={settings.atsStrictness || 'balanced'}
                onChange={(e) => updateSettings({ atsStrictness: e.target.value })}
                className="px-3 py-1.5 rounded-lg border border-slate-200 font-semibold bg-canvas"
              >
                <option value="balanced">Balanced (Standard Corporate)</option>
                <option value="strict">Strict (Fortune 500 / High Volume)</option>
                <option value="relaxed">Relaxed (Startups / Creative)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Local Storage & Data Management */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-navy-900">Local Demonstration Data Management</h2>
          <p className="text-xs text-txt-secondary leading-relaxed">
            All data in ResumeXray is saved locally in your browser's LocalStorage. You can back up your analyses or reset the platform back to pristine initial demonstration state at any time.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleExportAllData}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-navy-900 hover:bg-slate-50 transition shadow-sm"
            >
              <Download className="w-4 h-4 text-violet-600" />
              <span>Export Workspace JSON Backup</span>
            </button>

            <button
              onClick={resetAllDemoData}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Application to Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
