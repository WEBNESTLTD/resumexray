import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileSearch, Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROLE_REQUIREMENTS } from '../data/roleRequirements';

export default function Register() {
  const [formData, setFormData] = useState({
    name: 'Alex Chen',
    email: 'demo@resumexray.demo',
    targetCareer: 'frontend-developer',
    password: 'ResumeXray@123'
  });

  const { loginDemoUser, showToast } = useApp();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    loginDemoUser(formData.email);
    showToast(`Registered demo account for ${formData.name}`, 'success');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-canvas">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-soft-md">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-accent flex items-center justify-center text-white shadow-md">
              <FileSearch className="w-5 h-5" />
            </div>
            <span className="font-heading font-extrabold text-2xl text-navy-900">
              Resume<span className="text-violet-600">Xray</span>
            </span>
          </Link>
          <h2 className="font-heading font-extrabold text-2xl text-navy-900 pt-2">Create Your Demo Account</h2>
          <p className="text-xs text-txt-secondary">Start optimizing your career documents with simulated intelligence.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
              placeholder="e.g. Alex Chen"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
              placeholder="alex@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Primary Target Career Track</label>
            <select
              value={formData.targetCareer}
              onChange={(e) => setFormData({ ...formData, targetCareer: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition bg-white"
            >
              {Object.entries(ROLE_REQUIREMENTS).map(([key, role]) => (
                <option key={key} value={key}>{role.title} ({role.category})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Demo Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-heading font-bold text-sm bg-violet-600 text-white hover:bg-violet-700 transition flex items-center justify-center gap-2 shadow-md shadow-violet-600/25"
          >
            <span>Create Account & Enter Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-txt-secondary">
          <p>
            Already have a demo account?{' '}
            <Link to="/login" className="font-bold text-violet-600 hover:text-violet-700">
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
