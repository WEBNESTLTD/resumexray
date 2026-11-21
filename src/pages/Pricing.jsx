import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const { showToast } = useApp();

  const handleSelectPlan = (planName) => {
    showToast(`Demonstration plan "${planName}" selected. All features remain 100% unlocked for prototype testing!`, 'success');
  };

  const plans = [
    {
      name: 'Free Student',
      tagline: 'Ideal for early-career exploration & initial ATS audit.',
      priceMonthly: '$0',
      priceYearly: '$0',
      featured: false,
      features: [
        'Full In-Browser Document Parsing (PDF & DOCX)',
        'Overall Resume Score & ATS Compatibility Audit',
        'Taxonomy Skills Extraction (8 Domains)',
        'Sample Resume Library Access',
        'Standard Resume Templates',
        '100% Client-Side Privacy'
      ],
      buttonText: 'Current Active Tier'
    },
    {
      name: 'Pro Job Seeker',
      tagline: 'Tailored matching, bullet rewriting & custom roadmaps.',
      priceMonthly: '$19',
      priceYearly: '$14',
      featured: true,
      badge: 'Most Popular',
      features: [
        'Everything in Free Student',
        'Custom Job Description Matcher (Unlimited)',
        'Interactive Bullet Rewrite Matrix',
        'Personalized 3-Stage Career Roadmap Generator',
        'Interactive Resume Editor & Unlimited PDF Exports',
        'Skill Gap Comparison & Radar Analytics',
        'Local Analysis History & Version Comparison'
      ],
      buttonText: 'Activate Pro (Demo)'
    },
    {
      name: 'Campus / Enterprise',
      tagline: 'For university career centers and bootcamp cohorts.',
      priceMonthly: '$99',
      priceYearly: '$79',
      featured: false,
      features: [
        'Everything in Pro Job Seeker',
        'Dedicated Admin Intelligence Console Access',
        'Cohort Skill Distribution Telemetry',
        'Custom Role Requirements Configurator',
        'Template Management Suite',
        'Zero Data Retention Guarantee'
      ],
      buttonText: 'Explore Campus Demo'
    }
  ];

  return (
    <div className="py-16 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-violet-600">Demonstration Pricing</span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-navy-900 tracking-tight">
            Transparent Pricing for High-Intent Growth
          </h1>
          <p className="text-txt-secondary text-base sm:text-lg leading-relaxed">
            In this prototype, all premium features are fully unlocked for testing. Explore what enterprise-grade career intelligence looks like without commercial paywalls.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-navy-900' : 'text-txt-secondary'}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-8 rounded-full bg-navy-900 p-1 flex items-center transition"
            >
              <div
                className={`w-6 h-6 rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'transform translate-x-6' : ''
                }`}
              />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-navy-900' : 'text-txt-secondary'}`}>
              <span>Yearly</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Save 25%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                p.featured
                  ? 'bg-white border-2 border-violet-500 shadow-xl shadow-violet-500/10 relative scale-105 z-10'
                  : 'bg-white border border-slate-200 shadow-soft-sm'
              }`}
            >
              <div>
                {p.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-600 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm">
                    {p.badge}
                  </div>
                )}
                <h3 className="font-heading font-extrabold text-xl text-navy-900">{p.name}</h3>
                <p className="text-xs text-txt-secondary mt-1">{p.tagline}</p>

                <div className="mt-6 mb-6">
                  <span className="font-heading font-extrabold text-4xl text-navy-900">
                    {billingCycle === 'monthly' ? p.priceMonthly : p.priceYearly}
                  </span>
                  <span className="text-xs text-txt-secondary font-medium ml-1.5">/ month</span>
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-txt-secondary">What's included</p>
                  <ul className="space-y-2.5">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-txt-primary">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleSelectPlan(p.name)}
                  className={`w-full py-3 rounded-xl font-heading font-bold text-sm transition ${
                    p.featured
                      ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-600/30'
                      : 'bg-canvas text-navy-900 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {p.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Note */}
        <div className="p-6 rounded-2xl bg-violet-50/70 border border-violet-200 text-center max-w-2xl mx-auto">
          <p className="text-xs text-violet-900">
            <strong>Demonstration Notice:</strong> ResumeXray is an educational and portfolio frontend prototype. No payments or credit card details are ever processed or requested.
          </p>
        </div>
      </div>
    </div>
  );
}
