import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { parseResumeFile } from '../services/resumeParser';
import { useApp } from '../context/AppContext';
import { ROLE_REQUIREMENTS } from '../data/roleRequirements';
import { SAMPLE_RESUME_TEXT } from '../data/seedData';

export default function UploadResume() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetRole, setTargetRole] = useState('frontend-developer');
  const [customJobDesc, setCustomJobDesc] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const { saveNewResumeAndAnalysis, showToast } = useApp();
  const navigate = useNavigate();

  const scanSteps = [
    'Reading resume document bytes...',
    'Identifying standard ATS sections...',
    'Extracting skills across 8 industry taxonomies...',
    'Evaluating keywords and role requirements...',
    'Auditing action verbs & quantifiable metrics...',
    'Synthesizing final intelligence report...'
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setErrorMessage('');
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx', 'txt'].includes(ext)) {
      setErrorMessage('Unsupported file format. Please upload a PDF or DOCX file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File exceeds the 5 MB limit. Please select a smaller document.');
      return;
    }
    setSelectedFile(file);
  };

  const handleLoadSampleResume = () => {
    setErrorMessage('');
    const blob = new Blob([SAMPLE_RESUME_TEXT], { type: 'text/plain' });
    const sampleFile = new File([blob], 'Alex_Chen_Senior_Frontend_Engineer.pdf', { type: 'application/pdf' });
    setSelectedFile(sampleFile);
    showToast('Loaded realistic sample resume for instant demonstration!', 'info');
  };

  const startAnalysis = async () => {
    if (!selectedFile) {
      setErrorMessage('Please upload or select a resume file first.');
      return;
    }

    setIsScanning(true);
    setScanStep(0);
    setErrorMessage('');

    try {
      // Step through animation states
      for (let i = 0; i < scanSteps.length; i++) {
        setScanStep(i);
        await new Promise((resolve) => setTimeout(resolve, 400));
      }

      // Parse file in-browser
      const parsedData = await parseResumeFile(selectedFile);

      // Save to application context and localStorage
      const { resume } = saveNewResumeAndAnalysis(parsedData, targetRole, customJobDesc);

      setIsScanning(false);
      navigate(`/analysis/${resume.id}`);
    } catch (err) {
      console.error('Analysis failed:', err);
      setIsScanning(false);
      setErrorMessage(err.message || 'Error parsing resume document.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900">
          Upload Resume for Deep Analysis
        </h1>
        <p className="text-sm text-txt-secondary">
          Extract skills, audit ATS compatibility, and uncover missing keywords in your browser.
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-8">
        {/* Drag & Drop Zone */}
        {!selectedFile ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`p-10 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-violet-500 bg-violet-50/60 scale-[1.01]'
                : 'border-slate-300 hover:border-violet-400 bg-canvas'
            }`}
          >
            <input
              type="file"
              id="resume-file-input"
              accept=".pdf,.docx,.txt"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <label htmlFor="resume-file-input" className="cursor-pointer block space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mx-auto shadow-sm">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-heading font-bold text-base text-navy-900">
                  Drag and drop your resume here, or <span className="text-violet-600 underline">browse files</span>
                </p>
                <p className="text-xs text-txt-secondary">Supports PDF and DOCX files up to 5 MB</p>
              </div>
            </label>

            {/* Quick Sample Button */}
            <div className="pt-6 border-t border-slate-200 mt-6 flex items-center justify-center gap-3">
              <span className="text-xs text-txt-secondary">Don't have a file ready?</span>
              <button
                type="button"
                onClick={handleLoadSampleResume}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 transition"
              >
                Load Sample Resume
              </button>
            </div>
          </div>
        ) : (
          /* File Selected Preview State */
          <div className="p-5 rounded-2xl bg-violet-50/60 border border-violet-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                PDF
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-navy-900">{selectedFile.name}</p>
                <p className="text-xs text-txt-secondary">{(selectedFile.size / 1024).toFixed(1)} KB • Ready for scanning</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Configuration Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1.5">
              Select Your Target Job Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition bg-white"
            >
              {Object.entries(ROLE_REQUIREMENTS).map(([key, role]) => (
                <option key={key} value={key}>{role.title} ({role.category})</option>
              ))}
            </select>
            <p className="text-[11px] text-txt-secondary mt-1">
              Selects the appropriate skill taxonomy and ATS keyword dictionary.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1.5">
              Optional: Custom Job Description Text
            </label>
            <textarea
              rows={3}
              value={customJobDesc}
              onChange={(e) => setCustomJobDesc(e.target.value)}
              placeholder="Paste a real job description here for customized keyword matching..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
            />
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="button"
            disabled={!selectedFile || isScanning}
            onClick={startAnalysis}
            className={`w-full py-4 rounded-xl font-heading font-bold text-base flex items-center justify-center gap-2 transition shadow-lg ${
              !selectedFile || isScanning
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-violet-600 text-white hover:bg-violet-700 shadow-violet-600/25 active:scale-[0.99]'
            }`}
          >
            <Sparkles className="w-5 h-5 text-cyan-accent" />
            <span>{isScanning ? 'Running Deterministic Heuristics...' : 'Scan & Analyze Resume'}</span>
            {!isScanning && <ArrowRight className="w-4 h-4 ml-1" />}
          </button>
        </div>
      </div>

      {/* Engaging Scanning Sequence Dialog */}
      {isScanning && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-accent flex items-center justify-center text-white shadow-lg animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg text-navy-900">Auditing Document Heuristics</h3>
              <p className="text-xs text-txt-secondary">Client-Side Rule Processing Active</p>
            </div>

            {/* Step animation checklist */}
            <div className="space-y-2 text-left bg-canvas p-4 rounded-2xl border border-slate-200">
              {scanSteps.map((step, idx) => {
                const isPassed = idx < scanStep;
                const isCurrent = idx === scanStep;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 text-xs transition-colors ${
                      isPassed
                        ? 'text-emerald-700 font-medium'
                        : isCurrent
                        ? 'text-violet-700 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-violet-600 border-t-transparent animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                    )}
                    <span>{step}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-txt-secondary">
              Evaluating transparent scoring model without external server calls.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
