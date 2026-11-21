import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, MapPin, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Feedback / Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been received! (Demonstration prototype mode)', 'success');
  };

  return (
    <div className="py-16 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-violet-600">Connect With Us</span>
          <h1 className="font-heading font-extrabold text-4xl text-navy-900 tracking-tight">
            We'd Love to Hear From You
          </h1>
          <p className="text-txt-secondary text-base leading-relaxed">
            Have questions about ResumeXray's in-browser analysis, ATS compatibility heuristics, or integration requests? Let us know.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-navy-900 text-white space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-white">ResumeXray Headquarters</h3>
                <p className="text-xs text-slate-400 mt-1">AI Career Intelligence Labs</p>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-accent flex-shrink-0" />
                  <span>support@resumexray.demo</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0" />
                  <span>San Francisco, California, USA</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>www.resumexray.demo</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1">
              <strong className="text-white block">Demonstration Notice:</strong>
              <span>Submitted feedback in this demo prototype triggers an instant client-side confirmation.</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy-900">Thank You For Your Message!</h3>
                <p className="text-xs text-txt-secondary max-w-sm mx-auto">
                  Your inquiry has been simulated and logged. We appreciate you testing the ResumeXray platform.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Feedback / Inquiry', message: '' });
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Chen"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition bg-white"
                  >
                    <option value="Feedback / Inquiry">Feedback / General Inquiry</option>
                    <option value="ATS Scanner Question">ATS Scanner Question</option>
                    <option value="University / Campus License">University / Campus Inquiries</option>
                    <option value="Bug Report">Bug Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help your job search?"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-bold text-sm bg-violet-600 text-white hover:bg-violet-700 transition shadow-md shadow-violet-600/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message (Demo)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
