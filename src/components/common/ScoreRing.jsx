import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScoreRing: Polished Circular Score Indicator
 * Uses SVG stroke-dasharray animations for high-intent visual presentation.
 */
export default function ScoreRing({
  score = 0,
  size = 120,
  strokeWidth = 10,
  label = 'Score',
  subtitle = '',
  color = '#7657F6',
  showGrade = true
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const getBenchmark = (val) => {
    if (val >= 90) return { text: 'Exceptional', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (val >= 80) return { text: 'Strong Fit', bg: 'bg-violet-50 text-violet-700 border-violet-200' };
    if (val >= 70) return { text: 'Competitive', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
    if (val >= 60) return { text: 'Needs Polish', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { text: 'Significant Gaps', bg: 'bg-red-50 text-red-700 border-red-200' };
  };

  const benchmark = getBenchmark(normalizedScore);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center score count */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading font-extrabold text-2xl tracking-tight text-navy-900 leading-none">
            {normalizedScore}
          </span>
          <span className="text-[10px] uppercase font-bold text-txt-secondary mt-0.5">/ 100</span>
        </div>
      </div>

      {label && <h4 className="font-heading font-bold text-sm text-navy-900 mt-2">{label}</h4>}
      {subtitle && <p className="text-xs text-txt-secondary mt-0.5">{subtitle}</p>}
      {showGrade && (
        <span className={`mt-2 inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${benchmark.bg}`}>
          {benchmark.text}
        </span>
      )}
    </div>
  );
}
