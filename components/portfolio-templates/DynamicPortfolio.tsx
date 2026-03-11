"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ResumeDataType } from "@/types/resume.type";
import { PortfolioTemplateConfig } from "@/lib/portfolio-templates-config";
import { Github, Linkedin, Mail, MapPin, Phone, Briefcase, GraduationCap, Code } from "lucide-react";

interface DynamicPortfolioProps {
  resumeInfo: ResumeDataType | undefined;
  config: PortfolioTemplateConfig;
}

export const DynamicPortfolio: React.FC<DynamicPortfolioProps> = ({ resumeInfo, config }) => {
  const { styles } = config;
  const themeColor = styles.primaryColor || resumeInfo?.themeColor || "#10b981";

  if (!resumeInfo) return null;

  const { personalInfo, summary, experiences, educations, skills } = resumeInfo;

  // Typography Configuration
  const getTypographyClass = () => {
    switch (styles.typography) {
      case "sans": return "font-sans";
      case "serif": return "font-serif";
      case "mono": return "font-mono tracking-tight";
      case "modern": return "font-sans tracking-wide";
      default: return "font-sans";
    }
  };

  // Background Styles
  const getBackgroundClass = () => {
    switch (styles.background) {
      case "dots": return "bg-slate-50 dark:bg-slate-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]";
      case "mesh": return "bg-slate-50 dark:bg-slate-950 liquid-mesh";
      case "grid": return "bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]";
      case "solid":
      default: return "bg-white dark:bg-slate-950";
    }
  };

  // 1. HERO SECTION
  const renderHero = () => {
    const fullName = `${personalInfo?.firstName || ""} ${personalInfo?.lastName || ""}`;
    const title = personalInfo?.jobTitle || "";

    if (styles.hero === "split") {
      return (
        <section className="min-h-[80vh] flex flex-col md:flex-row items-center border-b border-slate-200 dark:border-slate-800">
          <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-slate-900 dark:text-white" style={{ color: styles.typography === 'serif' ? themeColor : undefined }}>
              {fullName}
            </h1>
            <h2 className="text-2xl text-slate-600 dark:text-slate-400 mb-6 font-medium">
              {title}
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mb-8 leading-relaxed">
              {summary}
            </p>
            <div className="flex gap-4">
              {personalInfo?.email && <a href={`mailto:${personalInfo.email}`} className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-110 transition-transform"><Mail size="20px"/></a>}
              {personalInfo?.phone && <a href={`tel:${personalInfo.phone}`} className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-110 transition-transform"><Phone size="20px"/></a>}
            </div>
          </div>
          <div className="w-full md:w-1/2 min-h-[400px] h-full" style={{ backgroundColor: `${themeColor}20` }}>
            {/* Visual Abstract for Split */}
          </div>
        </section>
      );
    }

    if (styles.hero === "gradient") {
       return (
          <section className="min-h-[80vh] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, #0f172a)` }}>
             <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight drop-shadow-lg">{fullName}</h1>
             <h2 className="text-2xl md:text-4xl font-semibold opacity-90 mb-8">{title}</h2>
             <p className="max-w-2xl text-lg md:text-xl opacity-80 mb-12">{summary}</p>
          </section>
       );
    }

    if (styles.hero === "minimal") {
       return (
          <section className="py-32 px-8 max-w-4xl border-b border-slate-200 dark:border-slate-800">
             <h1 className="text-4xl md:text-6xl font-light mb-8 text-slate-900 dark:text-white">{fullName}.<br/><span className="text-slate-400">{title}.</span></h1>
             <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">{summary}</p>
          </section>
       );
    }

    // default center
    return (
      <section className="py-32 flex flex-col items-center justify-center text-center px-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white">{fullName}</h1>
        <h2 className="text-xl md:text-2xl text-slate-500 mb-8 font-medium tracking-wide uppercase">{title}</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">{summary}</p>
      </section>
    );
  };

  // 2. EXPERIENCE SECTION
  const renderExperience = () => {
    if (!experiences || experiences.length === 0) return null;

    if (styles.experience === "grid") {
       return (
          <section className="py-24 px-8 max-w-7xl mx-auto">
             <div className="flex items-center gap-4 mb-12">
                <Briefcase size="32px" style={{ color: themeColor }} />
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Experience</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {experiences.map((exp, idx) => (
                   <div key={idx} className="p-8 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all hover:-translate-y-2 hover:shadow-xl" style={{ borderTop: `4px solid ${themeColor}` }}>
                      <span className="text-sm font-semibold tracking-wider text-slate-500 mb-2 block">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{exp.title}</h4>
                      <h5 className="text-md font-medium mb-4" style={{ color: themeColor }}>{exp.companyName}</h5>
                      <div className="text-sm text-slate-600 dark:text-slate-400 prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: exp.workSummary || "" }} />
                   </div>
                ))}
             </div>
          </section>
       );
    }

    if (styles.experience === "timeline") {
       return (
          <section className="py-24 px-8 max-w-4xl mx-auto">
             <div className="flex items-center gap-4 mb-16">
                <Briefcase size="32px" style={{ color: themeColor }} />
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Work Journey</h3>
             </div>
             <div className="space-y-12 border-l-2 ml-4 pl-8" style={{ borderColor: `${themeColor}40` }}>
                {experiences.map((exp, idx) => (
                   <div key={idx} className="relative">
                      <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-950" style={{ backgroundColor: themeColor }} />
                      <span className="text-sm font-bold tracking-widest uppercase mb-2 block" style={{ color: themeColor }}>
                         {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                      </span>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{exp.title}</h4>
                      <h5 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-4">{exp.companyName}</h5>
                      <div className="text-base text-slate-500 dark:text-slate-400 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: exp.workSummary || "" }} />
                   </div>
                ))}
             </div>
          </section>
       );
    }

    // default list
    return (
       <section className="py-24 px-8 max-w-4xl mx-auto border-t border-slate-200 dark:border-slate-800">
         <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Experience</h3>
         <div className="space-y-16">
            {experiences.map((exp, idx) => (
               <div key={idx} className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 shrink-0">
                     <h4 className="text-xl font-bold text-slate-900 dark:text-white">{exp.title}</h4>
                     <h5 className="text-md font-medium text-slate-600 dark:text-slate-400">{exp.companyName}</h5>
                     <span className="text-sm text-slate-500 mt-2 block">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="md:w-2/3">
                     <div className="text-base text-slate-600 dark:text-slate-400 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: exp.workSummary || "" }} />
                  </div>
               </div>
            ))}
         </div>
       </section>
    );
  };

  // 3. SKILLS SECTION
  const renderSkills = () => {
     if (!skills || skills.length === 0) return null;
     return (
        <section className="py-24 px-8 max-w-7xl mx-auto text-center border-t border-slate-200 dark:border-slate-800">
           <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Core Competencies</h3>
           <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, idx) => (
                 <div key={idx} className="px-6 py-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium tracking-wide shadow-sm hover:scale-105 transition-transform">
                    {skill.name}
                 </div>
              ))}
           </div>
        </section>
     );
  };

  // 4. NAVBAR 
  const renderNavbar = () => {
     if (styles.navbar === "hidden") return null;

     const fullName = `${personalInfo?.firstName || ""} ${personalInfo?.lastName || ""}`.trim();
     const initials = fullName ? fullName.split(' ').map(n => n[0]).join('') : 'P';

     if (styles.navbar === "floating") {
        return (
           <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
              <nav className="pointer-events-auto flex items-center gap-8 px-8 py-4 rounded-full glass-card bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-2xl">
                 <div className="font-black text-xl tracking-tighter" style={{ color: themeColor }}>{initials}</div>
                 <div className="w-px h-6 bg-slate-300 dark:bg-slate-700" />
                 <a href={`mailto:${personalInfo?.email}`} className="text-sm font-semibold hover:opacity-70 transition-opacity">Contact</a>
              </nav>
           </div>
        );
     }

     // default sticky
     return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-8 py-4 flex justify-between items-center">
           <div className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">{fullName || "Portfolio"}</div>
           <a href={`mailto:${personalInfo?.email}`} className="text-sm font-semibold px-4 py-2 rounded-full text-white" style={{ backgroundColor: themeColor }}>Get in touch</a>
        </nav>
     );
  };

  return (
    <div className={cn("min-h-screen text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30", getTypographyClass(), getBackgroundClass())}>
      {renderNavbar()}
      {renderHero()}
      {renderSkills()}
      {renderExperience()}
      {/* Education left out for brevity, can be added similarly */}
      
      <footer className="py-12 text-center text-slate-500 border-t border-slate-200 dark:border-slate-800">
         <p>© {new Date().getFullYear()} {personalInfo?.firstName} {personalInfo?.lastName}. Built with SmartCraft.</p>
      </footer>
    </div>
  );
};
