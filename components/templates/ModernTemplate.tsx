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

export const ModernTemplate: React.FC<TemplateProps> = ({ resumeInfo, isLoading }) => {
  return (
    <div
      className={cn(
        `w-full h-full p-10 !font-sans
        bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20`
      )}
      style={{
        borderLeft: `16px solid ${resumeInfo?.themeColor || "#10b981"}`,
      }}
    >
      <div className="pl-6">
        <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />
        <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />
        <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />
        <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />
        <SkillPreview isLoading={isLoading} resumeInfo={resumeInfo} />
      </div>
    </div>
  );
};
