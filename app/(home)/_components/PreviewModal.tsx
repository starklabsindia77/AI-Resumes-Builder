import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useResumeContext } from "@/context/resume-info-provider";
import { Eye, FileText } from "lucide-react";
import React from "react";
import ResumePreview from "./ResumePreview";

const PreviewModal = () => {
  const { resumeInfo, isLoading } = useResumeContext();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            disabled={
              isLoading || resumeInfo?.status === "archived" ? true : false
            }
            variant="outline"
            className="glass-card squircle gap-1
                   bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm
                   !p-2 w-9 border-white/20 hover:border-emerald-500/50
                    lg:w-auto lg:p-4"
          >
            <div className="flex items-center gap-1">
              <Eye size="17px" />
              <span className="hidden  lg:flex">Preview</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent
          className="
                   sm:max-w-4xl p-0
                   w-full max-h-[90vh]
                   lg:max-h-[95vh]
                   overflow-y-auto
                   glass-card backdrop-blur-3xl squircle border-white/20
                   shadow-2xl bg-white/70 dark:bg-slate-950/70
                  "
        >
          <DialogHeader
            className="!pb-0
                  !m-0 sticky top-0
                  backdrop-blur-xl bg-white/50
                   dark:bg-slate-950/50 z-10 border-b border-white/10
                  "
          >
            <DialogTitle
              className="
                      flex items-center gap-1 text-[20px]
                      pt-2 px-3 font-semibold opacity-100
                      
                      "
            >
              <FileText
                size="20px"
                className="
                          stroke-primary
                          "
              />
              {resumeInfo?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full h-full px-2 pb-4">
            <ResumePreview />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewModal;
