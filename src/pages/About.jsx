import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Heart, Award, ArrowRight, Lock, Eye, Code } from 'lucide-react';

export default function About() {
  return (
    <div className="py-16 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-violet-600">Our Mission</span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-navy-900 tracking-tight">
            See Beyond Your Resume.
          </h1>
          <p className="text-lg text-txt-secondary leading-relaxed">
            "Your resume is more than a document. It is your career story. Make every detail count."
          </p>
        </div>

        {/* Core Narrative */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-soft-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-heading font-bold text-2xl text-navy-900">Why We Built ResumeXray</h2>
            <p className="text-sm text-txt-secondary leading-relaxed">
              Every day, thousands of qualified students, engineers, and career-switchers submit thoughtful applications, only to be rejected in milliseconds by opaque algorithmic screening filters.
            </p>
            <p className="text-sm text-txt-secondary leading-relaxed">
              ResumeXray was built to bring total transparency to the resume evaluation process. By decoding the exact heuristics, formatting rules, and keyword expectations used by Applicant Tracking Systems, we empower candidates to articulate their true potential with confidence.
            </p>
            <p className="text-sm text-txt-secondary leading-relaxed">
              Most importantly, we believe your career data is sacred. That is why ResumeXray was engineered with an innovative, 100% client-side architecture that never uploads your resume to remote cloud servers.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-canvas border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-navy-900">Our Privacy Principles</h3>
            </div>
            <ul className="space-y-3 text-xs text-txt-primary">
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-cyan-accent flex-shrink-0 mt-0.5" />
                <span><strong>No Remote Cloud Uploads:</strong> Text extraction and analysis execute inside your local browser runtime.</span>
              </li>
              <li className="flex items-start gap-2">
                <Eye className="w-4 h-4 text-cyan-accent flex-shrink-0 mt-0.5" />
                <span><strong>Transparent Rules:</strong> Every score dimension is calculated by open, deterministic formulas rather than blackbox AI hallucinations.</span>
              </li>
              <li className="flex items-start gap-2">
                <Code className="w-4 h-4 text-cyan-accent flex-shrink-0 mt-0.5" />
                <span><strong>Ethical Guidance:</strong> We guide candidates in quantifying authentic achievements, strictly discouraging fabricated credentials.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Target Audiences */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-heading font-bold text-2xl text-navy-900">Empowering Every Career Transition</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'College Students & Grads', desc: 'Transform academic projects and coursework into recruiters-ready technical bullets.' },
              { title: 'Experienced Engineers', desc: 'Highlight system scale, architectural decisions, latency wins, and cross-team leadership.' },
              { title: 'Career Switchers', desc: 'Identify transferable capabilities and bridge skill gaps with targeted capstones.' },
              { title: 'Freelancers & Contractors', desc: 'Package varied client engagements into a cohesive, high-impact enterprise narrative.' }
            ].map((a) => (
              <div key={a.title} className="p-6 rounded-2xl bg-white border border-slate-200">
                <h3 className="font-heading font-bold text-base text-navy-900 mb-2">{a.title}</h3>
                <p className="text-xs text-txt-secondary leading-relaxed">{a.desc}</p>
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
            <span>Experience ResumeXray Live</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
