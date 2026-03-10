"use client";

import { motion } from "framer-motion";

interface AtsGaugeProps {
  score: number;
  label: string;
}

export function AtsGauge({ score, label }: AtsGaugeProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg className="w-48 h-48 transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-slate-100 dark:text-slate-800"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-emerald-600"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-black text-slate-900 dark:text-white"
        >
          {score}%
        </motion.span>
        <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
}
