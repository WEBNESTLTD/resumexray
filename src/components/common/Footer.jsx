import React from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, Github, Twitter, Linkedin, Heart, Shield, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-accent flex items-center justify-center text-white shadow-md">
                <FileSearch className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                Resume<span className="text-violet-500">Xray</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              "Your resume is more than a document. It is your career story. Make every detail count."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300">
                <Lock className="w-3 h-3 text-cyan-accent" />
                <span>100% Client-Side Privacy</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300">
                <Shield className="w-3 h-3 text-violet-400" />
                <span>Zero Cloud Storage</span>
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/analyze" className="hover:text-white transition">Resume Scanner</Link></li>
              <li><Link to="/job-match" className="hover:text-white transition">Job Matcher</Link></li>
              <li><Link to="/skill-gap" className="hover:text-white transition">Skill Gap Analyzer</Link></li>
              <li><Link to="/career-roadmap" className="hover:text-white transition">Career Roadmap</Link></li>
              <li><Link to="/templates" className="hover:text-white transition">ATS Templates</Link></li>
            </ul>
          </div>

          {/* Platform Exploration */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Exploration</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="hover:text-white transition">Platform Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition">Demo Pricing</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About & Ethics</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Quick Demo Access */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Access</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-white transition">Demo User Login</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition">User Dashboard</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition">Admin Portal Login</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-white transition">Admin Dashboard</Link></li>
              <li><Link to="/settings" className="hover:text-white transition">System Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeXray Prototype. Built for high-intent career intelligence.</p>
          <p className="flex items-center gap-1">
            <span>Client-side deterministic engine</span>
            <span>•</span>
            <span>React + Vite + Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
