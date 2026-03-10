"use client";
import useCreateDocument from "@/features/document/use-create-document";
import useGetSubscription from "@/hooks/use-get-subscription";
import { FileText, Loader, Plus, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { toast } from "@/hooks/use-toast";

const AddResume = () => {
  const router = useRouter();
  const { isPending, mutate } = useCreateDocument();
  const { data: subscription, isLoading: subLoading } = useGetSubscription();

  const onCreate = useCallback(() => {
    if (subscription && subscription.resumeCount >= subscription.maxResumes) {
      toast({
        title: "Limit Reached",
        description: "You've reached the 1-resume limit of the Starter plan. Please upgrade to Professional to create unlimited resumes.",
        variant: "destructive",
      });
      return;
    }

    mutate(
      {
        title: "Untitled Resume",
      },
      {
        onSuccess: (response) => {
          if (response.success === "ok") {
            const documentId = response.data.documentId;
            router.push(`/dashboard/document/${documentId}/edit`);
          } else {
            toast({
              title: "Error",
              description: ("message" in response ? response.message : "Failed to create resume"),
              variant: "destructive",
            });
          }
        },
      }
    );
  }, [mutate, router, subscription]);

  const isLimitReached = subscription && subscription.resumeCount >= subscription.maxResumes;
  return (
    <>
      <div
        role="button"
        className="p-[2px] w-full cursor-pointer max-w-[164px]"
        onClick={isLimitReached ? undefined : onCreate}
      >
        <div
          className={`
        py-24 h-[197px] flex flex-col
        squircle gap-2 w-full max-w-full
        items-center justify-center
        glass-card
        transition-all
        hover:scale-[1.02] active:scale-[0.98]
        ${isLimitReached ? 'opacity-70 grayscale cursor-not-allowed' : 'hover:border-primary/50'}
        `}
        >
          <span>
            {isLimitReached ? <Lock size="30px" className="text-muted-foreground" /> : <Plus size="30px" />}
          </span>
          <p
            className={`text-sm font-semibold ${isLimitReached ? 'text-muted-foreground' : ''}`}
          >
            {isLimitReached ? 'Resume Limit (Pro)' : 'Blank Resume'}
          </p>
        </div>
      </div>
      {isPending && (
        <div
          className="fixed top-0 left-0 z-[9999]
      right-0 flex flex-col gap-2
      items-center justify-center
      backdrop-blur bg-black/30 w-full h-full
        "
        >
          <Loader size="35px" className="animate-spin" />
          <div className="flex items-center gap-2">
            <FileText />
            Creating Blank Resume...
          </div>
        </div>
      )}
    </>
  );
};

export default AddResume;
