import React, { useState } from 'react';
import {
  GitCompare,
  Sparkles,
  CheckCircle2,
  XCircle,
  FileText,
  Target,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { matchJobDescription } from '../services/jobMatcher';
import { ROLE_REQUIREMENTS } from '../data/roleRequirements';
import ScoreRing from '../components/common/ScoreRing';

export default function JobMatcher() {
  const { resumes } = useApp();
  const [selectedResumeId, setSelectedResumeId] = useState(resumes[0]?.id || '');
  const [roleKey, setRoleKey] = useState('frontend-developer');
  const [jobDescription, setJobDescription] = useState(
    `We are seeking a Senior Frontend Engineer to build high-scale React and TypeScript web applications. 
The ideal candidate has strong hands-on experience with Tailwind CSS, Next.js, Redux, RESTful architecture, and automated testing with Jest and Playwright. 
Demonstrated knowledge of Web Accessibility (WCAG 2.1 AA) and web vitals optimization is highly desirable.`
  );
  const [matchResult, setMatchResult] = useState(null);

  const activeResume = resumes.find((r) => r.id === selectedResumeId) || resumes[0];

  const handleRunMatch = () => {
    const skills = activeResume?.skillsFound || ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux', 'REST APIs', 'Jest'];
    const text = activeResume?.rawText || '';
    const res = matchJobDescription(skills, text, jobDescription, roleKey);
    setMatchResult(res);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <GitCompare className="w-3.5 h-3.5" />
          <span>Deterministic Overlap Engine</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900">
          Job Description Matcher
        </h1>
        <p className="text-xs sm:text-sm text-txt-secondary">
          Compare your resume directly against any real-world job posting to discover missing keywords and tailored rewrite suggestions.
        </p>
      </div>

      {/* Input Panel */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1.5">
              1. Select Resume From Library
            </label>
            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 bg-white"
            >
              {resumes.map((r) => (
                <option key={r.id} value={r.id}>{r.fileName} ({r.targetRoleTitle || r.targetRole})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1.5">
              2. Baseline Career Track
            </label>
            <select
              value={roleKey}
              onChange={(e) => setRoleKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 bg-white"
            >
              {Object.entries(ROLE_REQUIREMENTS).map(([key, role]) => (
                <option key={key} value={key}>{role.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-navy-900 mb-1.5">
            3. Paste Job Description or Responsibilities
          </label>
          <textarea
            rows={5}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job posting text here..."
            className="w-full p-3.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-violet-500 leading-relaxed font-sans"
          />
        </div>

        <button
          onClick={handleRunMatch}
          className="w-full py-3.5 rounded-xl font-heading font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Calculate Match Overlap & Keywords</span>
        </button>
      </div>

      {/* Match Results Display */}
      {matchResult && (
        <div className="space-y-6">
          {/* Header Score Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex justify-center">
              <ScoreRing
                score={matchResult.matchPercentage}
                size={140}
                label="Job Match Score"
                subtitle="Calculated Overlap"
                color="#10B981"
              />
            </div>
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {matchResult.summary.benchmark}
                </span>
                <span className="text-xs text-txt-secondary">
                  Found {matchResult.summary.totalFound} matching competencies; {matchResult.summary.totalMissing} critical gaps detected.
                </span>
              </div>
              <h2 className="font-heading font-bold text-lg text-navy-900">Posting Alignment Analysis</h2>
              <p className="text-xs text-txt-secondary leading-relaxed">
                Your resume strongly reflects the primary architecture requirements of this role. Adding specific references to missing technologies like <strong>{matchResult.missingSkills.slice(0, 2).join(' and ')}</strong> will raise your candidate ranking significantly.
              </p>
            </div>
          </div>

          {/* Skills Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-3">
              <h3 className="font-heading font-bold text-sm text-navy-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Matching Skills ({matchResult.matchingSkills.length})</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchResult.matchingSkills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-3">
              <h3 className="font-heading font-bold text-sm text-navy-900 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span>Missing Skills in Posting ({matchResult.missingSkills.length})</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchResult.missingSkills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bullet Rewrite Matrix */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-navy-900">Tailored Bullet Rewrite Matrix</h3>
            <p className="text-xs text-txt-secondary">Exemplary transformations to reframe passive experience for this posting:</p>

            <div className="space-y-4 pt-2">
              {matchResult.rewriteSuggestions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-2">
                  <div className="text-xs">
                    <span className="font-bold text-slate-500">Original Task:</span>
                    <p className="text-slate-600 italic mt-0.5">{item.original}</p>
                  </div>
                  <div className="text-xs pt-1 border-t border-slate-200">
                    <span className="font-bold text-emerald-700">Tailored High-Impact Bullet:</span>
                    <p className="text-navy-900 font-medium mt-0.5">{item.tailored}</p>
                  </div>
                  <p className="text-[11px] text-txt-secondary">
                    <strong>Why it works:</strong> {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
