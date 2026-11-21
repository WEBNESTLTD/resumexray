import React from 'react';
import { Settings, RotateCcw, ShieldAlert, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROLE_REQUIREMENTS } from '../data/roleRequirements';
import { SKILL_CATEGORIES } from '../data/skillDictionary';

export default function AdminSettings() {
  const { resetAllDemoData, showToast } = useApp();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-navy-900">Admin System Controls</h1>
        <p className="text-xs text-txt-secondary">Inspect skill dictionaries and reset simulated telemetry.</p>
      </div>

      <div className="space-y-6">
        {/* Active Taxonomies */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-navy-900">Active Skill Categories ({Object.keys(SKILL_CATEGORIES).length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {Object.entries(SKILL_CATEGORIES).map(([k, cat]) => (
              <div key={k} className="p-3 rounded-xl bg-canvas border border-slate-200 space-y-1">
                <p className="font-bold text-navy-900">{cat.name}</p>
                <p className="text-[11px] text-violet-600 font-semibold">{cat.skills.length} skills indexed</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Reset */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-3">
          <h2 className="font-heading font-bold text-base text-navy-900">Purge & Reset All Demo State</h2>
          <p className="text-xs text-txt-secondary">
            Restores all mock resumes, user profiles, analysis history, and roadmaps to factory default demonstration records.
          </p>
          <div className="pt-2">
            <button
              onClick={resetAllDemoData}
              className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Demonstration Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
