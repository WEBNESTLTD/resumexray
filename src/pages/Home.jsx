import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileSearch,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  Zap,
  ArrowRight,
  Target,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Award,
  Users,
  Compass
} from 'lucide-react';
import ScoreRing from '../components/common/ScoreRing';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'How does ResumeXray analyze my resume without an external server?',
      a: 'ResumeXray utilizes an advanced client-side document parser and deterministic heuristics engine running entirely inside your modern web browser. It extracts text from PDF and DOCX documents and evaluates them against comprehensive industry role models, ATS guidelines, and keyword taxonomies.'
    },
    {
      q: 'Is my resume data kept private?',
      a: 'Yes, 100%. Because all processing occurs directly in your local browser sandbox, your resume text and personal contact information are never sent to external servers or third-party AI APIs.'
    },
    {
      q: 'What is an ATS and why does compatibility matter?',
      a: 'Applicant Tracking Systems (ATS) are software applications used by over 90% of Fortune 500 companies to automatically parse, score, and rank incoming job applications before a human recruiter ever sees them. Resumes with unparseable headings, tables, or missing keywords are frequently rejected automatically.'
    },
    {
      q: 'Can I match my resume against a specific target job posting?',
      a: 'Absolutely! Our Job Description Matcher lets you paste any real job posting. The engine immediately compares required technologies, nice-to-have capabilities, and keyword frequencies to show your exact percentage match and critical gaps.'
    },
    {
      q: 'Is ResumeXray a free prototype?',
      a: 'Yes, this is an interactive frontend demonstration prototype designed to show what a modern, transparent career intelligence platform can achieve without subscription paywalls or privacy trade-offs.'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 bg-radial-glow bg-grid-pattern border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-violet-50 border border-violet-200 text-violet-700 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-violet-600 animate-spin" />
                <span>Next-Gen In-Browser Resume Intelligence</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-navy-900 tracking-tight leading-[1.12]">
                Your Resume Has Potential.{' '}
                <span className="text-gradient-primary">Let's Reveal It.</span>
              </h1>

              <p className="text-base sm:text-lg text-txt-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Analyze your resume, uncover missing skills, improve ATS compatibility, and discover how to stand out in your next job application.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/analyze"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-heading font-bold text-base bg-violet-600 text-white hover:bg-violet-700 transition shadow-lg shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-5 h-5 text-cyan-accent" />
                  <span>Analyze My Resume Free</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/features"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-heading font-semibold text-base bg-white text-navy-900 border border-slate-300 hover:bg-slate-50 transition shadow-sm"
                >
                  <span>Explore Features</span>
                </Link>
              </div>

              {/* Value Badges */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="text-left">
                  <p className="font-heading font-bold text-xl text-navy-900">98%</p>
                  <p className="text-xs text-txt-secondary">ATS Format Accuracy</p>
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-xl text-navy-900">0s</p>
                  <p className="text-xs text-txt-secondary">Server Wait Time</p>
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-xl text-navy-900">100%</p>
                  <p className="text-xs text-txt-secondary">Client-Side Privacy</p>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Visual: Interactive Scanner Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/90 overflow-hidden">
                {/* Simulated Laser Scan Effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-accent to-violet-500 animate-scan opacity-75 shadow-glow-cyan" />

                {/* Card Top Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-sm">
                      PDF
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-navy-900 truncate max-w-[160px]">
                        Alex_Chen_Senior_FE.pdf
                      </h3>
                      <p className="text-[11px] text-txt-secondary">Target: Senior Frontend Engineer</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ATS Ready
                  </span>
                </div>

                {/* Live Scores Preview */}
                <div className="py-6 flex items-center justify-around">
                  <ScoreRing score={88} size={110} label="Overall Score" color="#7657F6" />
                  <ScoreRing score={92} size={110} label="ATS Score" color="#42C5D8" />
                </div>

                {/* Skills Detected Highlights */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-navy-900">Extracted Skills (9 Found)</span>
                    <span className="text-emerald-600 font-bold">85% Match</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux', 'Jest'].map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 text-navy-900 border border-slate-200">
                        {s}
                      </span>
                    ))}
                    <span className="px-2 py-1 rounded-lg text-[11px] font-medium bg-violet-100 text-violet-700">
                      +3 more
                    </span>
                  </div>
                </div>

                {/* Top Improvement Insight */}
                <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">Missing Target Skill:</strong> Web Accessibility (WCAG). Add WCAG experience to boost ATS ranking by +8%.
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-5">
                  <Link
                    to="/dashboard"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-heading font-semibold text-xs bg-navy-900 text-white hover:bg-slate-800 transition"
                  >
                    <span>View Interactive Demo Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6 CORE CAPABILITIES GRID */}
      <section id="features" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-violet-600">Core Architecture</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-900">
              Intelligence Engineered for Modern Hiring Systems
            </h2>
            <p className="text-txt-secondary text-base sm:text-lg">
              A comprehensive toolkit designed to demystify automated screening algorithms and put you in control of your career story.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-7 rounded-2xl bg-canvas border border-slate-200 hover:border-violet-300 hover:shadow-soft-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Deterministic ATS Auditor</h3>
              <p className="text-sm text-txt-secondary leading-relaxed">
                Screens document headers, contact parseability, date consistency, section hierarchies, and flags invisible ATS parsing blockers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-2xl bg-canvas border border-slate-200 hover:border-violet-300 hover:shadow-soft-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-light text-cyan-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Taxonomy Skills Intelligence</h3>
              <p className="text-sm text-txt-secondary leading-relaxed">
                Categorizes competencies across Frontend, Backend, Cloud/DevOps, AI/Data, Design, and Soft Skills with semantic dictionary extraction.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-2xl bg-canvas border border-slate-200 hover:border-violet-300 hover:shadow-soft-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Job Description Matcher</h3>
              <p className="text-sm text-txt-secondary leading-relaxed">
                Paste any live job post. The engine calculates an exact keyword overlap score and produces a concrete bullet rewrite matrix.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-7 rounded-2xl bg-canvas border border-slate-200 hover:border-violet-300 hover:shadow-soft-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Action Verb & Metric Polish</h3>
              <p className="text-sm text-txt-secondary leading-relaxed">
                Detects weak phrasing (like "helped with" or "worked on") and suggests commanding architectural verbs paired with quantified metrics.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-7 rounded-2xl bg-canvas border border-slate-200 hover:border-violet-300 hover:shadow-soft-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-violet-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Personalized Career Roadmap</h3>
              <p className="text-sm text-txt-secondary leading-relaxed">
                Generates actionable 3-stage milestone pathways: from addressing urgent skill gaps to building capstone portfolio projects and interview mastery.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-7 rounded-2xl bg-canvas border border-slate-200 hover:border-violet-300 hover:shadow-soft-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Interactive Resume Editor & Export</h3>
              <p className="text-sm text-txt-secondary leading-relaxed">
                Edit sections with live suggestion helpers and export directly to clean, ATS-compliant single-column PDF ready for job applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (4 STEPS) */}
      <section className="py-20 bg-canvas border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-violet-600">Seamless Workflow</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-900 mt-2">
              From Raw Document to High-Impact Application in 4 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Upload Document',
                desc: 'Drop in your PDF or DOCX file. Extracted locally in your browser with zero server uploads.'
              },
              {
                num: '02',
                title: 'Select Target Role',
                desc: 'Choose from 8+ predefined technical tracks or paste a custom job posting.'
              },
              {
                num: '03',
                title: 'Review Intelligence',
                desc: 'Inspect your 6-dimension score breakdown, ATS compatibility audit, and missing keywords.'
              },
              {
                num: '04',
                title: 'Tailor & Export',
                desc: 'Use the live Resume Editor to polish weak verbs and export a validated PDF.'
              }
            ].map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft-sm relative">
                <span className="text-4xl font-heading font-extrabold text-violet-200">{step.num}</span>
                <h3 className="font-heading font-bold text-base text-navy-900 mt-3 mb-1.5">{step.title}</h3>
                <p className="text-xs text-txt-secondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USER TESTIMONIALS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-violet-600">Proven Results</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-900 mt-2">
              Trusted by Job Seekers at Every Stage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-canvas border border-slate-200 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {'★★★★★'.split('').map((c, i) => <span key={i}>{c}</span>)}
              </div>
              <p className="text-sm text-txt-primary italic leading-relaxed">
                "ResumeXray revealed that my resume was missing key words like 'Microservices' and 'Docker' that every backend posting required. After tailoring, my interview callback rate doubled!"
              </p>
              <div className="pt-2 border-t border-slate-200">
                <p className="font-heading font-bold text-xs text-navy-900">Marcus Vance</p>
                <p className="text-[11px] text-txt-secondary">Senior AI Engineer</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-canvas border border-slate-200 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {'★★★★★'.split('').map((c, i) => <span key={i}>{c}</span>)}
              </div>
              <p className="text-sm text-txt-primary italic leading-relaxed">
                "As a college grad transitioning into frontend engineering, the Career Roadmap gave me the exact portfolio projects and testing tools I needed to stand out."
              </p>
              <div className="pt-2 border-t border-slate-200">
                <p className="font-heading font-bold text-xs text-navy-900">Priya Patel</p>
                <p className="text-[11px] text-txt-secondary">Full Stack Developer</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-canvas border border-slate-200 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {'★★★★★'.split('').map((c, i) => <span key={i}>{c}</span>)}
              </div>
              <p className="text-sm text-txt-primary italic leading-relaxed">
                "The fact that my resume doesn't leave my browser was the selling point for me. Fast, secure, completely transparent, and deeply actionable."
              </p>
              <div className="pt-2 border-t border-slate-200">
                <p className="font-heading font-bold text-xs text-navy-900">David Kim</p>
                <p className="text-[11px] text-txt-secondary">Data Analyst</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS ACCORDION */}
      <section className="py-20 bg-canvas border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-violet-600">Got Questions?</span>
            <h2 className="font-heading font-extrabold text-3xl text-navy-900 mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-soft-sm transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-heading font-bold text-sm sm:text-base text-navy-900 hover:text-violet-600 transition"
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-violet-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-sm text-txt-secondary leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow opacity-30" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-900/60 border border-violet-700/50 text-violet-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-accent" />
            <span>Start Elevating Your Career Today</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
            Ready to See Beyond Your Resume?
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Upload your resume now to receive immediate, transparent feedback and step-by-step career intelligence.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/analyze"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-heading font-bold text-base bg-violet-600 text-white hover:bg-violet-500 transition shadow-lg shadow-violet-600/30"
            >
              <FileSearch className="w-5 h-5" />
              <span>Analyze My Resume Now</span>
            </Link>

            <Link
              to="/templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-heading font-semibold text-base bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <span>Browse ATS Templates</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
