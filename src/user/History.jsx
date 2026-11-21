import React from 'react';
import { Link } from 'react-router-dom';
import { History as HistoryIcon, FileText, ArrowRight, TrendingUp, Calendar, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function History() {
  const { resumes, deleteResume } = useApp();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>Audit Log</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900">
          Resume Analysis History
        </h1>
        <p className="text-xs sm:text-sm text-txt-secondary">
          Track historical iterations, score evolution, and ATS compatibility across each submission.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
        {resumes.length === 0 ? (
          <p className="text-xs text-txt-secondary py-8 text-center">No analysis history recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {resumes.map((r, i) => (
              <div
                key={r.id}
                className="p-4 sm:p-5 rounded-2xl bg-canvas border border-slate-200 hover:border-slate-300 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center">
                    #{resumes.length - i}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-navy-900">{r.fileName}</h3>
                    <p className="text-xs text-txt-secondary">
                      {new Date(r.uploadedAt).toLocaleDateString()} at {new Date(r.uploadedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Track: {r.targetRoleTitle || r.targetRole}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-bold text-violet-700">Score: {r.scores?.overall || 80}/100</span>
                    <span className="text-slate-300">|</span>
                    <span className="font-bold text-cyan-accent">ATS: {r.scores?.ats || 85}%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/analysis/${r.id}`}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 transition"
                    >
                      Open Report
                    </Link>
                    <button
                      onClick={() => deleteResume(r.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
