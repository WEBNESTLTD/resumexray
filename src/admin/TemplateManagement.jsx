import React from 'react';
import { Palette, CheckCircle2, FileText, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RESUME_TEMPLATES } from '../data/seedData';

export default function TemplateManagement() {
  const { showToast } = useApp();

  const handleToggle = (id) => {
    showToast(`Template configuration updated for ${id}`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-navy-900">Resume Template Suite</h1>
          <p className="text-xs text-txt-secondary">Enable or disable templates shown in the user marketplace.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESUME_TEMPLATES.map((tpl) => (
          <div key={tpl.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                {tpl.category}
              </span>
              <span className="text-xs font-bold text-emerald-600">
                ATS {tpl.atsScore}%
              </span>
            </div>

            <div>
              <h3 className="font-heading font-bold text-base text-navy-900">{tpl.name}</h3>
              <p className="text-xs text-txt-secondary mt-1">{tpl.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Active</span>
              </span>

              <button
                onClick={() => handleToggle(tpl.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-canvas hover:bg-slate-100 text-navy-900 border border-slate-200"
              >
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
