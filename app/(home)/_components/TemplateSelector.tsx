"use client";

import React from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { cn } from "@/lib/utils";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutTemplate, ChevronDown } from "lucide-react";

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional and highly structured.",
    previewStyle: "bg-slate-50 border-slate-200",
    activeStyle: "border-indigo-500 ring-2 ring-indigo-500/20",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Sleek with bold accents and clean lines.",
    previewStyle: "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200",
    activeStyle: "border-emerald-500 ring-2 ring-emerald-500/20",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Elegant typography and generous whitespace.",
    previewStyle: "bg-white border-slate-100 shadow-sm",
    activeStyle: "border-slate-800 ring-2 ring-slate-800/20",
  },
];

export const TemplateSelector = () => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync } = useUpdateDocument();

  const currentTemplate = resumeInfo?.template || "classic";

  const handleTemplateChange = async (templateId: string) => {
    if (currentTemplate === templateId) return;

    // Optimistic UI update
    if (resumeInfo) {
      onUpdate({
        ...resumeInfo,
        title: resumeInfo.title || "Untitled Resume",
        template: templateId,
      });
    }

    try {
      await mutateAsync({
        currentPosition: resumeInfo?.currentPosition || 1,
        // The mutateAsync payload needs to match the updateCombinedSchema structure,
        // but note that the current useUpdateDocument hook might not fully support 
        // updating just the template out of the box without modifying its args.
        // We will send it alongside currentPosition as a top-level property as defined in schema.
        template: templateId,
      } as any); // Casting as any temporarily if types aren't fully synced
      
      toast({
        title: "Template Updated",
        description: `Successfully switched to the ${templateId} template.`,
      });
    } catch (error) {
       console.error("Failed to update template:", error);
       toast({
         title: "Error",
         description: "Failed to save your template preference.",
         variant: "destructive"
       });
       // Revert optimistic update
       if (resumeInfo) {
         onUpdate({
          ...resumeInfo,
          title: resumeInfo.title || "Untitled Resume",
          template: currentTemplate,
        });
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={resumeInfo?.status === "archived" ? true : false}
          variant="secondary"
          className="bg-white border gap-1 dark:bg-gray-800 !p-2 lg:w-auto lg:p-4"
        >
          <div className="flex items-center gap-1">
            <LayoutTemplate size="17px" />
            <span className="hidden lg:flex">Layout</span>
          </div>
          <ChevronDown size="14px" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[340px] bg-background">
        <h2 className="mb-3 text-sm font-bold">Select Template</h2>
        <div className="grid grid-cols-1 gap-3">
          {templates.map((template) => {
            const isActive = currentTemplate === template.id;
            
            return (
              <div
                key={template.id}
                onClick={() => handleTemplateChange(template.id)}
                className={cn(
                  "group relative cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden flex",
                  isActive ? template.activeStyle : "border-slate-100 hover:border-slate-300 dark:border-slate-800",
                  template.previewStyle
                )}
              >
                {/* Visual Preview Abstraction */}
                <div className="w-20 shrink-0 h-full p-2 flex flex-col gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity border-r border-black/5">
                   {template.id === 'classic' && (
                     <>
                      <div className="w-1/2 h-2.5 bg-indigo-600/20 rounded-[2px]" />
                      <div className="w-full h-1 bg-slate-300 rounded-[1px]" />
                      <div className="w-3/4 h-1 bg-slate-200 rounded-[1px]" />
                     </>
                   )}
                   {template.id === 'modern' && (
                     <div className="flex gap-1.5 h-full">
                        <div className="w-1/3 h-full bg-emerald-600/10 rounded-[2px]" />
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="w-3/4 h-2 bg-slate-400 rounded-[1px]" />
                          <div className="w-full h-1 bg-slate-300 rounded-[1px]" />
                          <div className="w-5/6 h-1 bg-slate-200 rounded-[1px]" />
                        </div>
                     </div>
                   )}
                   {template.id === 'minimalist' && (
                     <div className="flex flex-col items-center gap-1.5 pt-1">
                        <div className="w-1/2 h-2 bg-slate-800 rounded-[1px]" />
                        <div className="w-10 h-[1px] bg-slate-300" />
                        <div className="w-2/3 h-1 bg-slate-200 rounded-[1px] mt-1" />
                     </div>
                   )}
                </div>
                
                <div className="p-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex-1">
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between">
                     {template.name}
                     {isActive && (
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                     )}
                  </h3>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{template.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
