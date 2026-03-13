"use client";
import React, { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Copy, Dot, EllipsisVertical, FileText, Globe, Loader, Lock, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useDuplicateDocument from "@/features/document/use-duplicate-document";
import { useDeleteDocument } from "@/features/document/use-delete-document";

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
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const { mutate: duplicate, isPending: duplicating } = useDuplicateDocument();
  const { mutate: deleteDoc, isPending: deleting } = useDeleteDocument();

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

  const onDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  }, []);

  const onConfirmDelete = useCallback(() => {
    deleteDoc({ param: { documentId } }, {
      onSuccess: () => {
        setShowDeleteDialog(false);
      }
    });
  }, [deleteDoc, documentId]);

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
          dark:bg-secondary relative"
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
                  disabled={duplicating || deleting}
                  className="text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-md transition-colors disabled:opacity-50"
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
                <DropdownMenuItem 
                  onClick={onDeleteClick}
                  className="flex items-center gap-2 cursor-pointer font-medium text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/30"
                >
                  <Trash2 size="14px" />
                  Delete
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

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="glass-card squircle" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Move to Trash?</DialogTitle>
            <DialogDescription>
              This will move "{title}" to the trash. You can restore it later from the trash list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirmDelete} disabled={deleting}>
              {deleting ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Move to Trash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeItem;
