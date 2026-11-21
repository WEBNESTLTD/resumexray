import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  UploadCloud,
  FileEdit,
  Trash2,
  GitCompare,
  ArrowRight,
  Download,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ResumeLibrary() {
  const { resumes, deleteResume, showToast } = useApp();
  const [selectedResumes, setSelectedResumes] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const toggleSelect = (id) => {
    if (selectedResumes.includes(id)) {
      setSelectedResumes(selectedResumes.filter((rId) => rId !== id));
    } else {
      if (selectedResumes.length >= 2) {
        setSelectedResumes([selectedResumes[1], id]);
      } else {
        setSelectedResumes([...selectedResumes, id]);
      }
    }
  };

  const handleOpenRename = (resume) => {
    setRenameTarget(resume);
    setNewTitle(resume.fileName);
    setRenameModalOpen(true);
  };

  const handleSaveRename = () => {
    if (renameTarget && newTitle.trim()) {
      renameTarget.fileName = newTitle.trim();
      setRenameModalOpen(false);
      showToast('Resume renamed successfully.', 'success');
    }
  };

  const resume1 = resumes.find((r) => r.id === selectedResumes[0]);
  const resume2 = resumes.find((r) => r.id === selectedResumes[1]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900">
            Resume Library
          </h1>
          <p className="text-xs sm:text-sm text-txt-secondary">
            Manage your analyzed resumes, compare versions, and tailor for distinct job tracks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedResumes.length === 2 && (
            <button
              onClick={() => setCompareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare Selected (2)</span>
            </button>
          )}

          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 transition shadow-sm"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Another Resume</span>
          </Link>
        </div>
      </div>

      {/* Comparison Selector Hint */}
      {resumes.length >= 2 && selectedResumes.length < 2 && (
        <div className="p-3.5 rounded-2xl bg-violet-50/70 border border-violet-200 text-xs text-violet-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-violet-600 flex-shrink-0" />
            <span>
              Select any <strong>2 resumes</strong> to run a side-by-side version comparison and ATS score delta analysis.
            </span>
          </div>
          <span className="font-bold text-[11px] text-violet-700">
            ({selectedResumes.length}/2 Selected)
          </span>
        </div>
      )}

      {/* Resumes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => {
          const isSelected = selectedResumes.includes(resume.id);
          return (
            <div
              key={resume.id}
              className={`p-6 rounded-3xl bg-white border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-violet-500 ring-2 ring-violet-500/20 shadow-md'
                  : 'border-slate-200 shadow-soft-sm hover:border-slate-300'
              }`}
            >
              <div className="space-y-4">
                {/* Top card bar */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <h3
                        onClick={() => handleOpenRename(resume)}
                        className="font-heading font-bold text-sm text-navy-900 truncate max-w-[170px] cursor-pointer hover:underline"
                        title="Click to rename"
                      >
                        {resume.fileName}
                      </h3>
                      <p className="text-[11px] text-txt-secondary">{resume.fileSize} • {new Date(resume.uploadedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(resume.id)}
                    className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 mt-1 cursor-pointer"
                    title="Select to compare"
                  />
                </div>

                {/* Score Indicators */}
                <div className="grid grid-cols-2 gap-3 py-2 bg-canvas p-3 rounded-2xl border border-slate-100">
                  <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-txt-secondary">Overall</span>
                    <p className="font-heading font-extrabold text-xl text-violet-700">{resume.scores?.overall || 85}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-txt-secondary">ATS Score</span>
                    <p className="font-heading font-extrabold text-xl text-cyan-accent">{resume.scores?.ats || 90}%</p>
                  </div>
                </div>

                {/* Role badge */}
                <div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-navy-900">
                    {resume.targetRoleTitle || resume.targetRole}
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between">
                <Link
                  to={`/analysis/${resume.id}`}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 transition"
                >
                  View Report
                </Link>

                <div className="flex items-center gap-1">
                  <Link
                    to={`/resume-editor/${resume.id}`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-slate-50 transition"
                    title="Edit in Resume Editor"
                  >
                    <FileEdit className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/job-match"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-50 transition"
                    title="Match against a Job Posting"
                  >
                    <GitCompare className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => deleteResume(resume.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-50 transition"
                    title="Delete resume"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compare Modal */}
      {compareModalOpen && resume1 && resume2 && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-violet-600" />
                <h3 className="font-heading font-bold text-lg text-navy-900">Side-by-Side Resume Comparison</h3>
              </div>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Version 1 */}
              <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-3">
                <p className="font-heading font-bold text-sm text-navy-900 truncate">{resume1.fileName}</p>
                <p className="text-xs text-txt-secondary">Target: {resume1.targetRoleTitle}</p>
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Overall Score:</span>
                    <span className="text-violet-700">{resume1.scores?.overall || 80}/100</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>ATS Compatibility:</span>
                    <span className="text-cyan-accent">{resume1.scores?.ats || 85}%</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Skills Identified:</span>
                    <span>{resume1.skillsFound?.length || 0}</span>
                  </div>
                </div>
              </div>

              {/* Version 2 */}
              <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-3">
                <p className="font-heading font-bold text-sm text-navy-900 truncate">{resume2.fileName}</p>
                <p className="text-xs text-txt-secondary">Target: {resume2.targetRoleTitle}</p>
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Overall Score:</span>
                    <span className="text-violet-700">{resume2.scores?.overall || 80}/100</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>ATS Compatibility:</span>
                    <span className="text-cyan-accent">{resume2.scores?.ats || 85}%</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Skills Identified:</span>
                    <span>{resume2.skillsFound?.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delta Analysis */}
            <div className="p-4 rounded-2xl bg-violet-50/70 border border-violet-200 text-xs text-violet-900 space-y-1">
              <strong>Version Delta Summary:</strong>
              <p>
                {(resume2.scores?.overall || 0) >= (resume1.scores?.overall || 0)
                  ? `Second resume shows a +${(resume2.scores?.overall || 0) - (resume1.scores?.overall || 0)} point improvement in overall resume score with enhanced keyword alignment.`
                  : `First resume holds higher ATS density (+${(resume1.scores?.overall || 0) - (resume2.scores?.overall || 0)} points).`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {renameModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="font-heading font-bold text-base text-navy-900">Rename Resume Document</h3>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRenameModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRename}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700"
              >
                Save Name
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
