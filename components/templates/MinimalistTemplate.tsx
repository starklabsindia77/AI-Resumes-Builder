"use client";
import React from "react";
import { cn } from "@/lib/utils";
import PersonalInfo from "@/components/preview/PersonalInfo";
import SummaryPreview from "@/components/preview/SummaryPreview";
import ExperiencePreview from "@/components/preview/ExperiencePreview";
import EducationPreview from "@/components/preview/EducationPreview";
import SkillPreview from "@/components/preview/SkillPreview";
import { ResumeDataType } from "@/types/resume.type";

interface TemplateProps {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ resumeInfo, isLoading }) => {
  return (
    <div
      className={cn(
        `w-full h-full p-12 !font-serif text-slate-800
        bg-[#fafafa] dark:bg-slate-950`
      )}
      style={{
        borderTop: `2px solid ${resumeInfo?.themeColor || "#333"}`,
      }}
    >
      <div className="max-w-3xl mx-auto space-y-4">
        <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />
        
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
           <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />
        </div>
        
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />
        </div>
        
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />
        </div>
        
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <SkillPreview isLoading={isLoading} resumeInfo={resumeInfo} />
        </div>
      </div>
    </div>
  );
};
