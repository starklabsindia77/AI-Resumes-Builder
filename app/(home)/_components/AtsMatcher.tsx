"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Sparkles, Target, AlertCircle, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { AtsGauge } from "@/components/AtsGauge";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface AtsMatcherProps {
  resumeData: any;
}

interface MatchResult {
  matchScore: number;
  matchingKeywords: string[];
  missingKeywords: string[];
  improvementTips: string[];
  impactfulRevisions: { original: string; suggested: string; reason: string }[];
}

export const AtsMatcher = ({ resumeData }: AtsMatcherProps) => {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Input Required",
        description: "Please paste a job description first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/ai/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeData, jobDescription }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        toast({
          title: "Analysis Complete",
          description: "Your resume has been matched against the JD.",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: data.message || "Failed to analyze",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Match Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong during analysis.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      <Card className="glass-card overflow-hidden !border-none shadow-2xl">
        <CardHeader className="bg-emerald-600/5 border-b border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black">ATS Matcher</CardTitle>
              <CardDescription className="font-medium text-slate-500">Compare your resume against a specific job description</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Paste Job Description
            </label>
            <Textarea
              placeholder="Paste the full job description here for the most accurate analysis..."
              className="min-h-[200px] rounded-2xl border-emerald-500/10 bg-emerald-500/[0.02] focus-visible:ring-emerald-500/30 transition-all resize-none text-base md:text-lg p-6"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={loading}
            className="w-full h-14 text-lg font-bold rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Analyze Match Score
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Main Score Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1 glass-card shadow-xl border-emerald-500/20">
                <CardContent className="p-8">
                  <AtsGauge score={result.matchScore} label="Match Score" />
                </CardContent>
              </Card>

              <Card className="md:col-span-2 glass-card shadow-xl border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Keyword Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Matching Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {result.matchingKeywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/10">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Missing Critical Keywords</h5>
                    <div className="flex flex-wrap gap-2">
                      {result.missingKeywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1.5 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold border border-red-500/10">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Improvement Tips */}
            <Card className="glass-card shadow-xl border-emerald-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  Optimization Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {result.improvementTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/20 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                        <ChevronRight className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-sm md:text-base font-medium text-slate-700 dark:text-slate-300">
                        {tip}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Impactful Revisions */}
            <Card className="glass-card shadow-xl border-emerald-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  Suggested AI Rewrites
                </CardTitle>
                <CardDescription>Specifically optimized to include missing keywords from the JD</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {result.impactfulRevisions.map((rev, i) => (
                  <div key={i} className="space-y-3 p-6 rounded-3xl bg-emerald-500/[0.02] border border-emerald-500/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                       <Zap className="w-12 h-12 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Version</span>
                      <p className="text-sm italic text-slate-500 mt-1 line-through opacity-60">{rev.original}</p>
                    </div>
                    <div className="pt-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">SmartCraft Optimized</span>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-relaxed">{rev.suggested}</p>
                    </div>
                    <div className="mt-2 text-[10px] font-bold py-1 px-3 bg-white dark:bg-slate-800 rounded-full inline-block border border-border shadow-sm">
                       💡 {rev.reason}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
