import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileSearch, Sparkles, Lock, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('demo@resumexray.demo');
  const [password, setPassword] = useState('ResumeXray@123');
  const { loginDemoUser, showToast } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginDemoUser(email);
    navigate('/dashboard');
  };

  const handleQuickDemo = () => {
    setEmail('demo@resumexray.demo');
    setPassword('ResumeXray@123');
    loginDemoUser('demo@resumexray.demo');
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
          <h2 className="font-heading font-extrabold text-2xl text-navy-900 pt-2">Welcome Back</h2>
          <p className="text-xs text-txt-secondary">Log in to access your resume library and career roadmaps.</p>
        </div>

        {/* Quick Demo Button */}
        <div className="p-4 rounded-2xl bg-violet-50/70 border border-violet-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-violet-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>Simulated Demo Mode</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-200/80 text-violet-800">1-Click</span>
          </div>
          <p className="text-[11px] text-violet-800 leading-relaxed">
            Click below to instantly sign in with sample pre-loaded resume data and target roles.
          </p>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 rounded-xl font-heading font-bold text-xs bg-violet-600 text-white hover:bg-violet-700 transition flex items-center justify-center gap-2 shadow-sm"
          >
            <UserCheck className="w-4 h-4" />
            <span>Instant Demo Login</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
              placeholder="demo@resumexray.demo"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-heading font-bold text-sm bg-navy-900 text-white hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center space-y-2 text-xs text-txt-secondary">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-violet-600 hover:text-violet-700">
              Create Demo Account
            </Link>
          </p>
          <p>
            Are you a platform reviewer?{' '}
            <Link to="/admin/login" className="font-bold text-slate-700 hover:text-navy-900">
              Admin Intelligence Portal →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
