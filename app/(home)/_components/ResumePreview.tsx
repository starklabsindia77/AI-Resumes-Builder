"use client";
import React from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { cn } from "@/lib/utils";
import { templateConfigurations } from "@/lib/templates-config";
import { DynamicTemplate } from "@/components/templates/DynamicTemplate";

const ResumePreview = () => {
  const { resumeInfo, isLoading } = useResumeContext();

  const activeTemplateId = resumeInfo?.template || "free-classic";
  
  // Backwards compatibility for the original 3 template IDs
  const legacyMap: Record<string, string> = {
    "classic": "free-classic",
    "modern": "free-modern",
    "minimalist": "free-minimal",
  };
  
  const lookupId = legacyMap[activeTemplateId] || activeTemplateId;
  const activeConfig = templateConfigurations.find(t => t.id === lookupId) || templateConfigurations[0];

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
       <DynamicTemplate 
         config={activeConfig} 
         resumeInfo={resumeInfo} 
         isLoading={isLoading} 
       />
    </div>
  );
};

export default ResumePreview;
