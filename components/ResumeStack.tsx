"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, User } from "lucide-react";

const RESUMES = [
  { id: 1, title: "Fullstack Developer", color: "bg-emerald-600", items: ["React, Node.js, SQL", "Built Scalable APIs", "System Design Expert"] },
  { id: 2, title: "Frontend Specialist", color: "bg-blue-600", items: ["Tailwind, Framer Motion", "Pixel-Perfect UI", "UX/UI Research"] },
  { id: 3, title: "Team Lead / Architect", color: "bg-indigo-600", items: ["Leadership & Mentoring", "Enterprise Architecture", "Agile Methodologies"] },
];

export function ResumeStack() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % RESUMES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-sm h-[450px] flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        {RESUMES.map((resume, i) => {
          const isCurrent = i === index;
          const position = (i - index + RESUMES.length) % RESUMES.length;
          
          return (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: 1 - position * 0.2, 
                scale: 1 - position * 0.05, 
                y: position * -20,
                zIndex: RESUMES.length - position,
                x: position * 10
              }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute w-full h-full p-8 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl flex flex-col ${resume.color} text-white`}
              style={{ display: position > 2 ? 'none' : 'block' }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="font-bold text-lg">{resume.title}</div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="h-4 w-2/3 bg-white/20 rounded-full mb-8" />
                {resume.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <div className="text-sm font-medium text-white/90">{item}</div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/30" />
                  <div className="text-xs font-bold text-white/70 tracking-widest uppercase">Shadow Vers. {resume.id}</div>
                </div>
                <User className="w-5 h-5 text-white/50" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
