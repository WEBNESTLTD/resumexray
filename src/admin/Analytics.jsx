import React from 'react';
import { BarChart3, AlertTriangle, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function Analytics() {
  const atsFailurePoints = [
    { failure: 'Passive Phrasing / Weak Verbs', occurrences: 42 },
    { failure: 'Missing Measurable Metrics', occurrences: 38 },
    { failure: 'Missing Core Role Keywords', occurrences: 31 },
    { failure: 'Long Dense Paragraphs (>35 words)', occurrences: 22 },
    { failure: 'Missing Contact Details (Phone/Email)', occurrences: 9 },
  ];

  const inDemandSkills = [
    { skill: 'React', count: 28 },
    { skill: 'TypeScript', count: 24 },
    { skill: 'Docker', count: 19 },
    { skill: 'PostgreSQL', count: 18 },
    { skill: 'Next.js', count: 16 },
    { skill: 'Python', count: 15 },
    { skill: 'Tailwind CSS', count: 14 },
    { skill: 'AWS', count: 12 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-navy-900">Platform Analytics & Heuristic Insights</h1>
        <p className="text-xs text-txt-secondary">Identified failure points across automated resume audits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ATS Failure Point Frequency */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="font-heading font-bold text-base text-navy-900">Most Frequent ATS Deductions</h2>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={atsFailurePoints} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#777E91' }} />
                <YAxis dataKey="failure" type="category" tick={{ fontSize: 10, fill: '#20243A' }} width={160} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '11px',
                    border: 'none'
                  }}
                />
                <Bar dataKey="occurrences" fill="#DC5454" radius={[0, 6, 6, 0]} name="Occurrences" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Highest Demand Skills in Seed Taxonomy */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-violet-600" />
            <h2 className="font-heading font-bold text-base text-navy-900">Most Matched Skills</h2>
          </div>
          <div className="space-y-2">
            {inDemandSkills.map((s, idx) => (
              <div key={s.skill} className="flex items-center justify-between text-xs p-2 rounded-xl bg-canvas border border-slate-100">
                <span className="font-semibold text-navy-900">{idx + 1}. {s.skill}</span>
                <span className="font-bold text-violet-700">{s.count} mentions</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
