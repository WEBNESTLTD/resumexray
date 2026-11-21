import React, { useState } from 'react';
import { Users, Search, Filter, ShieldCheck, Mail } from 'lucide-react';
import { DEMO_USERS } from '../data/seedData';

export default function UsersList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = DEMO_USERS.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.targetCareer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-navy-900">Demo User Accounts</h1>
          <p className="text-xs text-txt-secondary">Inspect active demonstration users and target track distributions.</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-violet-500 bg-white"
          />
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-txt-secondary font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-3 pl-2">User</th>
              <th className="pb-3">Role Archetype</th>
              <th className="pb-3">Target Career</th>
              <th className="pb-3 text-center">Resumes</th>
              <th className="pb-3 text-center">Avg Score</th>
              <th className="pb-3">Joined</th>
              <th className="pb-3 text-right pr-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 pl-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center">
                      {u.name[0]}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-navy-900">{u.name}</p>
                      <p className="text-[10px] text-txt-secondary">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-txt-primary">{u.role}</td>
                <td className="py-3.5 text-txt-primary font-semibold">{u.targetCareer}</td>
                <td className="py-3.5 text-center font-bold text-navy-900">{u.resumesCount}</td>
                <td className="py-3.5 text-center font-bold text-violet-700">{u.avgScore}/100</td>
                <td className="py-3.5 text-txt-secondary text-[11px]">{u.joinedDate}</td>
                <td className="py-3.5 text-right pr-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
