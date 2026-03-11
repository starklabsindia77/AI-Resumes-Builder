"use client";
import React from "react";
import { cn } from "@/lib/utils";
import PersonalInfo from "@/components/preview/PersonalInfo";
import SummaryPreview from "@/components/preview/SummaryPreview";
import ExperiencePreview from "@/components/preview/ExperiencePreview";
import EducationPreview from "@/components/preview/EducationPreview";
import SkillPreview from "@/components/preview/SkillPreview";
import { ResumeDataType } from "@/types/resume.type";
import { TemplateConfig } from "@/lib/templates-config";

interface DynamicTemplateProps {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
  config: TemplateConfig;
}

export const DynamicTemplate: React.FC<DynamicTemplateProps> = ({ resumeInfo, isLoading, config }) => {
  const { styles } = config;
  
  // Base theme color (config overrides user choice if specifically set)
  const themeColor = styles.primaryColor || resumeInfo?.themeColor || "#7c3aed";

  // Typography Mapping
  const getTypographyClass = () => {
    switch(styles.typography) {
      case "classic": return "font-serif text-slate-800";
      case "modern": return "font-sans text-slate-900";
      case "minimalist": return "font-sans font-light text-slate-700 tracking-wide";
      case "serif": return "font-serif text-slate-900";
      case "mono": return "font-mono text-slate-800 text-sm";
      case "elegant": return "font-serif tracking-widest text-slate-900";
      default: return "font-sans";
    }
  };

  // Border & Accent Mapping  
  const getBorderStyle = () => {
    switch(styles.borders) {
      case "accent-top": return { borderTop: `12px solid ${themeColor}` };
      case "accent-left": return { borderLeft: `16px solid ${themeColor}` };
      case "accent-bottom": return { borderBottom: `12px solid ${themeColor}` };
      case "thick": return { border: `8px solid ${themeColor}` };
      case "thin": return { border: `1px solid ${themeColor}` };
      case "boxed": return { border: `4px solid ${themeColor}`, borderRadius: "8px" };
      case "none": default: return {};
    }
  };

  // Spacing Mapping
  const getSpacingClass = () => {
    switch(styles.spacing) {
      case "compact": return "p-6 gap-2";
      case "spacious": return "p-14 gap-8";
      case "normal": default: return "p-10 gap-5";
    }
  };

  // Shared sub-component props — the key change!
  const sharedProps = { resumeInfo, isLoading, config };

  const renderContent = () => (
    <div className={cn("flex flex-col w-full h-full", getSpacingClass())}>
       <PersonalInfo {...sharedProps} />
       <SummaryPreview {...sharedProps} />
       <ExperiencePreview {...sharedProps} />
       <EducationPreview {...sharedProps} />
       <SkillPreview {...sharedProps} />
    </div>
  );

  return (
    <div
      className={cn(
        "w-full h-full bg-white dark:bg-slate-900 overflow-hidden",
        getTypographyClass()
      )}
      style={{ ...getBorderStyle() }}
    >
      {styles.layout === "single-column" && renderContent()}
      
      {styles.layout === "split-left" && (
        <div className="flex w-full h-full">
           <div className="w-1/3 h-full border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6" style={{ backgroundColor: `${themeColor}08` }}>
              <PersonalInfo {...sharedProps} />
              <SkillPreview {...sharedProps} />
           </div>
           <div className="w-2/3 h-full p-6 flex flex-col gap-6 items-start text-left">
              <SummaryPreview {...sharedProps} />
              <ExperiencePreview {...sharedProps} />
              <EducationPreview {...sharedProps} />
           </div>
        </div>
      )}

      {styles.layout === "split-right" && (
         <div className="flex w-full h-full">
            <div className="w-2/3 h-full p-6 flex flex-col gap-6">
               <PersonalInfo {...sharedProps} />
               <SummaryPreview {...sharedProps} />
               <ExperiencePreview {...sharedProps} />
               <EducationPreview {...sharedProps} />
            </div>
            <div className="w-1/3 h-full border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6" style={{ backgroundColor: `${themeColor}08` }}>
               <SkillPreview {...sharedProps} />
            </div>
         </div>
      )}
    </div>
  );
};
