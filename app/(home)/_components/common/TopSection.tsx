"use client";
import { useResumeContext } from "@/context/resume-info-provider";
import { AlertCircle } from "lucide-react";
import React, { useCallback } from "react";
import ResumeTitle from "./ResumeTitle";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import ThemeColor from "./ThemeColor";
import PreviewModal from "../PreviewModal";
import Download from "./Download";
import Share from "./Share";
import MoreOption from "./MoreOption";
import useGetSubscription from "@/hooks/use-get-subscription";

const TopSection = () => {
  const { resumeInfo, isLoading, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();
  const { data: subscription } = useGetSubscription();
  const isPro = subscription?.plan === "pro" || subscription?.plan === "enterprise";

  const handleTitle = useCallback(
    (title: string) => {
      if (title === "Untitled Resume" && !title) return;

      if (resumeInfo) {
        onUpdate({
          ...resumeInfo,
          title: title,
        });
      }

      mutateAsync(
        {
          title: title,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Title updated successfully",
            });
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to update the title",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo, onUpdate]
  );
  return (
    <>
      {resumeInfo?.status === "archived" && (
        <div
          className="
            absolute z-50 inset-x-0 top-0 h-8
            bg-rose-500/90 backdrop-blur-sm text-center
            text-sm p-2 text-white
            flex items-center gap-x-2 
            justify-center font-bold tracking-wide
            "
        >
          <AlertCircle size="14px" />
          RESUME IN TRASH BIN
        </div>
      )}
      <div
        className="
          w-full flex items-center justify-between
          glass-card px-6 py-3 squircle mb-6
          bg-white/40 dark:bg-slate-900/40 backdrop-blur-md
          "
      >
        <div className="flex items-center gap-2">
          <ResumeTitle
            isLoading={isLoading || isPending}
            initialTitle={resumeInfo?.title || ""}
            status={resumeInfo?.status}
            onSave={(value) => handleTitle(value)}
          />
          <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isPro ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
             {subscription?.plan || 'Starter'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* {ThemeColor} */}
          <ThemeColor />

          {/* Preview Modal */}
          <PreviewModal />

          {/* Download Resume */}
          <Download
            title={resumeInfo?.title || "Unititled Resume"}
            status={resumeInfo?.status}
            isLoading={isLoading}
          />

          {/* Share Resume */}
          <Share />

          {/* More Option */}
          <MoreOption />
        </div>
      </div>
    </>
  );
};

export default TopSection;
