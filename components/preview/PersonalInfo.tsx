"use client";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";
import { TemplateConfig } from "@/lib/templates-config";
import React, { FC } from "react";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
  config?: TemplateConfig;
}

const PersonalInfo: FC<PropsType> = ({ resumeInfo, isLoading, config }) => {
  const themeColor = config?.styles.primaryColor || resumeInfo?.themeColor || INITIAL_THEME_COLOR;
  const alignment = config?.styles.headerAlignment || "center";

  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full min-h-14">
      <h2
        className={cn("font-bold text-xl", alignment === "center" ? "text-center" : "text-left")}
        style={{
          color: themeColor,
        }}
      >
        {resumeInfo?.personalInfo?.firstName || "First Name"}{" "}
        {resumeInfo?.personalInfo?.lastName || "Last Name"}
      </h2>
      <h5 className={cn("text-sm font-medium", alignment === "center" ? "text-center" : "text-left")}>
        {resumeInfo?.personalInfo?.jobTitle || "Job Title"}
      </h5>
      <p
        className={cn("font-normal text-[13px]", alignment === "center" ? "text-center" : "text-left")}
      >
        {resumeInfo?.personalInfo?.address || "House Address"}
      </p>

      <div className="flex items-center justify-between pt-3">
        <h5 className="font-normal text-[13px]">
          {resumeInfo?.personalInfo?.phone || "Phone number"}
        </h5>
        <h5 className="font-normal text-[13px]">
          {resumeInfo?.personalInfo?.email || "Email address"}
        </h5>
      </div>

      <hr
        className="
          border-[1.5px] my-2
          "
        style={{
          borderColor: themeColor,
        }}
      />
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="w-full min-h-14">
      <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-6 w-1/4 mx-auto mb-2" />
      <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
      <div className="flex justify-between pt-3">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-[1.5] w-full my-2" />
    </div>
  );
};

export default PersonalInfo;
