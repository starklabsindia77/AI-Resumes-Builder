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

const SkillPreview: FC<PropsType> = ({ resumeInfo, isLoading, config }) => {
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
        Skills
      </h5>
      {headingStyle !== "solid" && headingStyle !== "subtle-bg" && headingStyle !== "outline" && (
        <hr
          className="border-[1.5px] my-2"
          style={{ borderColor: themeColor }}
        />
      )}

      <div className="grid grid-cols-2 gap-3 pt-3 my-1 min-h-9">
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h5 className="text-[13px]">{skill?.name}</h5>
            {skill?.rating && skill?.name ? (
              <div className="h-2 bg-gray-200 w-[120px]">
                <div
                  className="h-2"
                  style={{
                    background: themeColor,
                    width: skill?.rating * 20 + "%",
                  }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillPreview;
