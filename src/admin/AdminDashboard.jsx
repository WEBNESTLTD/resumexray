import React from 'react';
import { Users, FileText, BarChart3, TrendingUp, ShieldAlert, Award, ArrowUpRight } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Demo Users', value: '5', change: '+2 this week', icon: Users, color: 'text-violet-600 bg-violet-50' },
    { title: 'Resumes Analyzed', value: '38', change: '+12 today', icon: FileText, color: 'text-cyan-accent bg-cyan-light' },
    { title: 'Platform Avg Score', value: '83/100', change: '+4% vs baseline', icon: Award, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Job Matches Evaluated', value: '64', change: '84% match rate', icon: TrendingUp, color: 'text-amber-600 bg-amber-50' },
  ];

  const roleDistribution = [
    { name: 'Senior Frontend Engineer', count: 18, fill: '#7657F6' },
    { name: 'Full Stack Engineer', count: 12, fill: '#3B82F6' },
    { name: 'AI / ML Engineer', count: 8, fill: '#42C5D8' },
    { name: 'Data Analyst', count: 6, fill: '#10B981' },
    { name: 'Cloud & DevOps', count: 4, fill: '#F59E0B' },
  ];

  const pieData = [
    { name: 'PDF Documents', value: 78, color: '#7657F6' },
    { name: 'DOCX Word Docs', value: 22, color: '#42C5D8' }
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-navy-900">Platform Intelligence Dashboard</h1>
        <p className="text-xs text-txt-secondary">Aggregate heuristics telemetry and role distribution across demo sessions.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-txt-secondary">{s.title}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="font-heading font-extrabold text-2xl text-navy-900">{s.value}</p>
              <p className="text-[11px] text-emerald-600 font-medium">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Role Distribution Bar Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-navy-900">Popular Career Tracks Analyzed</h2>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#777E91' }} angle={-15} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 10, fill: '#777E91' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '11px',
                    border: 'none'
                  }}
                />
                <Bar dataKey="count" fill="#7657F6" radius={[6, 6, 0, 0]} name="Resumes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upload Format Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-navy-900">Document Formats</h2>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
