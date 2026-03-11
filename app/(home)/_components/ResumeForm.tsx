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
import { AtsMatcher } from "./AtsMatcher";
import { motion } from "framer-motion";

const ResumeForm = () => {
  const { resumeInfo } = useResumeContext();
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const { data: subscription } = useGetSubscription();
  const isPro = subscription?.plan === "pro" || subscription?.plan === "enterprise";


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
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-bold text-lg">Advanced ATS Matcher</h2>
                {!isPro && (
                  <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    PRO
                  </span>
                )}
              </div>
              
              {isPro ? (
                <AtsMatcher resumeData={resumeInfo} />
              ) : (
                <div className="p-8 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 text-center">
                  <Lock className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Upgrade to Unlock ATS Matching</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Analyze your resume against specific job descriptions to get match scores and optimization tips.
                  </p>
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
