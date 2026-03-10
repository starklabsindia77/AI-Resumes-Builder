"use client";
import React, { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Copy, Dot, EllipsisVertical, FileText, Globe, Lock } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDuplicateDocument from "@/features/document/use-duplicate-document";

interface PropType {
  documentId: string;
  title: string;
  status: "archived" | "private" | "public";
  themeColor: string | null;
  thumbnail: string | null;
  updatedAt: string;
}

const ResumeItem: FC<PropType> = ({
  documentId,
  status,
  title,
  themeColor,
  thumbnail,
  updatedAt,
}) => {
  const router = useRouter();
  const { mutate: duplicate, isPending: duplicating } = useDuplicateDocument();

  const docDate = useMemo(() => {
    if (!updatedAt) return null;
    const formattedDate = format(new Date(updatedAt), "MMM dd, yyyy");
    return formattedDate;
  }, [updatedAt]);

  const gotoDoc = useCallback(() => {
    router.push(`/dashboard/document/${documentId}/edit`);
  }, [router, documentId]);

  const onDuplicate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    duplicate({ documentId });
  }, [duplicate, documentId]);

  return (
    <div
      role="button"
      className="
        cursor-pointer max-w-[164px] w-full
        transition-all h-[197px]
        glass-card squircle hover:scale-[1.02] active:scale-[0.98]
        "
      onClick={gotoDoc}
      style={{ borderColor: themeColor || "" }}
    >
      <div
        className="flex flex-col w-full 
          h-full items-center rounded-lg
          justify-center bg-[#fdfdfd] 
          dark:bg-secondary"
      >
        <div
          className="w-full flex flex-1 px-1
         pt-2"
        >
          <div
            className="w-full flex flex-1 bg-white
          dark:bg-gray-700
          rounded-t-lg justify-center
           items-center
          "
          >
            {thumbnail ? (
              <div
                className="
              relative w-full h-full 
              rounded-t-lg
              overflow-hidden
              "
              >
                <Image
                  fill
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full
                  object-cover
                  object-top rounded-t-lg
                                  "
                />
              </div>
            ) : (
              <FileText size="30px" />
            )}
          </div>
        </div>

        {/* {Body Content} */}
        <div
          className="shrink w-full border-t pt-2 
              pb-[9px]
              px-[9px]
        "
        >
          <div
            className="flex items-center 
          justify-between"
          >
            <h5
              className="
                      font-semibold text-sm mb-[2px]
                      truncate block w-[200px]
                      "
            >
              {title}
            </h5>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button 
                  disabled={duplicating}
                  className="text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-md transition-colors"
                >
                  <EllipsisVertical size="20px" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card squircle">
                <DropdownMenuItem 
                  onClick={onDuplicate}
                  className="flex items-center gap-2 cursor-pointer font-medium"
                >
                  <Copy size="14px" />
                  Duplicate (Shadow)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            className="flex items-center
          !text-[12px] font-medium 
          text-muted-foreground
          "
          >
            <span
              className="
                      flex items-center gap-[2px]
                      "
            >
              {status === "private" ? (
                <>
                  <Lock size="12px" />
                  Private
                </>
              ) : (
                <>
                  <Globe size="12px" className="text-primary" />
                  Public
                </>
              )}
            </span>
            <Dot size="15px" />
            <span>{docDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeItem;
