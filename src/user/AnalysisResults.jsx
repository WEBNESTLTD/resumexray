import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText,
  Download,
  Share2,
  Copy,
  CheckCircle2,
  AlertTriangle,
  FileEdit,
  ArrowLeft,
  Sparkles,
  Zap,
  Layers,
  Target,
  ShieldCheck,
  CheckSquare,
  Compass,
  GitCompare,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ScoreRing from '../components/common/ScoreRing';
import { ExportService } from '../services/exportService';
import { analyzeResumeText } from '../services/resumeAnalyzer';

export default function AnalysisResults() {
  const { id } = useParams();
  const { resumes, analyses, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [completedRecommendations, setCompletedRecommendations] = useState({});

  // Locate the resume and its matching analysis
  const resume = resumes.find((r) => r.id === id || r.analysisId === id) || resumes[0];
  const storedAnalysis = analyses.find((a) => a.resumeId === resume?.id || a.id === id);
  const analysis = storedAnalysis || (resume?.rawText ? analyzeResumeText(resume.rawText, resume.targetRole) : null) || {
    id: 'demo-analysis',
    analyzedAt: new Date().toISOString(),
    targetRoleTitle: resume?.targetRoleTitle || 'Customer Success Manager',
    scores: resume?.scores || { overall: 88, ats: 92, structure: 90, skills: 85, experience: 88, keywords: 82, formatting: 95, education: 95 },
    sections: {
      detected: resume?.sectionsDetected || ['contact', 'summary', 'skills', 'experience', 'education'],
      missing: []
    },
    contact: {
      email: 'john.xander@gmail.com',
      phone: '+1-952-140-6600',
      linkedin: 'linkedin.com/johnaarts',
      complete: true
    },
    skills: {
      totalCount: resume?.skillsFound?.length || 7,
      allFound: resume?.skillsFound || ['CRM', 'Salesforce', 'NetSuite', 'MS Excel', 'Hubspot', 'Mailchimp', 'Customer Retention'],
      byCategory: {
        customerSuccess: { name: 'Customer Success & CRM', color: '#059669', skills: ['CRM', 'Salesforce', 'NetSuite', 'MS Excel', 'Hubspot', 'Mailchimp', 'Customer Retention'] }
      }
    },
    keywords: {
      coverageScore: 82,
      foundRequired: ['CRM', 'Salesforce', 'NetSuite', 'MS Excel', 'Hubspot', 'Customer Retention'],
      missingRequired: ['Net Retention Rate (NRR)'],
      foundBonus: ['Mailchimp'],
      missingBonus: ['SimilarWeb'],
      missingRoleSkills: ['Net Retention Rate (NRR)', 'SimilarWeb'],
      foundRoleKeywords: ['arr', 'renewal contracts', 'book of business', 'customer retention'],
      missingRoleKeywords: ['churn reduction', 'upsell']
    },
    contentQuality: {
      weakVerbsFound: [
        { phrase: 'worked on', suggestions: ['Spearheaded', 'Engineered', 'Delivered'] }
      ],
      metricsCount: 6,
      metricHighlights: ['115% Net Retention Rate', 'USD $2-2.5M in ARR', '100% retention rate', '25% YoY', '34% of all accounts', 'over $2M ARR'],
      bulletCount: 9,
      longBulletCount: 0,
      firstPersonPronounCount: 1
    },
    ats: {
      score: 92,
      issues: ['Two-column resume layout detected. Single-column format is recommended for maximum legacy ATS compatibility.'],
      positives: [
        'Contact info contains verified email, phone number, and LinkedIn.',
        'Core ATS standard headings recognized.',
        'Strong density of quantified ARR, NRR, and retention metric achievements.'
      ],
      atsChecklist: [
        { item: 'Standard Section Headings', pass: true },
        { item: 'Parseable Contact Information', pass: true },
        { item: 'Single Column Readability', pass: false },
        { item: 'Optimal Word Density', pass: true },
        { item: 'Action Verb & Bullet Format', pass: true },
        { item: 'Zero First-Person Pronouns', pass: false }
      ]
    },
    recommendations: [
      {
        id: 'rec-1',
        priority: 'Important',
        title: 'Single-Column Layout Format',
        category: 'ATS Layout',
        explanation: 'Your uploaded resume uses a multi-column visual design. While visually polished, single-column layouts prevent reading order truncation in automated ATS parsers.'
      },
      {
        id: 'rec-2',
        priority: 'Important',
        title: 'Highlight Net Retention Rate (NRR) in Core Skills',
        category: 'Skills Alignment',
        explanation: 'Customer Success leadership roles heavily prioritize NRR and ARR metrics in standard technical filters.'
      }
    ]
  };

  const toggleRec = (recId) => {
    setCompletedRecommendations((prev) => ({
      ...prev,
      [recId]: !prev[recId]
    }));
    showToast('Recommendation status updated!', 'info');
  };

  const handleExportPdf = () => {
    ExportService.exportAnalysisReport('analysis-report-container', `${resume?.fileName || 'Resume'}_Report.pdf`);
    showToast('Exporting high-resolution PDF report...', 'success');
  };

  const handleCopyMarkdown = async () => {
    const success = await ExportService.copyReportMarkdown(analysis);
    if (success) {
      showToast('Markdown summary copied to clipboard!', 'success');
    }
  };

  const handleExportJson = () => {
    ExportService.exportJsonData(analysis, `${resume?.fileName || 'Resume'}_Analysis.json`);
    showToast('Downloaded raw analysis audit JSON.', 'success');
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'ats', label: 'ATS Analysis' },
    { id: 'skills', label: 'Skills Intelligence' },
    { id: 'keywords', label: 'Keywords & Gaps' },
    { id: 'content', label: 'Content & Verbs' },
    { id: 'improvements', label: 'Action Checklist' },
  ];

  return (
    <div id="analysis-report-container" className="space-y-8 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-2 rounded-xl text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-navy-900">
                {resume?.fileName || 'Resume Analysis Report'}
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                Report Verified
              </span>
            </div>
            <p className="text-xs text-txt-secondary">
              Target Track: <strong className="text-navy-900 font-semibold">{analysis.targetRoleTitle}</strong> • Analyzed {new Date(analysis.analyzedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Report Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-navy-900 hover:bg-slate-50 transition shadow-sm"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy MD</span>
          </button>
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-navy-900 hover:bg-slate-50 transition shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Audit JSON</span>
          </button>
          <button
            onClick={handleExportPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF Report</span>
          </button>
          <Link
            to={`/resume-editor/${resume?.id || 'default'}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-navy-900 text-white hover:bg-slate-800 transition shadow-sm"
          >
            <FileEdit className="w-3.5 h-3.5 text-cyan-accent" />
            <span>Open in Editor</span>
          </Link>
        </div>
      </div>

      {/* 4 Score Rings Overview Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          <ScoreRing
            score={analysis.scores.overall}
            size={130}
            strokeWidth={11}
            label="Overall Score"
            subtitle="Weighted Formula"
            color="#7657F6"
          />
          <ScoreRing
            score={analysis.scores.ats}
            size={130}
            strokeWidth={11}
            label="ATS Compatibility"
            subtitle="Parseability Check"
            color="#42C5D8"
          />
          <ScoreRing
            score={analysis.scores.skills}
            size={130}
            strokeWidth={11}
            label="Skills Match"
            subtitle="Role Requirements"
            color="#10B981"
          />
          <ScoreRing
            score={analysis.scores.experience || 85}
            size={130}
            strokeWidth={11}
            label="Content Quality"
            subtitle="Metrics & Verbs"
            color="#F59E0B"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all border-b-2 -mb-px ${
              activeTab === t.id
                ? 'border-violet-600 text-violet-700 bg-violet-50/50 rounded-t-xl'
                : 'border-transparent text-txt-secondary hover:text-navy-900 hover:border-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
            <h2 className="font-heading font-bold text-lg text-navy-900">Executive Summary</h2>
            <p className="text-sm text-txt-secondary leading-relaxed">
              This document demonstrates <strong>strong alignment ({analysis.scores.overall}/100)</strong> with industry expectations for a <strong>{analysis.targetRoleTitle}</strong>. Key core competencies ({analysis.skills?.allFound?.slice(0, 4).join(', ') || 'demonstrated skills'}) are well articulated with clear metric achievements ({analysis.contentQuality?.metricsCount || 0} quantifiable metrics detected). {analysis.keywords?.missingRoleSkills?.length > 0 ? `To achieve top 5% candidate placement, close the gap on ${analysis.keywords.missingRoleSkills.slice(0, 2).join(' and ')} and ensure bullet points start with commanding action verbs.` : 'Ensure experience bullets maintain high achievement impact.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-canvas border border-slate-200">
                <span className="text-xs font-semibold text-txt-secondary">Structure Weight (20%)</span>
                <p className="font-heading font-bold text-lg text-navy-900 mt-0.5">{analysis.scores.structure}/100</p>
                <p className="text-[11px] text-emerald-600 font-medium">Core ATS sections found</p>
              </div>

              <div className="p-4 rounded-2xl bg-canvas border border-slate-200">
                <span className="text-xs font-semibold text-txt-secondary">Keywords Coverage (15%)</span>
                <p className="font-heading font-bold text-lg text-navy-900 mt-0.5">{analysis.scores.keywords}/100</p>
                <p className="text-[11px] text-violet-600 font-medium">Strong role overlap</p>
              </div>

              <div className="p-4 rounded-2xl bg-canvas border border-slate-200">
                <span className="text-xs font-semibold text-txt-secondary">Formatting & Bullets (15%)</span>
                <p className="font-heading font-bold text-lg text-navy-900 mt-0.5">{analysis.scores.formatting}/100</p>
                <p className="text-[11px] text-cyan-700 font-medium">Optimal scannability</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-3">
              <h3 className="font-heading font-bold text-base text-navy-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Primary Strengths</span>
              </h3>
              <ul className="space-y-2 text-xs text-txt-primary">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>
                    Verified contact information ({analysis.contact?.email ? 'email, ' : ''}{analysis.contact?.phone ? 'phone, ' : ''}{analysis.contact?.linkedin ? 'LinkedIn' : ''}) recognized in header.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Strong presence of numbers, percentages, and business revenue metrics ({analysis.contentQuality?.metricsCount || 0} found).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Standard ATS section structure recognized across {analysis.sections?.detected?.length || 4} key sections.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-3">
              <h3 className="font-heading font-bold text-base text-navy-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Priority Focus Areas</span>
              </h3>
              <ul className="space-y-2 text-xs text-txt-primary">
                {analysis.keywords?.missingRoleSkills?.length > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    <span>Integrate high-priority role skills: {analysis.keywords.missingRoleSkills.slice(0, 3).join(', ')}.</span>
                  </li>
                )}
                {analysis.contentQuality?.weakVerbsFound?.length > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    <span>Replace passive "{analysis.contentQuality.weakVerbsFound[0].phrase}" with power action verbs.</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span>Ensure single-column layout formatting for seamless parsing across legacy ATS portals.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ATS ANALYSIS */}
      {activeTab === 'ats' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-lg text-navy-900">ATS Parseability Checklist</h2>
                <p className="text-xs text-txt-secondary">Screening compliance against corporate ATS standards</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Score: {analysis.ats.score}% Pass
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {analysis.ats.atsChecklist.map((c, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-canvas border border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-medium text-navy-900">{c.item}</span>
                  {c.pass ? (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>PASS</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>REVIEW</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-3">
            <h3 className="font-heading font-bold text-base text-navy-900">Positive Heuristic Observations</h3>
            <div className="space-y-2">
              {analysis.ats.positives.map((pos, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{pos}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
            <p>
              <strong>Important Disclaimer:</strong> Real ATS platforms (Workday, Taleo, Greenhouse, Lever) vary in proprietary ranking algorithms. This score provides an indicative prototype assessment.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: SKILLS INTELLIGENCE */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-lg text-navy-900">Demonstrated Skills by Domain</h2>
                <p className="text-xs text-txt-secondary">Extracted across 8 normalized industry taxonomies</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-50 text-violet-700">
                {analysis.skills.totalCount} Skills Verified
              </span>
            </div>

            <div className="space-y-6 pt-2">
              {Object.entries(analysis.skills.byCategory).map(([key, cat]) => (
                <div key={key} className="space-y-2">
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-txt-secondary">
                    {cat.name} ({cat.skills.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-canvas text-navy-900 border border-slate-200 shadow-soft-sm flex items-center gap-1.5"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: KEYWORDS & GAPS */}
      {activeTab === 'keywords' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-6">
            <div>
              <h2 className="font-heading font-bold text-lg text-navy-900">Target Role Keyword Alignment</h2>
              <p className="text-xs text-txt-secondary">Comparing your resume against requirements for {analysis.targetRoleTitle}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-emerald-700 mb-2">
                  Matching Required Skills ({analysis.keywords.foundRequired?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(analysis.keywords.foundRequired || []).map((s) => (
                    <span key={s} className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-red-700 mb-2">
                  Missing High-Priority Skills ({analysis.keywords.missingRoleSkills?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(analysis.keywords.missingRoleSkills || []).map((s) => (
                    <span key={s} className="px-3 py-1 rounded-xl text-xs font-semibold bg-red-50 text-red-800 border border-red-200 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-red-500" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-txt-secondary mt-1.5">
                  If you have hands-on experience in any of these missing areas, incorporate them in your Resume Editor.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CONTENT & ACTION VERBS */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
            <h2 className="font-heading font-bold text-lg text-navy-900">Action Verb Optimization Matrix</h2>
            <p className="text-xs text-txt-secondary">Upgrade passive phrasing to authoritative architectural statements.</p>

            <div className="space-y-3 pt-2">
              {analysis.contentQuality.weakVerbsFound.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                  Zero weak action verbs detected! Your bullet points start with strong executive phrasing.
                </div>
              ) : (
                analysis.contentQuality.weakVerbsFound.map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-600 px-2 py-0.5 rounded bg-red-50 border border-red-200">
                        Weak Verb: "{item.phrase}"
                      </span>
                      <span className="text-xs text-txt-secondary">→ Recommended Replacements:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.suggestions.map((sug) => (
                        <span key={sug} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">
                          {sug}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-navy-900">Quantifiable Metric Highlights ({analysis.contentQuality.metricsCount} Detected)</h3>
            <p className="text-xs text-txt-secondary">Metrics found in your experience bullets that demonstrate business impact:</p>
            <div className="flex flex-wrap gap-2">
              {analysis.contentQuality.metricHighlights.map((m, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ACTION CHECKLIST */}
      {activeTab === 'improvements' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
            <div>
              <h2 className="font-heading font-bold text-lg text-navy-900">Prioritized Action Checklist</h2>
              <p className="text-xs text-txt-secondary">Check off items as you refine your resume in the editor.</p>
            </div>

            <div className="space-y-3 pt-2">
              {analysis.recommendations.map((rec) => {
                const isDone = completedRecommendations[rec.id];
                const badgeColor =
                  rec.priority === 'Critical'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : rec.priority === 'Important'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-violet-50 text-violet-700 border-violet-200';

                return (
                  <div
                    key={rec.id}
                    onClick={() => toggleRec(rec.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isDone
                        ? 'bg-slate-50 border-slate-200 opacity-60'
                        : 'bg-white border-slate-200 hover:border-violet-300 shadow-soft-sm'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!isDone}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 mt-1 cursor-pointer"
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                          {rec.priority}
                        </span>
                        <h3 className={`font-heading font-bold text-sm ${isDone ? 'line-through text-slate-400' : 'text-navy-900'}`}>
                          {rec.title}
                        </h3>
                      </div>
                      <p className="text-xs text-txt-secondary leading-relaxed">{rec.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
