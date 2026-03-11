"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  MoreHorizontal, 
  Download, 
  Share2, 
  ChevronDown, 
  Eye, 
  Lock,
  Globe,
  Check
} from "lucide-react";

export const EditorMockup = () => {
  return (
    <div className="w-full bg-white/30 dark:bg-slate-950/30 rounded-[3rem] p-4 md:p-12 lg:p-16 border border-white/40 dark:border-slate-800/20 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 liquid-mesh opacity-[0.05] pointer-events-none" />
      <div className="w-full relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />
        
        {/* Browser Frame */}
        <div className="relative w-full rounded-[2rem] border border-white/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/70 shadow-[0_48px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden backdrop-blur-2xl">
          
          {/* Browser Header / Tab Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5 mr-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-2 font-bold text-emerald-600 text-sm italic">
                <div className="w-5 h-5 bg-emerald-600 rounded flex items-center justify-center text-white text-[10px] not-italic">S</div>
                SmartCraft.ai
              </div>
            </div>
            
            <div className="hidden lg:flex px-3 py-1 bg-white dark:bg-slate-900 border border-border/50 rounded-lg text-[10px] font-medium text-muted-foreground items-center gap-2">
              <Search className="w-3 h-3" />
              localhost:3000/editor/resume-123
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Editor Toolbar */}
          <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-border/50 bg-white dark:bg-slate-900 gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 py-1.5 px-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold ring-1 ring-emerald-500/10">
                <Lock className="w-3.5 h-3.5" />
                Backend Resumes
              </div>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold hover:bg-muted rounded-lg transition-colors">
                Theme <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold hover:bg-muted rounded-lg transition-colors">
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-sm">
                <Download className="w-4 h-4" /> Download
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-border hover:bg-muted rounded-lg transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>

          {/* Main Workspace */}
          <div className="flex h-[500px] md:h-[600px]">
            {/* Left Panel: Form */}
            <div className="hidden md:block w-2/5 border-r border-border/50 p-8 bg-slate-50/30 dark:bg-slate-900/30 overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold mb-1">Personal Information</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Get started with the basics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">First Name</label>
                    <div className="h-9 w-full bg-white dark:bg-slate-800 border border-border rounded-lg px-3 text-xs flex items-center shadow-sm">Emmanuel</div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Last Name</label>
                    <div className="h-9 w-full bg-white dark:bg-slate-800 border border-border rounded-lg px-3 text-xs flex items-center shadow-sm">Umeh</div>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Job Title</label>
                  <div className="h-9 w-full bg-white dark:bg-slate-800 border border-border rounded-lg px-3 text-xs flex items-center shadow-sm">Fullstack Developer</div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Address</label>
                  <div className="h-9 w-full bg-white dark:bg-slate-800 border border-border rounded-lg px-3 text-xs flex items-center shadow-sm">123 Tech Avenue, Bangalore</div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Phone Number</label>
                  <div className="h-9 w-full bg-white dark:bg-slate-800 border border-border rounded-lg px-3 text-xs flex items-center shadow-sm">+91 98765 43210</div>
                </div>
                
                <button className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-lg shadow-emerald-500/20 transition-all mt-4">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Right Panel: Preview */}
            <div className="flex-1 p-8 bg-white dark:bg-slate-900 relative overflow-hidden flex justify-center items-start overflow-y-auto custom-scrollbar">
              {/* Simple Resume Canvas */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[400px] bg-white border border-slate-200 shadow-sm rounded-none p-6 text-[8px] text-slate-800 pointer-events-none"
              >
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <h1 className="text-lg font-black text-emerald-600 leading-tight">Emmanuel Umeh</h1>
                      <h2 className="text-[10px] font-bold text-slate-600 uppercase">React JS Developer</h2>
                   </div>
                   <div className="text-right text-[6px] font-medium text-slate-400">
                      Bangalore, India<br />+91 98765 43210<br />emmanuel@work.com
                   </div>
                </div>
                
                <p className="mb-4 leading-relaxed text-slate-600">
                   Experienced Frontend developer with a strong foundation in JavaScript, TypeScript, and React. Skilled in building scalable, performant web applications using component-based architecture and best practices.
                </p>
                
                <div className="space-y-3">
                   <div>
                      <h3 className="text-[8px] font-black uppercase tracking-widest text-emerald-600 border-b border-emerald-100 pb-1 mb-2">Experience</h3>
                      <div className="space-y-2">
                         <div>
                            <div className="flex justify-between font-bold text-slate-900">
                               <span>Senior Software Engineer • SmartCraft AI</span>
                               <span className="text-slate-400">2024 - Present</span>
                            </div>
                            <p className="mt-1 font-medium">Developed scalable web applications using React, Next.js, and Node.js. Optimized performance leading to 30% faster load times.</p>
                         </div>
                         <div>
                            <div className="flex justify-between font-bold text-slate-900">
                               <span>Frontend Lead • TechCorp India</span>
                               <span className="text-slate-400">2022 - 2024</span>
                            </div>
                            <p className="mt-1 font-medium">Led a team of 4 developers to redesign the core product UI, increasing user engagement by 45%.</p>
                         </div>
                      </div>
                   </div>
                   
                   <div>
                      <h3 className="text-[8px] font-black uppercase tracking-widest text-emerald-600 border-b border-emerald-100 pb-1 mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-1">
                         {['React', 'Next.js', 'Typescript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'].map(skill => (
                           <span key={skill} className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded-sm font-bold text-slate-700">{skill}</span>
                         ))}
                      </div>
                   </div>
                </div>
              </motion.div>

              {/* Popup / Tooltip Mockup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-border p-5 text-center flex flex-col items-center gap-3 z-10 overflow-hidden shadow-emerald-500/10"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600">
                   <Globe className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="text-xs font-bold mb-1">Set to Public</h4>
                   <p className="text-[9px] text-muted-foreground leading-tight">To share it with others, you need to make it public.</p>
                </div>
                <button className="w-full h-8 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-[10px] font-bold flex items-center justify-center gap-2 transition-all">
                   <Check className="w-3 h-3" />
                   Make Public
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
