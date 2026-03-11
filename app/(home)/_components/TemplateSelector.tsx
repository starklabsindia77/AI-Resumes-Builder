"use client";

import React, { useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { cn } from "@/lib/utils";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LayoutTemplate, ChevronDown, Lock, Crown, Sparkles } from "lucide-react";
import { templateConfigurations, TemplateConfig } from "@/lib/templates-config";
import { portfolioTemplates, PortfolioTemplateConfig } from "@/lib/portfolio-templates-config";
import useGetSubscription from "@/hooks/use-get-subscription";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, FileText } from "lucide-react";

export const TemplateSelector = () => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();
  const { data: subscription } = useGetSubscription();

  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState<"resume" | "portfolio">("resume");

  const isPro = subscription?.plan === "pro" || subscription?.plan === "enterprise";

  // Backwards compatibility for the original 3 template IDs
  const legacyMap: Record<string, string> = {
    "classic": "free-classic",
    "modern": "free-modern",
    "minimalist": "free-minimal",
  };

  const rawTemplate = resumeInfo?.template || "free-classic";
  const currentResumeTemplate = legacyMap[rawTemplate] || rawTemplate;
  const currentPortfolioTemplate = resumeInfo?.portfolioTemplate || "free-modern";

  const handleTemplateChange = async (templateId: string, isPremium: boolean, type: "resume" | "portfolio") => {
    if (isPremium && !isPro) {
      toast({
        title: "Pro Template",
        description: "This is a premium template. Please upgrade to unlock.",
        variant: "destructive",
      });
      return;
    }

    const currentId = type === "resume" ? currentResumeTemplate : currentPortfolioTemplate;
    if (currentId === templateId) {
      setOpen(false);
      return;
    }

    // Optimistic UI update
    if (resumeInfo) {
      const updatePayload: any = {
        ...resumeInfo,
        title: resumeInfo.title || "Untitled Resume",
      };
      if (type === "resume") updatePayload.template = templateId;
      else updatePayload.portfolioTemplate = templateId;

      onUpdate(updatePayload);
    }

    try {
      const savePayload: any = {
        currentPosition: resumeInfo?.currentPosition || 1,
      };
      if (type === "resume") savePayload.template = templateId;
      else savePayload.portfolioTemplate = templateId;

      await mutateAsync(savePayload);

      toast({
        title: "Template Updated",
        description: `Successfully switched to the new layout.`,
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to update template:", error);
      toast({
        title: "Error",
        description: "Failed to save your template preference.",
        variant: "destructive"
      });
      // Revert optimistic update
      if (resumeInfo) {
        const revertPayload: any = {
          ...resumeInfo,
          title: resumeInfo.title || "Untitled Resume",
        };
        if (type === "resume") revertPayload.template = currentResumeTemplate;
        else revertPayload.portfolioTemplate = currentPortfolioTemplate;
        onUpdate(revertPayload);
      }
    }
  };

  const AbstractPreview = ({ config }: { config: TemplateConfig }) => {
    // A super lightweight visual representation of the config layout
    const { layout, borders, sectionHeadings, primaryColor } = config.styles;
    const themeColor = primaryColor || resumeInfo?.themeColor || "#10b981";

    return (
      <div className="w-full h-full p-2 flex gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity bg-white/50"
        style={{
          borderTop: borders === 'accent-top' ? `4px solid ${themeColor}` : undefined,
          borderLeft: borders === 'accent-left' ? `4px solid ${themeColor}` : undefined,
          border: (borders === 'boxed' || borders === 'thick') ? `2px solid ${themeColor}` : undefined,
        }}>
        {layout === 'single-column' && (
          <div className="w-full flex items-center flex-col gap-1 mt-1">
            <div className="w-1/2 h-2 bg-slate-800 rounded-[1px]" />
            <div className="w-1/3 h-1 bg-slate-400 rounded-[1px]" />
            <div className="w-full flex-1 mt-1 flex flex-col gap-1">
              <div className="w-full h-1.5 bg-slate-200" style={{ backgroundColor: sectionHeadings === 'solid' ? themeColor : undefined }} />
              <div className="w-full h-0.5 bg-slate-300" />
              <div className="w-5/6 h-0.5 bg-slate-200" />
            </div>
          </div>
        )}
        {layout === 'split-left' && (
          <>
            <div className="w-1/3 h-full bg-slate-100 flex flex-col items-center gap-1 p-1 pt-2">
              <div className="w-6 h-6 rounded-full bg-slate-300" />
              <div className="w-full h-1 bg-slate-200" />
            </div>
            <div className="w-2/3 h-full flex flex-col gap-1 p-1">
              <div className="w-3/4 h-2 bg-slate-800 rounded-[1px]" />
              <div className="w-full h-1.5 mt-1 bg-slate-200" style={{ backgroundColor: sectionHeadings === 'solid' ? themeColor : undefined }} />
              <div className="w-full h-0.5 bg-slate-300" />
              <div className="w-5/6 h-0.5 bg-slate-200" />
            </div>
          </>
        )}
        {layout === 'split-right' && (
          <>
            <div className="w-2/3 h-full flex flex-col gap-1 p-1">
              <div className="w-3/4 h-2 bg-slate-800 rounded-[1px]" />
              <div className="w-full h-1.5 mt-1 bg-slate-200" style={{ backgroundColor: sectionHeadings === 'solid' ? themeColor : undefined }} />
              <div className="w-full h-0.5 bg-slate-300" />
              <div className="w-5/6 h-0.5 bg-slate-200" />
            </div>
            <div className="w-1/3 h-full bg-slate-100 flex flex-col items-center gap-1 p-1 pt-2">
              <div className="w-full h-1 bg-slate-200" />
              <div className="w-full h-1 bg-slate-200" />
            </div>
          </>
        )}
      </div>
    );
  };

  const PortfolioAbstractPreview = ({ config }: { config: PortfolioTemplateConfig }) => {
    const { hero, navbar, background, primaryColor } = config.styles;
    const themeColor = primaryColor || "#10b981";

    return (
      <div className="w-full h-full flex flex-col bg-slate-900 overflow-hidden group-hover:scale-105 transition-transform duration-500">
        {/* Browser Top Bar */}
        <div className="w-full h-2 bg-slate-800 flex gap-0.5 px-1 items-center shrink-0">
          <div className="w-[3px] h-[3px] rounded-full bg-red-400" />
          <div className="w-[3px] h-[3px] rounded-full bg-amber-400" />
          <div className="w-[3px] h-[3px] rounded-full bg-emerald-400" />
        </div>

        <div className="flex-1 relative" style={{
          background: background === 'mesh' ? `radial-gradient(circle at 50% 50%, ${themeColor}20, transparent)` :
            background === 'dots' ? 'radial-gradient(#ffffff10 1px, transparent 1px)' : '#0f172a',
          backgroundSize: background === 'dots' ? '10px 10px' : undefined
        }}>
          {/* Navbar mockup */}
          {navbar !== 'hidden' && (
            <div className={cn(
              "absolute top-1 left-0 right-0 h-3 px-2 flex items-center justify-between",
              navbar === 'floating' ? "mx-2 rounded-full border border-white/10 bg-white/5" : "border-b border-white/5 bg-slate-900"
            )}>
              <div className="w-3 h-1 bg-white/20 rounded-full" />
              <div className="w-6 h-1 bg-white/10 rounded-full" />
            </div>
          )}

          {/* Hero mockup */}
          <div className="mt-4 px-3 flex flex-col gap-1.5 h-full">
            {hero === 'split' ? (
              <div className="flex h-12 mt-4">
                <div className="flex-1 flex flex-col gap-1 justify-center">
                  <div className="w-full h-2 bg-white/80 rounded" />
                  <div className="w-2/3 h-1.5 bg-white/40 rounded" />
                </div>
                <div className="w-8 h-full bg-slate-800 rounded ml-2" />
              </div>
            ) : hero === 'minimal' ? (
              <div className="flex flex-col gap-1 justify-center items-start mt-8">
                <div className="w-2/3 h-2.5 bg-white/90 rounded" />
                <div className="w-1/2 h-1.5 bg-white/30 rounded" />
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 justify-center items-center mt-6 text-center">
                <div className="w-4/5 h-3 bg-white/90 rounded" />
                <div className="w-3/5 h-1.5 bg-white/30 rounded" />
                <div className="w-1/4 h-2 mt-2 rounded-full" style={{ backgroundColor: themeColor }} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTemplateGrid = (templates: any[], type: "resume" | "portfolio") => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-1">
      {templates.map((template) => {
        const currentId = type === "resume" ? currentResumeTemplate : currentPortfolioTemplate;
        const isActive = currentId === template.id;
        const isLocked = template.isPremium && !isPro;

        return (
          <div
            key={template.id}
            onClick={() => handleTemplateChange(template.id, template.isPremium, type)}
            className={cn(
              "group relative cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden flex flex-col h-[180px]",
              isActive ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-100 hover:border-slate-300 dark:border-slate-800",
              isLocked && "opacity-80 grayscale hover:grayscale-0"
            )}
          >
            <div className="h-[110px] w-full shrink-0 bg-slate-50 relative pointer-events-none overflow-hidden">
              {type === 'resume' ? <AbstractPreview config={template} /> : <PortfolioAbstractPreview config={template} />}
              {isLocked && (
                <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="bg-white/90 p-2 rounded-full shadow-lg">
                    <Lock size="16px" className="text-slate-700" />
                  </div>
                </div>
              )}
              {isActive && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center z-10">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                </div>
              )}
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 flex-1 flex flex-col justify-between border-t border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                {template.name}
                {template.isPremium && <Crown size="10px" className="text-amber-500" />}
              </h3>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{template.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={resumeInfo?.status === "archived" || isPending ? true : false}
          variant="secondary"
          className="bg-white border gap-1 dark:bg-gray-800 !p-2 lg:w-auto lg:p-4"
        >
          <div className="flex items-center gap-1">
            <LayoutTemplate size="17px" />
            <span className="hidden lg:flex">Templates</span>
          </div>
          <ChevronDown size="14px" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-6 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-xl border-slate-200/50">
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="text-emerald-500" />
            Template Marketplace
          </DialogTitle>
          <p className="text-muted-foreground text-sm">Choose from 50 scientifically-designed layouts. Your content adapts instantly.</p>
        </DialogHeader>

        <div className="flex-1 overflow-hidden mt-4">
          <Tabs defaultValue="resume-pdf" value={mode} onValueChange={(v) => setMode(v as any)} className="w-full h-full flex flex-col">
            <TabsList className="w-full justify-start border-b border-transparent rounded-none bg-transparent p-0 mb-4 gap-6 shrink-0 h-auto">
              <TabsTrigger value="resume" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none px-2 py-2 font-bold text-slate-600 data-[state=active]:text-emerald-600 flex items-center gap-2">
                <FileText size="16px" />
                Resume PDFs
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none px-2 py-2 font-bold text-slate-600 data-[state=active]:text-emerald-600 flex items-center gap-2">
                <Globe size="16px" />
                Personal Website
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resume" className="flex-1 overflow-hidden">
              <Tabs defaultValue="all" className="w-full h-full flex flex-col">
                <TabsList className="w-full justify-start h-8 bg-transparent p-0 mb-4 gap-4 shrink-0">
                  <TabsTrigger value="all" className="text-[10px] uppercase tracking-wider font-bold h-7 px-3 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 rounded-full">All</TabsTrigger>
                  <TabsTrigger value="free" className="text-[10px] uppercase tracking-wider font-bold h-7 px-3 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 rounded-full">Free</TabsTrigger>
                  <TabsTrigger value="premium" className="text-[10px] uppercase tracking-wider font-bold h-7 px-3 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 rounded-full">Premium</TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto pr-2 pb-10">
                  <TabsContent value="all" className="mt-0">
                    {renderTemplateGrid(templateConfigurations, "resume")}
                  </TabsContent>
                  <TabsContent value="free" className="mt-0">
                    {renderTemplateGrid(templateConfigurations.filter(t => !t.isPremium), "resume")}
                  </TabsContent>
                  <TabsContent value="premium" className="mt-0">
                    {renderTemplateGrid(templateConfigurations.filter(t => t.isPremium), "resume")}
                  </TabsContent>
                </div>
              </Tabs>
            </TabsContent>

            <TabsContent value="portfolio" className="flex-1 overflow-hidden">
              <Tabs defaultValue="all" className="w-full h-full flex flex-col">
                <TabsList className="w-full justify-start h-8 bg-transparent p-0 mb-4 gap-4 shrink-0">
                  <TabsTrigger value="all" className="text-[10px] uppercase tracking-wider font-bold h-7 px-3 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 rounded-full">All Designs</TabsTrigger>
                  <TabsTrigger value="tech" className="text-[10px] uppercase tracking-wider font-bold h-7 px-3 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 rounded-full">Tech</TabsTrigger>
                  <TabsTrigger value="creative" className="text-[10px] uppercase tracking-wider font-bold h-7 px-3 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 rounded-full">Creative</TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto pr-2 pb-10">
                  <TabsContent value="all" className="mt-0">
                    {renderTemplateGrid(portfolioTemplates, "portfolio")}
                  </TabsContent>
                  <TabsContent value="tech" className="mt-0">
                    {renderTemplateGrid(portfolioTemplates.filter(t => t.category === 'Tech'), "portfolio")}
                  </TabsContent>
                  <TabsContent value="creative" className="mt-0">
                    {renderTemplateGrid(portfolioTemplates.filter(t => t.category === 'Creative'), "portfolio")}
                  </TabsContent>
                </div>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
