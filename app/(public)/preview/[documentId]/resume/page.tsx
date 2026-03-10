"use client";
import React from "react";
import { useParams } from "next/navigation";
import useGetDocument from "@/features/document/use-get-document-by-id";
import { ResumeDataType } from "@/types/resume.type";
import Error from "../../../_components/Error";
import PreviewResume from "../../../_components/PreviewResume";
import { Button } from "@/components/ui/button";
import { Download, Share2, User } from "lucide-react";
import Link from "next/link";

const PublicResume = () => {
  const param = useParams();
  const documentId = param.documentId as string;
  const { data, isSuccess, isLoading } = useGetDocument(documentId, true);
  const resumeInfo = data?.data ?? ({} as ResumeDataType);

  const handlePrint = () => {
    window.print();
  };

  if (!isLoading && !isSuccess) {
    return <Error />;
  }

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Background Decorative Elements synced with the app theme */}
      <div className="absolute inset-0 liquid-mesh opacity-[0.15] dark:opacity-[0.2] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Glass Header */}
      <nav className="w-full sticky top-0 z-50 glass-card backdrop-blur-xl shrink-0 !border-b !border-t-0 !border-x-0 !rounded-none shadow-sm bg-white/70 dark:bg-slate-950/70 py-3 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black group-hover:rotate-6 transition-transform">
              S
            </div>
            <span className="font-black text-xl tracking-tighter bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              SmartCraft
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Portfolio of</span>
                <span className="text-sm font-bold">
                  {resumeInfo?.personalInfo?.firstName} {resumeInfo?.personalInfo?.lastName}
                </span>
             </div>
             <div className="w-px h-8 bg-border mx-2" />
             <Button 
                onClick={handlePrint}
                className="bg-emerald-600 hover:bg-emerald-700 font-bold px-6 shadow-lg shadow-emerald-500/20 rounded-full h-10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="relative z-10 flex-1 w-full mx-auto max-w-5xl py-12 px-5 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Side: Traditional View in a Premium Wrapper */}
          <div className="lg:col-span-12 print:block">
            <div className="glass-card squircle shadow-2xl overflow-hidden print:shadow-none print:border-none print:rounded-none">
              <div className="print:m-0">
                <PreviewResume
                  {...{
                    resumeInfo,
                    isLoading,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="relative z-10 py-12 border-t border-border/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
         <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground font-medium">
              Powered by <span className="text-emerald-600 font-bold">SmartCraft AI</span>. Design your career with precision.
            </p>
            <div className="flex items-center gap-4">
               <Button variant="ghost" size="sm" className="font-bold text-xs" asChild>
                  <Link href="/pricing">Build your own resume</Link>
               </Button>
               <Button variant="outline" size="icon" className="rounded-full h-8 w-8" onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Portfolio link copied!");
               }}>
                  <Share2 className="w-4 h-4" />
               </Button>
            </div>
         </div>
      </footer>
      
      {/* Dynamic Print Styles */}
      <style jsx global>{`
        @media print {
          nav, footer, .liquid-mesh, .bg-emerald-500\/20, .bg-purple-500\/10 {
            display: none !important;
          }
          body, .min-h-screen {
            background: white !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          .glass-card {
            border: none !important;
            box-shadow: none !important;
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicResume;
