import React, { FC } from "react";
import SkeletonLoader from "@/components/skeleton-loader";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";
import { TemplateConfig } from "@/lib/templates-config";
import { cn } from "@/lib/utils";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
  config?: TemplateConfig;
}

const EducationPreview: FC<PropsType> = ({ resumeInfo, isLoading, config }) => {
  const themeColor = config?.styles.primaryColor || resumeInfo?.themeColor || INITIAL_THEME_COLOR;
  const headingStyle = config?.styles.sectionHeadings || "underline";
  const alignment = config?.styles.headerAlignment || "center";

  const getSectionHeadingStyle = (): React.CSSProperties => {
    switch (headingStyle) {
      case "solid":
        return { backgroundColor: themeColor, color: "white", padding: "2px 8px", borderRadius: "2px" };
      case "subtle-bg":
        return { backgroundColor: `${themeColor}20`, color: themeColor, padding: "2px 8px" };
      case "outline":
        return { border: `1px solid ${themeColor}`, color: themeColor, padding: "2px 8px" };
      case "none":
        return { color: themeColor };
      default:
        return { color: themeColor };
    }
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full my-5">
      <h5
        className={cn("font-bold mb-2", alignment === "center" ? "text-center" : "text-left")}
        style={getSectionHeadingStyle()}
      >
        Education
      </h5>
      {headingStyle !== "solid" && headingStyle !== "subtle-bg" && headingStyle !== "outline" && (
        <hr
          className="border-[1.5px] my-2"
          style={{ borderColor: themeColor }}
        />
      )}

      <div className="flex flex-col gap-2 min-h-9">
        {resumeInfo?.educations?.map((education, index) => (
          <div key={index}>
            <h5 className="text-sm font-bold" style={{ color: themeColor }}>
              {education?.universityName}
            </h5>
            <div className="flex items-start justify-between">
              <h5 className="text-[13px]">
                {education?.degree}
                {education?.degree && education?.major && " in "}
                {education?.major}
              </h5>
              <span className="text-[13px]">
                {education?.startDate}
                {education?.startDate && " - "}
                {education?.endDate}
              </span>
            </div>
            <p className="text-[13px] my-2">{education?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPreview;
