import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Circle,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getCareerRoadmap, toggleTaskCompletion } from '../services/roadmapService';
import { ROLE_REQUIREMENTS } from '../data/roleRequirements';

export default function CareerRoadmap() {
  const [selectedRole, setSelectedRole] = useState('frontend-developer');
  const [roadmap, setRoadmap] = useState(() => getCareerRoadmap('frontend-developer'));
  const { showToast } = useApp();

  const handleRoleChange = (roleKey) => {
    setSelectedRole(roleKey);
    const updated = getCareerRoadmap(roleKey);
    setRoadmap(updated);
  };

  const handleToggleTask = (stageId, taskId) => {
    const updated = toggleTaskCompletion(selectedRole, stageId, taskId);
    setRoadmap({ ...updated });
    showToast('Career task status updated!', 'info');
  };

  // Calculate total completed
  const allTasks = roadmap.stages.flatMap((s) => s.tasks);
  const completedCount = allTasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / allTasks.length) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">
          <Compass className="w-3.5 h-3.5" />
          <span>Stage-Based Career Progression</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900">
          Personalized Career Roadmap
        </h1>
        <p className="text-xs sm:text-sm text-txt-secondary">
          Follow structured, actionable milestones to close skill gaps, build capstone evidence, and prepare for interviews.
        </p>
      </div>

      {/* Progress & Role Select Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-heading font-bold text-base text-navy-900">Target Track: {roadmap.roleTitle}</h2>
            <p className="text-xs text-txt-secondary">3 Stages • 12 Weeks Structured Preparation</p>
          </div>
          <select
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-canvas focus:outline-none focus:border-violet-500"
          >
            {Object.entries(ROLE_REQUIREMENTS).map(([k, r]) => (
              <option key={k} value={k}>{r.title}</option>
            ))}
          </select>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-navy-900">Overall Milestone Readiness</span>
            <span className="font-heading font-bold text-violet-700">{progressPercent}% Completed ({completedCount}/{allTasks.length} Tasks)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-cyan-accent transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3 Milestone Stages */}
      <div className="space-y-6">
        {roadmap.stages.map((stage, idx) => (
          <div key={stage.id} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                  {stage.duration}
                </span>
                <h3 className="font-heading font-bold text-lg text-navy-900">{stage.title}</h3>
                <p className="text-xs text-txt-secondary">{stage.description}</p>
              </div>
            </div>

            {/* Task Checklist */}
            <div className="space-y-3 pt-2">
              {stage.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(stage.id, task.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    task.completed
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200 hover:border-violet-300 shadow-soft-sm'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-violet-600 focus:outline-none"
                    aria-label="Toggle task"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 hover:text-violet-500" />
                    )}
                  </button>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                        {task.type}
                      </span>
                      <h4 className={`font-heading font-bold text-xs sm:text-sm ${task.completed ? 'line-through text-slate-400' : 'text-navy-900'}`}>
                        {task.title}
                      </h4>
                    </div>
                    <p className="text-xs text-txt-secondary leading-relaxed">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
