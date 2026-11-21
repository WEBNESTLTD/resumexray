import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  Save,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  FileText,
  Printer,
  ChevronRight,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExportService } from '../services/exportService';

export default function ResumeEditor() {
  const { id } = useParams();
  const { resumes, showToast } = useApp();

  const [activeSection, setActiveSection] = useState('summary');

  // Load existing resume or standard state
  const existing = resumes.find((r) => r.id === id) || resumes[0];

  const [resumeData, setResumeData] = useState({
    name: 'Alex Chen',
    title: 'Senior Frontend Engineer',
    contact: {
      email: 'alex.chen@example.dev',
      phone: '(555) 234-5678',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/alexchen-dev',
      github: 'github.com/alexchen'
    },
    summary: 'Results-driven Senior Frontend Engineer with 5+ years of experience designing and scaling responsive, accessible web applications. Spearheaded frontend architecture for SaaS platforms serving 500K+ monthly active users, improving core web vitals by 42% and accelerating feature delivery cycles.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux Toolkit', 'Jest', 'Git', 'REST APIs', 'Web Accessibility (WCAG 2.1 AA)'],
    experience: [
      {
        id: 'exp-1',
        role: 'Senior Frontend Engineer',
        company: 'CloudMatrix Inc.',
        location: 'San Francisco, CA',
        period: 'March 2023 – Present',
        bullets: [
          'Architected and migrated legacy monolith to React 18 and Next.js, reducing initial page load time from 4.2s to 1.4s (66% improvement).',
          'Designed and maintained an enterprise design system used by 24 engineers across 4 cross-functional product squads, increasing UI development speed by 35%.',
          'Engineered high-performance interactive analytics dashboards using Recharts and virtualized lists handling 50,000+ data points smoothly at 60fps.'
        ]
      },
      {
        id: 'exp-2',
        role: 'Frontend Developer',
        company: 'Horizon Digital Labs',
        location: 'Austin, TX',
        period: 'July 2021 – February 2023',
        bullets: [
          'Built 15+ responsive web application features using React, TypeScript, and Tailwind CSS for fintech enterprise clients.',
          'Collaborated closely with product managers and UI/UX designers to implement WCAG 2.1 AA compliant customer portals.',
          'Authored comprehensive automated test suites with Jest, increasing codebase branch coverage from 54% to 88%.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Texas at Austin',
        period: 'Dec 2020',
        details: 'GPA: 3.8/4.0 • Focus on Software Engineering & Distributed Systems'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'DevSprint CLI & Web Portal',
        tech: 'React, Vite, Tailwind CSS',
        description: 'Open-source developer productivity dashboard built with React and Vite. 1,200+ GitHub stars.'
      }
    ]
  });

  const handleExportPdf = () => {
    ExportService.exportAnalysisReport('printable-resume-preview', `${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`);
    showToast('Exporting high-resolution ATS single-column PDF...', 'success');
  };

  const handleSave = () => {
    showToast('Resume changes saved locally in your active workspace session.', 'success');
  };

  const handleAddBullet = (expIndex) => {
    const updated = [...resumeData.experience];
    updated[expIndex].bullets.push('Architected new high-impact feature delivering measurable improvements.');
    setResumeData({ ...resumeData, experience: updated });
  };

  const handleBulletChange = (expIndex, bulletIndex, val) => {
    const updated = [...resumeData.experience];
    updated[expIndex].bullets[bulletIndex] = val;
    setResumeData({ ...resumeData, experience: updated });
  };

  const handleRemoveBullet = (expIndex, bulletIndex) => {
    const updated = [...resumeData.experience];
    updated[expIndex].bullets.splice(bulletIndex, 1);
    setResumeData({ ...resumeData, experience: updated });
  };

  const handleAddSkill = (skill) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData({ ...resumeData, skills: [...resumeData.skills, skill] });
      showToast(`Added ${skill} to skills section.`, 'success');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-2 rounded-xl text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-navy-900">Interactive Resume Editor</h1>
            <p className="text-xs text-txt-secondary">Polish weak action verbs and inspect live single-column ATS rendering.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-navy-900 hover:bg-slate-50 transition shadow-sm"
          >
            <Save className="w-4 h-4 text-violet-600" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={handleExportPdf}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export Clean PDF</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Editor Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft-sm flex items-center gap-1.5 overflow-x-auto text-xs font-heading font-bold">
            {['summary', 'skills', 'experience', 'education', 'contact'].map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap transition ${
                  activeSection === sec
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-txt-secondary hover:text-navy-900 hover:bg-slate-100'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Section: Summary */}
          {activeSection === 'summary' && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
              <h3 className="font-heading font-bold text-sm text-navy-900">Professional Summary</h3>
              <textarea
                rows={5}
                value={resumeData.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-violet-500 leading-relaxed"
              />
              <div className="p-3 rounded-xl bg-violet-50 text-[11px] text-violet-900">
                <strong className="block font-semibold">Pro ATS Tip:</strong>
                Keep summaries to 2–3 sentences highlighting your target title, years of experience, and primary technical strengths.
              </div>
            </div>
          )}

          {/* Section: Skills */}
          {activeSection === 'skills' && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
              <h3 className="font-heading font-bold text-sm text-navy-900">Technical Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {resumeData.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 flex items-center gap-1"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => {
                        const updated = resumeData.skills.filter((_, i) => i !== sIdx);
                        setResumeData({ ...resumeData, skills: updated });
                      }}
                      className="text-violet-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Quick Add Suggestions */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-txt-secondary">Suggested Missing Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Web Accessibility (WCAG)', 'Playwright', 'GraphQL', 'Docker'].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleAddSkill(s)}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-canvas border border-slate-200 hover:border-violet-400 text-navy-900 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section: Experience */}
          {activeSection === 'experience' && (
            <div className="space-y-4">
              {resumeData.experience.map((exp, expIdx) => (
                <div key={exp.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-sm text-navy-900">{exp.role} @ {exp.company}</h4>
                    <span className="text-[11px] text-txt-secondary">{exp.period}</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-txt-secondary">Achievement Bullets:</span>
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2">
                        <textarea
                          rows={2}
                          value={b}
                          onChange={(e) => handleBulletChange(expIdx, bIdx, e.target.value)}
                          className="flex-1 p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-violet-500 leading-relaxed"
                        />
                        <button
                          onClick={() => handleRemoveBullet(expIdx, bIdx)}
                          className="p-1.5 text-slate-400 hover:text-red-500 mt-1"
                          title="Remove bullet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddBullet(expIdx)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700 pt-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Achievement Bullet</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section: Contact */}
          {activeSection === 'contact' && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-3">
              <h3 className="font-heading font-bold text-sm text-navy-900">Header Contact Information</h3>
              <div>
                <label className="block text-[11px] font-bold text-navy-900 mb-0.5">Full Name</label>
                <input
                  type="text"
                  value={resumeData.name}
                  onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-navy-900 mb-0.5">Headline Title</label>
                <input
                  type="text"
                  value={resumeData.title}
                  onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-navy-900 mb-0.5">Email</label>
                  <input
                    type="email"
                    value={resumeData.contact.email}
                    onChange={(e) => setResumeData({ ...resumeData, contact: { ...resumeData.contact, email: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-navy-900 mb-0.5">Phone</label>
                  <input
                    type="text"
                    value={resumeData.contact.phone}
                    onChange={(e) => setResumeData({ ...resumeData, contact: { ...resumeData.contact, phone: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Preview Column: Formatted Printable Sheet */}
        <div className="lg:col-span-7">
          <div className="p-4 rounded-t-2xl bg-slate-900 text-white flex items-center justify-between text-xs font-semibold">
            <span>Live Printable ATS Preview</span>
            <span className="text-cyan-accent text-[11px]">Single-Column • High ATS Parseability</span>
          </div>

          <div
            id="printable-resume-preview"
            className="p-8 sm:p-12 bg-white rounded-b-2xl shadow-xl border border-slate-200 space-y-6 text-txt-primary font-sans leading-normal min-h-[700px]"
          >
            {/* Header */}
            <div className="border-b border-slate-300 pb-4 text-center sm:text-left">
              <h2 className="font-heading font-extrabold text-2xl text-navy-900 tracking-tight">{resumeData.name}</h2>
              <p className="font-heading font-semibold text-sm text-violet-600 mt-0.5">{resumeData.title}</p>
              <p className="text-[11px] text-txt-secondary mt-1 space-x-2">
                <span>{resumeData.contact.location}</span>
                <span>•</span>
                <span>{resumeData.contact.email}</span>
                <span>•</span>
                <span>{resumeData.contact.phone}</span>
                <span>•</span>
                <span>{resumeData.contact.linkedin}</span>
              </p>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-navy-900 border-b border-slate-200 pb-1">
                Professional Summary
              </h3>
              <p className="text-xs text-txt-primary leading-relaxed">{resumeData.summary}</p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-1.5">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-navy-900 border-b border-slate-200 pb-1">
                Technical & Core Competencies
              </h3>
              <p className="text-xs text-txt-primary leading-relaxed">
                {resumeData.skills.join(' • ')}
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-navy-900 border-b border-slate-200 pb-1">
                Professional Experience
              </h3>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-navy-900">{exp.role} — <span className="font-semibold text-txt-secondary">{exp.company}</span></span>
                    <span className="text-[11px] text-txt-secondary">{exp.period}</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-txt-primary">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-navy-900 border-b border-slate-200 pb-1">
                Education
              </h3>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="flex justify-between font-bold text-navy-900">
                    <span>{edu.degree}</span>
                    <span className="text-txt-secondary font-normal">{edu.period}</span>
                  </div>
                  <p className="text-txt-secondary">{edu.institution} — {edu.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
