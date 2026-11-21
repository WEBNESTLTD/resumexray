import React, { useState } from 'react';
import { Info, X, ShieldAlert } from 'lucide-react';

export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 text-white text-xs px-4 py-2 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-accent flex-shrink-0" />
          <span>
            <strong className="font-semibold text-white">Demonstration Prototype:</strong> All resume parsing, scoring, ATS auditing, and skill roadmaps run 100% locally in your browser via deterministic heuristics. No backend server or paid AI services are invoked.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-0.5"
          title="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
