import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileSearch, Sparkles, Menu, X, ArrowRight, ShieldCheck, User, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logoutUser } = useApp();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-accent flex items-center justify-center text-white shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
            <FileSearch className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-xl tracking-tight text-navy-900">Resume<span className="text-violet-600">Xray</span></span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">Prototype</span>
            </div>
            <p className="text-[10px] text-txt-secondary leading-none hidden sm:block">AI Career Intelligence</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-violet-600 bg-violet-50 font-semibold'
                  : 'text-txt-primary hover:text-violet-600 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition shadow-sm hover:shadow-violet-500/25"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={logoutUser}
                title="Log out"
                className="p-2 rounded-xl text-txt-secondary hover:text-status-error hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium text-txt-primary hover:text-violet-600 hover:bg-slate-50 transition"
              >
                Log In
              </Link>
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-navy-900 text-white hover:bg-slate-800 transition shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-cyan-accent" />
                <span>Analyze Free</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            to="/dashboard"
            className="p-2 text-xs font-semibold rounded-lg bg-violet-50 text-violet-700"
          >
            App
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-txt-secondary hover:text-txt-primary hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'text-violet-600 bg-violet-50 font-semibold'
                  : 'text-txt-primary hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl font-semibold bg-violet-600 text-white"
            >
              Open Dashboard
            </Link>
            <Link
              to="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl font-semibold bg-navy-900 text-white flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-accent" />
              <span>Upload Resume</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
