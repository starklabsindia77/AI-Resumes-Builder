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

export const ClassicTemplate: React.FC<TemplateProps> = ({ resumeInfo, isLoading }) => {
  return (
    <div
      className={cn(
        `w-full h-full p-10 !font-open-sans
        bg-white dark:bg-slate-900`
      )}
      style={{
        borderTop: `13px solid ${resumeInfo?.themeColor || "#7c3aed"}`,
      }}
    >
      <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />
      <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />
      <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />
      <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />
      <SkillPreview isLoading={isLoading} resumeInfo={resumeInfo} />
    </div>
  );
};
