"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import { generateThumbnail } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";
import { Loader, Sparkles } from "lucide-react";
import React, { useCallback, useState } from "react";
import useGetAiSuggestions from "@/features/ai/use-get-ai-suggestions";

const SummaryForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();
  const { mutate: suggest, isPending: loading } = useGetAiSuggestions();

  const [aiSuggestions, setAiSuggestions] = useState<string[] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    const resumeDataInfo = resumeInfo as ResumeDataType;
    const updatedInfo = {
      ...resumeDataInfo,
      summary: value,
    };
    onUpdate(updatedInfo);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!resumeInfo) return;
      
      const thumbnail = await generateThumbnail();
      const currentNo = resumeInfo?.currentPosition
        ? resumeInfo?.currentPosition + 1
        : 1;

      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail: thumbnail,
          summary: resumeInfo?.summary,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Summary updated successfully",
            });
            handleNext();
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update summary",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo, mutateAsync, handleNext]
  );

  const GenerateSummaryFromAI = () => {
    const jobTitle = resumeInfo?.personalInfo?.jobTitle;
    if (!jobTitle) {
      toast({
        title: "Missing Job Title",
        description: "Please enter a job title in Personal Information first.",
        variant: "destructive"
      });
      return;
    }
    
    suggest({
      type: "summary",
      context: jobTitle
    }, {
      onSuccess: (response: any) => {
        if (response.success && response.data) {
          setAiSuggestions(response.data);
        }
      }
    });
  };

  const handleSelect = useCallback(
    (summary: string) => {
      if (!resumeInfo) return;
      const resumeDataInfo = resumeInfo as ResumeDataType;
      const updatedInfo = {
        ...resumeDataInfo,
        summary: summary,
      };
      onUpdate(updatedInfo);
      setAiSuggestions(null);
    },
    [onUpdate, resumeInfo]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Summary</h2>
        <p className="text-sm text-muted-foreground">Craft a professional summary for your resume</p>
      </div>
      <div className="mt-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-end justify-between">
            <Label>Add Summary</Label>
            <Button
              variant="outline"
              type="button"
              className="gap-1 border-purple-500/50 hover:bg-purple-50 dark:hover:bg-purple-950/20 glass-card squircle"
              disabled={loading || isPending}
              onClick={() => GenerateSummaryFromAI()}
            >
              <Sparkles size="15px" className="text-purple-500" />
              Generate with AI
            </Button>
          </div>
          <Textarea
            className="mt-4 min-h-36 glass-card squircle bg-transparent"
            required
            value={resumeInfo?.summary || ""}
            onChange={handleChange}
            placeholder="Write your summary or use AI to generate suggestions..."
          />

          {loading && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
              <Loader className="animate-spin w-4 h-4 text-purple-500" />
              Crafting premium summaries...
            </div>
          )}

          {aiSuggestions && (
            <div className="space-y-4 mt-8">
              <h5 className="font-bold text-[10px] uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-mono">
                AI Suggestions
              </h5>
              {aiSuggestions.map((summary, index) => (
                <Card
                  role="button"
                  key={index}
                  className="glass-card squircle hover:bg-purple-500/5 transition-all cursor-pointer border-purple-500/20 active:scale-[0.99]"
                  onClick={() => handleSelect(summary)}
                >
                  <CardContent className="p-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {summary}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Button
            className="mt-8 bg-emerald-600 hover:bg-emerald-700 font-bold px-8 shadow-lg shadow-emerald-500/20"
            type="submit"
            disabled={isPending || loading || resumeInfo?.status === "archived"}
          >
            {isPending && <Loader size="15px" className="animate-spin mr-2" />}
            Save & Next
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SummaryForm;
