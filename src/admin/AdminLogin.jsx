import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, ShieldAlert, Key } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@resumexray.demo');
  const [password, setPassword] = useState('XrayAdmin@123');
  const { loginDemoAdmin, showToast } = useApp();
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    loginDemoAdmin(email);
    navigate('/admin/dashboard');
  };

  const handleQuickAdmin = () => {
    setEmail('admin@resumexray.demo');
    setPassword('XrayAdmin@123');
    loginDemoAdmin('admin@resumexray.demo');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-navy-950 text-white">
      <div className="max-w-md w-full space-y-8 bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-violet-600/30">
            <ShieldAlert className="w-6 h-6 text-cyan-accent" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-white pt-2">Admin Intelligence Console</h2>
          <p className="text-xs text-slate-400">System Telemetry & Platform Dataset Configuration</p>
        </div>

        {/* 1-Click Fast Fill */}
        <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">Simulated Admin Credentials:</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-900 text-violet-300">Pre-configured</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Email: <code className="text-cyan-accent">admin@resumexray.demo</code><br />
            Password: <code className="text-cyan-accent">XrayAdmin@123</code>
          </p>
          <button
            type="button"
            onClick={handleQuickAdmin}
            className="w-full mt-1 py-2 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 transition"
          >
            1-Click Admin Access
          </button>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-violet-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-heading font-bold text-sm bg-violet-600 text-white hover:bg-violet-700 transition flex items-center justify-center gap-2 shadow-md shadow-violet-600/30"
          >
            <span>Enter Admin Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link to="/dashboard" className="text-xs text-slate-400 hover:text-white transition">
            ← Return to User Workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
