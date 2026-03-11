import { Skeleton } from "@/components/ui/skeleton";
import { ResumeDataType } from "@/types/resume.type";
import { TemplateConfig } from "@/lib/templates-config";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
  config?: TemplateConfig;
}

const SummaryPreview: FC<PropsType> = ({ resumeInfo, isLoading, config }) => {
  const alignment = config?.styles.headerAlignment || "center";

  return (
    <div className="w-full min-h-10">
      {isLoading ? (
        <Skeleton className="h-6 w-full" />
      ) : (
        <p className={cn("text-[13px] !leading-4", alignment === "center" ? "text-center" : "text-left")}>
          {resumeInfo?.summary ||
            "Enter a brief description of your profession background."}
        </p>
      )}
    </div>
  );
};

export default SummaryPreview;
