import React, { useState } from 'react';
import { User, Mail, Briefcase, Award, Save, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROLE_REQUIREMENTS } from '../data/roleRequirements';

export default function Profile() {
  const { currentUser, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Alex Chen',
    email: currentUser?.email || 'demo@resumexray.demo',
    targetCareer: currentUser?.targetCareer || 'Senior Frontend Engineer',
    experienceLevel: 'Mid-Senior (4-6 years)',
    bio: 'Senior Frontend specialist focused on scalable React systems, micro-frontends, and accessible digital products.',
    interests: 'React 19, TypeScript, Design Systems, Web Vitals Optimization'
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Profile updated successfully (stored in local session).', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900">
          User Profile
        </h1>
        <p className="text-xs sm:text-sm text-txt-secondary">
          Manage your career target tracks and personal job search preferences.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-accent text-white font-heading font-extrabold text-2xl flex items-center justify-center shadow-md">
            {formData.name?.[0] || 'U'}
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-navy-900">{formData.name}</h2>
            <p className="text-xs text-txt-secondary">{formData.email}</p>
            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
              Demo Active User
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Display Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Target Career Title</label>
              <input
                type="text"
                value={formData.targetCareer}
                onChange={(e) => setFormData({ ...formData, targetCareer: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Experience Level</label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-violet-500 bg-white"
              >
                <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                <option value="Mid-Level (2-4 years)">Mid-Level (2-4 years)</option>
                <option value="Mid-Senior (4-6 years)">Mid-Senior (4-6 years)</option>
                <option value="Senior / Lead (6+ years)">Senior / Lead (6+ years)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Professional Narrative / Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-violet-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Focus Technologies & Interests</label>
            <input
              type="text"
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm bg-violet-600 text-white hover:bg-violet-700 transition shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
