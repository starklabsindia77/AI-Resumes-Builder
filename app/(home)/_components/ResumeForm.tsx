"use client";
import React, { useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Lock, Loader, Sparkles, Check } from "lucide-react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import useGetSubscription from "@/hooks/use-get-subscription";
import { Textarea } from "@/components/ui/textarea";
import { AtsGauge } from "@/components/AtsGauge";
import useAnalyzeResume from "@/features/ai/use-analyze-resume";
import { motion } from "framer-motion";

const ResumeForm = () => {
  const { resumeInfo } = useResumeContext();
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const { data: subscription } = useGetSubscription();
  const isPro = subscription?.plan === "pro" || subscription?.plan === "enterprise";

  const [jobDescription, setJobDescription] = useState("");
  const { mutate: analyze, isPending: analyzing, data: analysisResult } = useAnalyzeResume();

  const onAnalyze = () => {
    analyze({
      resumeData: resumeInfo,
      jobDescription
    });
  };

  const handleNext = () => {
    const newIndex = activeFormIndex + 1;
    setActiveFormIndex(newIndex);
  };
  return (
    <div
      className="flex-1 w-full lg:sticky
  lg:top-16
  "
    >
      <div
        className="glass-card squircle overflow-hidden
        bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm
        "
      >
        <div
          className="
        flex items-center gap-1
        px-4 justify-end
        border-b border-white/20 dark:border-slate-800/50 py-3 min-h-12
        "
        >
          {activeFormIndex > 1 && (
            <Button
              variant="outline"
              size="default"
              className="!px-2 !py-1 !h-auto"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft size="16px" />
              Previous
            </Button>
          )}

          <Button
            variant="outline"
            size="default"
            className="!px-2 !py-1 !h-auto"
            disabled={
              activeFormIndex === 7 || resumeInfo?.status === "archived"
                ? true
                : false
            }
            onClick={handleNext}
          >
            Next
            <ArrowRight size="16px" />
          </Button>
        </div>
        <div className="px-5 py-3 pb-5">
          {/* {PersonalInfo Form} */}
          {activeFormIndex === 1 && (
            <PersonalInfoForm handleNext={handleNext} />
          )}

          {activeFormIndex === 2 && <SummaryForm handleNext={handleNext} />}

          {/* {Professional Exp.} */}
          {activeFormIndex === 3 && <ExperienceForm handleNext={handleNext} />}

          {/* {Eduncational Info} */}
          {activeFormIndex === 4 && <EducationForm handleNext={handleNext} />}

          {/* {Skills} */}
          {activeFormIndex === 5 && <SkillsForm />}

          {/* {ATS Optimizer} */}
          {activeFormIndex === 6 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg">ATS Optimizer</h2>
                {!isPro && <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>}
              </div>
              {isPro ? (
                <div className="space-y-6">
                  <div className="p-4 bg-white/40 dark:bg-slate-900/40 rounded-xl border border-white/20">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                      Target Job Description
                    </label>
                    <Textarea 
                      placeholder="Paste the job description here for precision matching..."
                      className="min-h-[150px] bg-transparent border-none focus-visible:ring-0 p-0 resize-none text-sm"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <div className="flex justify-end mt-4">
                      <Button 
                        className="bg-emerald-600 hover:bg-emerald-700 font-bold px-6"
                        onClick={onAnalyze}
                        disabled={analyzing || !jobDescription}
                      >
                        {analyzing ? <Loader className="animate-spin mr-2" /> : <Sparkles className="mr-2 w-4 h-4" />}
                        {analyzing ? "Analyzing Content..." : "Run AI Optimizer"}
                      </Button>
                    </div>
                  </div>

                  {analysisResult?.success && analysisResult.data && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col md:flex-row items-center gap-8 p-6 glass-card squircle">
                         <AtsGauge score={analysisResult.data.score} label="ATS Score" />
                         <div className="flex-1 space-y-2">
                            <h4 className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-xs tracking-widest">Match Summary</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {analysisResult.data.summary}
                            </p>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 glass-card squircle bg-amber-500/5 border-amber-500/10">
                           <h4 className="font-bold text-amber-600 dark:text-amber-400 text-xs uppercase tracking-widest mb-3">Missing Keywords</h4>
                           <div className="flex flex-wrap gap-2">
                              {analysisResult.data.missingKeywords?.map((kw: string, i: number) => (
                                <span key={i} className="px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md text-[10px] font-bold">
                                  {kw}
                                </span>
                              ))}
                           </div>
                        </div>
                        <div className="p-5 glass-card squircle bg-emerald-500/5 border-emerald-500/10">
                           <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-xs uppercase tracking-widest mb-3">Improvement Tips</h4>
                           <ul className="space-y-2">
                              {analysisResult.data.improvementTips?.slice(0, 3).map((tip: string, i: number) => (
                                <li key={i} className="text-[11px] text-muted-foreground flex items-start gap-2">
                                  <Check className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                                  {tip}
                                </li>
                              ))}
                           </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="p-8 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 text-center">
                  <Lock className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Upgrade to Unlock ATS Scoring</h3>
                  <p className="text-sm text-muted-foreground mb-6">Get detailed keyword suggestions and match scores for your target roles.</p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 font-bold" asChild>
                    <a href="/pricing">Upgrade for ₹99</a>
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* {Shadow Resumes} */}
          {activeFormIndex === 7 && (
            <div className="space-y-4">
               <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg">Shadow Resumes</h2>
                {!isPro && <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>}
              </div>
              {isPro ? (
                <div className="p-8 border-2 border-dashed rounded-xl text-center">
                  <p className="text-muted-foreground">Generate role-specific versions of this resume (e.g., Frontend, Fullstack).</p>
                  <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Generate Shadow Copy</Button>
                </div>
              ) : (
                <div className="p-8 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 text-center">
                  <Lock className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">One Profile, Multiple Roles</h3>
                  <p className="text-sm text-muted-foreground mb-6">Upgrade to create "Shadow" versions of your resume tailored for different job titles.</p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 font-bold" asChild>
                    <a href="/pricing">Upgrade for ₹99</a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
