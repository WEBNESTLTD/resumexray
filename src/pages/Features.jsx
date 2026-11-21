import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck,
  Cpu,
  Target,
  TrendingUp,
  Compass,
  Layers,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function Features() {
  const modules = [
    {
      icon: FileCheck,
      color: 'text-violet-600 bg-violet-50',
      title: 'Deterministic ATS Scanner',
      subtitle: 'Pass Through Automated Gatekeepers With Confidence',
      description: 'Over 90% of mid-to-large companies rely on ATS software like Workday, Greenhouse, Taleo, and Lever. Our scanner audits standard headers, contact parseability, word counts, and formatting indicators to ensure your document gets read as intended.',
      points: [
        'Heuristic detection of key sections (Contact, Experience, Skills, Education)',
        'Header parseability test for telephone, email, LinkedIn, and portfolio URLs',
        'Word density calibration (flagging under-detailed or bloated documents)',
        'Clear separation of candidate qualifications from confusing multi-column tables'
      ]
    },
    {
      icon: Cpu,
      color: 'text-cyan-accent bg-cyan-light',
      title: 'Taxonomy Skills Intelligence',
      subtitle: 'Discover How Industry Systems Categorize Your Abilities',
      description: 'Our engine extracts and maps your technical and soft skills against an extensive taxonomy spanning Frontend, Backend, Data/AI, Cloud/DevOps, Design, and Leadership.',
      points: [
        'Categorized skills chips with color-coded domain tagging',
        'Transparent matching against standardized industry skill dictionaries',
        'Highlighting of missing high-priority technologies for your target role',
        'Zero hallucinated or fabricated skills: grounded strictly in your document text'
      ]
    },
    {
      icon: Target,
      color: 'text-emerald-600 bg-emerald-50',
      title: 'Job Description Matcher',
      subtitle: 'Tailor Your Application to Specific Real-World Postings',
      description: 'Paste any job posting directly into the tool. ResumeXray isolates mandatory qualifications, desired bonus skills, and core keywords, computing your precise overlap percentage.',
      points: [
        'Instant overlap percentage benchmark (Strong Fit, Competitive, or Gaps)',
        'Extracted keyword frequency comparison between job posting and resume',
        'Pre-built Bullet Rewrite Matrix demonstrating how to reframe responsibilities',
        'Actionable checklist of missing requirements before hitting submit'
      ]
    },
    {
      icon: TrendingUp,
      color: 'text-amber-600 bg-amber-50',
      title: 'Action Verbs & Metric Polish',
      subtitle: 'Turn Generic Tasks Into High-Impact Achievements',
      description: 'Hiring managers spend less than 7 seconds on an initial scan. Our heuristic content analyzer flags weak passive verbs and guides you in injecting measurable business impact.',
      points: [
        'Automatic replacement suggestions for weak verbs (e.g. "helped with" → "architected")',
        'Metrics scanner checking for percentages, latency gains, revenue, and scale indicators',
        'First-person pronoun alerts ("I", "my") to maintain objective executive style',
        'Sentence length balancing to avoid exhausting dense bullet points'
      ]
    },
    {
      icon: Compass,
      color: 'text-purple-soft bg-purple-50',
      title: 'Personalized Career Roadmaps',
      subtitle: 'Close Critical Skill Gaps With a Structured Action Plan',
      description: 'Going beyond passive critiques, ResumeXray produces a 3-stage milestone plan: Stage 1 closes immediate resume and foundational gaps, Stage 2 guides capstone portfolio projects, and Stage 3 prepares you for technical and behavioral interviews.',
      points: [
        'Interactive checkboxes that track your career preparation progress',
        'Tailored project recommendations based on target job role requirements',
        'Recommended technical reading topics and testing tools',
        'Interview mastery prompts following the STAR methodology'
      ]
    },
    {
      icon: Layers,
      color: 'text-blue-600 bg-blue-50',
      title: 'Resume Editor & Instant PDF Export',
      subtitle: 'Refine, Preview, and Export Single-Column ATS PDFs',
      description: 'Make direct enhancements inside the integrated Resume Editor. Inspect your changes in real-time and export a clean, ATS-compliant PDF ready to submit.',
      points: [
        'Section-by-section editing with instant suggestion aids',
        'Live typography preview matching professional corporate standards',
        'Client-side PDF generation using html2canvas and jsPDF',
        'Zero risk to original uploaded documents'
      ]
    }
  ];

  return (
    <div className="py-16 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-violet-600">Deep Capabilities</span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-navy-900 tracking-tight">
            Complete Career Intelligence Features
          </h1>
          <p className="text-txt-secondary text-base sm:text-lg leading-relaxed">
            Every feature is designed to give you clarity, transparency, and actionable momentum in your job search.
          </p>
        </div>

        {/* Feature Cards List */}
        <div className="space-y-12">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={m.title}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-soft-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${m.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="font-heading font-extrabold text-2xl text-navy-900">{m.title}</h2>
                  <p className="font-heading font-semibold text-sm text-violet-600">{m.subtitle}</p>
                  <p className="text-sm text-txt-secondary leading-relaxed">{m.description}</p>
                  <ul className="space-y-2.5 pt-2">
                    {m.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-txt-primary">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`lg:col-span-6 p-6 rounded-2xl bg-canvas border border-slate-200/80 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <span className="text-xs font-bold uppercase tracking-wider text-txt-secondary">Live System Insight</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-violet-100 text-violet-700">Prototype Demo</span>
                    </div>
                    <p className="text-xs text-txt-primary font-medium leading-relaxed">
                      "Real ATS parsers reject complicated styling and ambiguous headings. ResumeXray validates standard text hierarchies so that your achievements take center stage."
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/analyze"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-700"
                      >
                        <span>Try this capability with your resume</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900 text-white text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl">Put These Features to Work For You</h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            Upload your resume now to test our deterministic analysis engine in seconds.
          </p>
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-heading font-bold text-base bg-violet-600 text-white hover:bg-violet-700 transition shadow-lg shadow-violet-600/30"
          >
            <Sparkles className="w-4 h-4 text-cyan-accent" />
            <span>Launch Resume Scanner</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
