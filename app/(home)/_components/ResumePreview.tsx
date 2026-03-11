"use client";
import React from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { cn } from "@/lib/utils";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate";

const ResumePreview = () => {
  const { resumeInfo, isLoading } = useResumeContext();

  const activeTemplate = resumeInfo?.template || "classic";

  return (
    <div
      id="resume-preview-id"
      className={cn(`
        glass-card squircle w-full flex-[1.02]
        h-full overflow-hidden
        bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm
        shadow-2xl shadow-black/10
        `)}
    >
       {activeTemplate === 'classic' && <ClassicTemplate resumeInfo={resumeInfo} isLoading={isLoading} />}
       {activeTemplate === 'modern' && <ModernTemplate resumeInfo={resumeInfo} isLoading={isLoading} />}
       {activeTemplate === 'minimalist' && <MinimalistTemplate resumeInfo={resumeInfo} isLoading={isLoading} />}
    </div>
  );
};

export default ResumePreview;
