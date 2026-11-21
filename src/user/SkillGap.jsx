import React, { useState } from 'react';
import {
  TrendingUp,
  Target,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROLE_REQUIREMENTS } from '../data/roleRequirements';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';

export default function SkillGap() {
  const { resumes } = useApp();
  const [selectedRole, setSelectedRole] = useState('frontend-developer');

  const role = ROLE_REQUIREMENTS[selectedRole] || ROLE_REQUIREMENTS['frontend-developer'];
  const userSkills = (resumes[0]?.skillsFound || ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux', 'Jest', 'Git', 'REST APIs']).map(s => s.toLowerCase());

  // Radar dataset
  const radarData = [
    { subject: 'Component Architecture', current: 90, required: 95 },
    { subject: 'TypeScript Depth', current: 85, required: 90 },
    { subject: 'State Management', current: 88, required: 85 },
    { subject: 'Testing (Jest/Playwright)', current: 65, required: 85 },
    { subject: 'Web Accessibility', current: 40, required: 80 },
    { subject: 'Performance / Vitals', current: 70, required: 88 },
  ];

  const matching = role.requiredSkills.filter(s => userSkills.includes(s.toLowerCase()));
  const missing = role.requiredSkills.filter(s => !userSkills.includes(s.toLowerCase()));
  const bonusMissing = role.bonusSkills.filter(s => !userSkills.includes(s.toLowerCase()));

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Interactive Radar Diagnostics</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900">
          Skill Gap Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-txt-secondary">
          Compare your current demonstrated competencies against standard industry role requirements.
        </p>
      </div>

      {/* Target Track Selector */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-bold text-navy-900 mb-1">Select Benchmark Career Track</label>
          <p className="text-xs text-txt-secondary">Updates required skills and radar expectation curves</p>
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold bg-canvas focus:outline-none focus:border-violet-500"
        >
          {Object.entries(ROLE_REQUIREMENTS).map(([k, r]) => (
            <option key={k} value={k}>{r.title} ({r.level})</option>
          ))}
        </select>
      </div>

      {/* Radar Chart & High-Level Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-base text-navy-900">Competency Comparison Radar</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 font-medium text-violet-700">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-600" />
                <span>You</span>
              </span>
              <span className="flex items-center gap-1 font-medium text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span>Benchmark</span>
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#20243A' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#777E91' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '11px',
                    border: 'none'
                  }}
                />
                <Radar name="Your Resume" dataKey="current" stroke="#7657F6" fill="#7657F6" fillOpacity={0.4} />
                <Radar name="Target Requirement" dataKey="required" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-3">
            <h3 className="font-heading font-bold text-sm text-navy-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Matching Core Skills ({matching.length}/{role.requiredSkills.length})</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {matching.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-3">
            <h3 className="font-heading font-bold text-sm text-navy-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Identified Skill Gaps ({missing.length + bonusMissing.length})</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {[...missing, ...bonusMissing].map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Learning Priorities */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
        <h3 className="font-heading font-bold text-base text-navy-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-violet-600" />
          <span>Recommended Learning Priorities</span>
        </h3>
        <p className="text-xs text-txt-secondary">
          Close these high-leverage skill gaps to maximize interview invitations for {role.title}:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {[
            {
              title: 'Web Accessibility (WCAG 2.1 AA)',
              tag: 'High Priority',
              desc: 'Learn semantic HTML landmark roles, ARIA attributes, keyboard navigation tab order, and screen reader testing.'
            },
            {
              title: 'Automated E2E Testing (Playwright)',
              tag: 'High Priority',
              desc: 'Write cross-browser integration and end-to-end tests validating happy paths and network failure boundaries.'
            },
            {
              title: 'Core Web Vitals Optimization',
              tag: 'Medium Priority',
              desc: 'Master sub-150ms Interaction to Next Paint (INP), Largest Contentful Paint (LCP), and Cumulative Layout Shift.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                {item.tag}
              </span>
              <h4 className="font-heading font-bold text-xs text-navy-900">{item.title}</h4>
              <p className="text-[11px] text-txt-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
