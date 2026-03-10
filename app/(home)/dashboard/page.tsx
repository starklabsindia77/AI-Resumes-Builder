import React from "react";
import AddResume from "../_components/AddResume";
import ResumeList from "../_components/ResumeList";
import TrashListBox from "../_components/TrashListBox";

const Page = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
      <div className="absolute inset-0 liquid-mesh opacity-50 pointer-events-none" />
      <div className="relative z-10 w-full mx-auto max-w-7xl py-8 px-5">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400">
              My Resumes
            </h1>
            <p className="text-base text-muted-foreground font-medium mt-1">
              Design and manage your professional presence with AI.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <TrashListBox />
          </div>
        </div>

        <div className="w-full pt-12">
          <h5 className="text-sm uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400 mb-6">
            Recent Work
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AddResume />
            <ResumeList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
