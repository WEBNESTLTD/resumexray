import React from 'react';
import { Link } from 'react-router-dom';
import { FileUp, Search, Cpu, CheckSquare, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: FileUp,
      title: 'Upload Your Resume File',
      desc: 'Select a PDF or DOCX file (up to 5 MB) or click "Load Sample Resume" for an instant demonstration. The file is processed purely in your browser memory.'
    },
    {
      num: '02',
      icon: Search,
      title: 'Target Role & Context Definition',
      desc: 'Specify your desired career track (e.g. Senior Frontend Engineer, Full Stack Developer, Data Analyst) or paste a specific job description to tailor the analysis.'
    },
    {
      num: '03',
      icon: Cpu,
      title: 'In-Browser Heuristic Evaluation',
      desc: 'Our deterministic engine parses contact information, extracts skills across 8 domains, analyzes keywords, evaluates action verbs, and computes transparent scores.'
    },
    {
      num: '04',
      icon: CheckSquare,
      title: 'Actionable Polish & Export',
      desc: 'Review prioritized Critical, Important, and Recommended actions. Use the Resume Editor to improve weak bullets and export an ATS-optimized PDF.'
    }
  ];

  return (
    <div className="py-16 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-violet-600">The Journey</span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-navy-900 tracking-tight">
            How ResumeXray Works
          </h1>
          <p className="text-txt-secondary text-base sm:text-lg leading-relaxed">
            A transparent, 4-step workflow that turns confusing applicant tracking systems into a clear, predictable playbook.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="p-7 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4 relative">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-extrabold text-3xl text-slate-200">{s.num}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-navy-900">{s.title}</h3>
                <p className="text-xs sm:text-sm text-txt-secondary leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Under the hood technical note */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-soft-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="font-heading font-bold text-xl text-navy-900">Under the Hood: Transparent Scoring Model</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-center">
            {[
              { label: 'Structure', weight: '20%', desc: 'Headings & Contact' },
              { label: 'Skills', weight: '20%', desc: 'Role Taxonomies' },
              { label: 'Experience', weight: '20%', desc: 'Metrics & Depth' },
              { label: 'Keywords', weight: '15%', desc: 'Target Match' },
              { label: 'Formatting', weight: '15%', desc: 'Length & Bullets' },
              { label: 'Education', weight: '10%', desc: 'Degrees & Certs' },
            ].map((d) => (
              <div key={d.label} className="p-4 rounded-xl bg-canvas border border-slate-200/80">
                <p className="font-heading font-extrabold text-xl text-violet-600">{d.weight}</p>
                <p className="font-heading font-bold text-sm text-navy-900 mt-1">{d.label}</p>
                <p className="text-[11px] text-txt-secondary mt-0.5">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading font-bold text-base bg-violet-600 text-white hover:bg-violet-700 transition shadow-lg shadow-violet-600/30"
          >
            <Sparkles className="w-5 h-5 text-cyan-accent" />
            <span>Upload and Analyze in 1 Click</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
