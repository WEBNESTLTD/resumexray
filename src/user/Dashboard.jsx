import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  ArrowRight,
  ExternalLink,
  GitCompare,
  FileEdit,
  Trash2,
  Compass,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ScoreRing from '../components/common/ScoreRing';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';

export default function Dashboard() {
  const { currentUser, resumes, deleteResume } = useApp();

  const resumesAnalyzed = resumes.length;
  const avgOverallScore = resumesAnalyzed > 0
    ? Math.round(resumes.reduce((acc, r) => acc + (r.scores?.overall || 80), 0) / resumesAnalyzed)
    : 85;
  const avgAtsScore = resumesAnalyzed > 0
    ? Math.round(resumes.reduce((acc, r) => acc + (r.scores?.ats || 85), 0) / resumesAnalyzed)
    : 88;
  const totalSkillsIdentified = resumes.reduce((acc, r) => acc + (r.skillsFound?.length || 0), 0);

  // Score trend historical data from actual prototype resumes
  const scoreTrendsData = resumes.map((r, i) => ({
    name: r.fileName.length > 16 ? r.fileName.slice(0, 14) + '...' : r.fileName,
    overall: r.scores?.overall || 80,
    ats: r.scores?.ats || 85,
    date: new Date(r.uploadedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  })).reverse();

  // If only 1 or 2 resumes, add contextual trend points for charting
  const chartData = scoreTrendsData.length >= 2 ? scoreTrendsData : [
    { name: 'Initial Baseline', overall: 68, ats: 72, date: 'Nov 12' },
    { name: 'After Keyword Audit', overall: 78, ats: 82, date: 'Nov 15' },
    ...scoreTrendsData
  ];

  // Domain breakdown
  const domainSkillDistribution = [
    { domain: 'Frontend', count: 12, color: '#7657F6' },
    { domain: 'Backend', count: 8, color: '#3B82F6' },
    { domain: 'DevOps & Cloud', count: 6, color: '#42C5D8' },
    { domain: 'Databases', count: 7, color: '#10B981' },
    { domain: 'Testing & QA', count: 5, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-soft-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-900/60 border border-violet-700/50 text-violet-300">
            <Zap className="w-3.5 h-3.5 text-cyan-accent" />
            <span>AI Career Intelligence Center</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
            Welcome back, {currentUser?.name || 'Job Seeker'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            "Your resume is more than a document. It is your career story. Make every detail count."
          </p>
        </div>

        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-sm bg-violet-600 text-white hover:bg-violet-700 transition shadow-lg shadow-violet-600/30 flex-shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Analyze New Resume</span>
        </Link>
      </div>

      {/* 5 Statistics KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft-sm space-y-1">
          <p className="text-xs font-semibold text-txt-secondary">Resumes Analyzed</p>
          <p className="font-heading font-extrabold text-2xl text-navy-900">{resumesAnalyzed}</p>
          <p className="text-[11px] text-emerald-600 font-medium">In your library</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft-sm space-y-1">
          <p className="text-xs font-semibold text-txt-secondary">Avg Resume Score</p>
          <p className="font-heading font-extrabold text-2xl text-violet-600">{avgOverallScore}<span className="text-xs text-txt-secondary font-normal">/100</span></p>
          <p className="text-[11px] text-violet-700 font-medium">Strong Benchmark</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft-sm space-y-1">
          <p className="text-xs font-semibold text-txt-secondary">Avg ATS Score</p>
          <p className="font-heading font-extrabold text-2xl text-cyan-accent">{avgAtsScore}<span className="text-xs text-txt-secondary font-normal">/100</span></p>
          <p className="text-[11px] text-cyan-700 font-medium">High ATS Parseability</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft-sm space-y-1">
          <p className="text-xs font-semibold text-txt-secondary">Job Matches Run</p>
          <p className="font-heading font-extrabold text-2xl text-emerald-600">14</p>
          <p className="text-[11px] text-txt-secondary font-medium">Roles mapped</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft-sm space-y-1 col-span-2 sm:col-span-1">
          <p className="text-xs font-semibold text-txt-secondary">Skills Identified</p>
          <p className="font-heading font-extrabold text-2xl text-navy-900">{totalSkillsIdentified || 24}</p>
          <p className="text-[11px] text-txt-secondary font-medium">Across 8 taxonomies</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Score Evolution Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-base text-navy-900">Score Progress Trends</h2>
              <p className="text-xs text-txt-secondary">Overall Score vs ATS Compatibility across versions</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-violet-700">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-600" />
                <span>Overall Score</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium text-cyan-700">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-accent" />
                <span>ATS Score</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="overallGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7657F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7657F6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="atsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#42C5D8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#42C5D8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#777E91' }} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#777E91' }} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="overall" stroke="#7657F6" strokeWidth={2.5} fill="url(#overallGrad)" name="Overall Score" />
                <Area type="monotone" dataKey="ats" stroke="#42C5D8" strokeWidth={2.5} fill="url(#atsGrad)" name="ATS Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Category Distribution Bar Chart */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
          <div>
            <h2 className="font-heading font-bold text-base text-navy-900">Extracted Skills Breakdown</h2>
            <p className="text-xs text-txt-secondary">Count of verified competencies by technical domain</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainSkillDistribution} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#777E91' }} tickLine={false} />
                <YAxis dataKey="domain" type="category" tick={{ fontSize: 11, fill: '#20243A' }} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '11px',
                    border: 'none'
                  }}
                />
                <Bar dataKey="count" fill="#7657F6" radius={[0, 6, 6, 0]} name="Skills Found" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Resumes Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
        <div className="flex items-center justify-between pb-2">
          <div>
            <h2 className="font-heading font-bold text-lg text-navy-900">Your Resumes</h2>
            <p className="text-xs text-txt-secondary">Select any resume to inspect detailed ATS and keyword diagnostics.</p>
          </div>
          <Link
            to="/my-resumes"
            className="text-xs font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-canvas border border-dashed border-slate-200 space-y-3">
            <p className="text-sm font-semibold text-navy-900">No resumes analyzed yet</p>
            <p className="text-xs text-txt-secondary max-w-sm mx-auto">Upload your first resume or load our demonstration resume in one click.</p>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 text-white"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Resume</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-txt-secondary font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3 pl-2">Document</th>
                  <th className="pb-3">Target Role</th>
                  <th className="pb-3 text-center">Overall</th>
                  <th className="pb-3 text-center">ATS Score</th>
                  <th className="pb-3">Uploaded</th>
                  <th className="pb-3 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {resumes.map((resume) => (
                  <tr key={resume.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 font-bold text-xs flex items-center justify-center">
                          PDF
                        </div>
                        <div>
                          <p className="font-heading font-bold text-navy-900 truncate max-w-[200px]">{resume.fileName}</p>
                          <p className="text-[10px] text-txt-secondary">{resume.fileSize}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-txt-primary">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-navy-900 font-medium text-[11px]">
                        {resume.targetRoleTitle || resume.targetRole}
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="font-heading font-extrabold text-sm text-violet-700">
                        {resume.scores?.overall || 85}
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="font-heading font-extrabold text-sm text-cyan-accent">
                        {resume.scores?.ats || 90}%
                      </span>
                    </td>
                    <td className="py-3.5 text-txt-secondary text-[11px]">
                      {new Date(resume.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          to={`/analysis/${resume.id}`}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 transition"
                        >
                          Report
                        </Link>
                        <Link
                          to={`/resume-editor/${resume.id}`}
                          title="Open in Resume Editor"
                          className="p-1 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-slate-100 transition"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => deleteResume(resume.id)}
                          title="Delete"
                          className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/job-match"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-violet-300 shadow-soft-sm hover:shadow-soft-md transition flex items-start gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform flex-shrink-0">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-navy-900 group-hover:text-violet-600 transition">Job Posting Matcher</h3>
            <p className="text-xs text-txt-secondary mt-1">Paste a job opening to audit keyword alignment and matching skills.</p>
          </div>
        </Link>

        <Link
          to="/skill-gap"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-violet-300 shadow-soft-sm hover:shadow-soft-md transition flex items-start gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform flex-shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-navy-900 group-hover:text-violet-600 transition">Skill Gap Analyzer</h3>
            <p className="text-xs text-txt-secondary mt-1">Compare your current resume skills against industry target expectations.</p>
          </div>
        </Link>

        <Link
          to="/career-roadmap"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-violet-300 shadow-soft-sm hover:shadow-soft-md transition flex items-start gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-light text-cyan-accent flex items-center justify-center font-bold group-hover:scale-110 transition-transform flex-shrink-0">
            <Compass className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-navy-900 group-hover:text-violet-600 transition">Career Milestones</h3>
            <p className="text-xs text-txt-secondary mt-1">Track your 3-stage milestone progression and capstone preparation.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
