import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Palette,
  CheckCircle2,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Eye,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Templates() {
  const { settings, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewModal, setPreviewModal] = useState(null);
  const navigate = useNavigate();

  const templates = [
    {
      id: 'tpl-executive-clean',
      name: 'Executive Minimalist',
      category: 'Professional',
      atsScore: 98,
      atsSuitability: 'Highest (ATS Optimized)',
      description: 'Clean single-column layout strictly formatted for optimal ATS parsing and rapid recruiter scanning.',
      accentColor: '#1E293B',
      previewBadge: 'Most Popular',
      recommendedFor: 'Software Engineers, Architects, Executives, Finance'
    },
    {
      id: 'tpl-modern-tech',
      name: 'Tech Nexus',
      category: 'Technical',
      atsScore: 95,
      atsSuitability: 'High (ATS Friendly)',
      description: 'Streamlined design emphasizing technical skills breakdown, project metrics, and GitHub/portfolio highlights.',
      accentColor: '#7657F6',
      previewBadge: 'Tech Favorite',
      recommendedFor: 'Frontend, Full Stack, DevOps, AI Engineers'
    },
    {
      id: 'tpl-fresh-graduate',
      name: 'Campus Velocity',
      category: 'Fresh Graduate',
      atsScore: 94,
      atsSuitability: 'High (ATS Friendly)',
      description: 'Puts education, internships, academic projects, and verified skills front and center for early-career impact.',
      accentColor: '#16A36A',
      previewBadge: 'Best for Grads',
      recommendedFor: 'College Students, Bootcamp Grads, Interns'
    },
    {
      id: 'tpl-creative-folio',
      name: 'Aesthetic Studio',
      category: 'Creative',
      atsScore: 88,
      atsSuitability: 'Moderate (Visual Polish)',
      description: 'Sophisticated typography and subtle color accents designed for design, marketing, and creative leadership.',
      accentColor: '#42C5D8',
      previewBadge: 'Creative Pick',
      recommendedFor: 'UI/UX Designers, Product Designers, Content Strategists'
    },
    {
      id: 'tpl-minimal-mono',
      name: 'Pure Typography',
      category: 'Minimal',
      atsScore: 99,
      atsSuitability: 'Highest (Zero Distraction)',
      description: 'Zero graphic clutter, perfect hierarchical typography, and maximized whitespace readability.',
      accentColor: '#111827',
      previewBadge: 'ATS 99%',
      recommendedFor: 'All professions, especially traditional corporate'
    },
    {
      id: 'tpl-academic-cv',
      name: 'Scholar Horizon',
      category: 'Academic',
      atsScore: 92,
      atsSuitability: 'High (Detailed)',
      description: 'Structured for detailed research, publications, grants, conferences, and teaching credentials.',
      accentColor: '#3B82F6',
      previewBadge: 'Research',
      recommendedFor: 'Researchers, Professors, PhD candidates, Data Scientists'
    }
  ];

  const categories = ['All', 'Professional', 'Technical', 'Fresh Graduate', 'Creative', 'Minimal', 'Academic'];

  const filtered = selectedCategory === 'All'
    ? templates
    : templates.filter((t) => t.category === selectedCategory);

  const handleUseTemplate = (tpl) => {
    showToast(`Loaded "${tpl.name}" into your Resume Editor!`, 'success');
    navigate('/resume-editor/default');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">
          <Palette className="w-3.5 h-3.5" />
          <span>ATS-Validated Formats</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900">
          Resume Template Library
        </h1>
        <p className="text-xs sm:text-sm text-txt-secondary">
          Pre-formatted single-column resume designs tested for ATS compliance and executive clarity.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-txt-secondary hover:text-navy-900 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm hover:border-violet-300 hover:shadow-soft-md transition flex flex-col justify-between group"
          >
            <div className="space-y-4">
              {/* Visual preview header placeholder */}
              <div
                className="h-36 rounded-2xl p-4 flex flex-col justify-between border border-slate-100 shadow-inner relative overflow-hidden"
                style={{ backgroundColor: `${tpl.accentColor}10` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-navy-900 shadow-sm border border-slate-100">
                    {tpl.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    ATS {tpl.atsScore}%
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="w-16 h-2 rounded bg-slate-400/40" />
                  <div className="w-28 h-1.5 rounded bg-slate-300/40" />
                  <div className="w-24 h-1.5 rounded bg-slate-300/40" />
                </div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-base text-navy-900">{tpl.name}</h3>
                <p className="text-xs text-txt-secondary mt-1 leading-relaxed">{tpl.description}</p>
              </div>

              <div className="text-[11px] text-txt-secondary">
                <strong>Recommended for:</strong> {tpl.recommendedFor}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between">
              <button
                onClick={() => setPreviewModal(tpl)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-txt-secondary hover:text-navy-900 hover:bg-slate-50 transition"
              >
                Preview
              </button>

              <button
                onClick={() => handleUseTemplate(tpl)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 transition shadow-sm"
              >
                <span>Use Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="font-heading font-bold text-lg text-navy-900">{previewModal.name}</h3>
            <p className="text-xs text-txt-secondary">{previewModal.description}</p>
            <div className="p-4 rounded-2xl bg-canvas border border-slate-200 text-xs space-y-2">
              <p><strong>ATS Suitability:</strong> {previewModal.atsSuitability}</p>
              <p><strong>Target Profiles:</strong> {previewModal.recommendedFor}</p>
              <p><strong>Layout:</strong> Single-column standard margin format for clean parsing.</p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPreviewModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const t = previewModal;
                  setPreviewModal(null);
                  handleUseTemplate(t);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700"
              >
                Load This Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
