"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Loader, Sparkles, Wand2 } from "lucide-react";
import useParseLinkedIn from "@/features/ai/use-parse-linkedin";
import useCreateDocument from "@/features/document/use-create-document";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const ImportLinkedIn = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { mutate: parse, isPending: isParsing } = useParseLinkedIn();
  const { mutate: create, isPending: isCreating } = useCreateDocument();

  const handleImport = () => {
    if (!text.trim()) {
      toast({
        title: "Empty input",
        description: "Please paste your LinkedIn profile text first.",
        variant: "destructive",
      });
      return;
    }

    parse(
      { text },
      {
        onSuccess: (response) => {
          if (response.success && response.data) {
            // Now create the document with the parsed data
            create(
              {
                title: `${response.data.personalInfo?.firstName || "LinkedIn"} Import`,
                ...response.data,
              },
              {
                onSuccess: (createResponse) => {
                  if (createResponse.success === "ok") {
                    toast({
                      title: "Success!",
                      description: "Your resume has been generated from LinkedIn.",
                    });
                    setOpen(false);
                    router.push(`/dashboard/document/${createResponse.data.documentId}/edit`);
                  }
                },
              }
            );
          }
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          role="button"
          className="p-[2px] w-full cursor-pointer max-w-[164px]"
        >
          <div
            className="py-24 h-[197px] flex flex-col squircle gap-2 w-full max-w-full items-center justify-center glass-card transition-all hover:scale-[1.02] active:scale-[0.98] border-blue-500/20 hover:border-blue-500/50"
          >
            <div className="relative">
              <Linkedin size="30px" className="text-blue-600" />
              <Sparkles size="14px" className="absolute -top-1 -right-1 text-purple-500 animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">LinkedIn Sync</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass-card squircle border-blue-500/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-blue-600" />
            AI LinkedIn Import
          </DialogTitle>
          <DialogDescription>
            Paste your LinkedIn profile text or "About" section below. Our AI will instantly build your resume structure.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Go to your LinkedIn profile -> Ctrl+A -> Ctrl+C -> Paste here..."
            className="min-h-[200px] glass-card squircle bg-white/50 dark:bg-slate-900/50"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            onClick={handleImport}
            disabled={isParsing || isCreating}
            className="w-full bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/20"
          >
            {isParsing || isCreating ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                {isParsing ? "AI is parsing profile..." : "Building your resume..."}
              </>
            ) : (
              "Generate Resume (AI Sync)"
            )}
          </Button>
          <p className="text-[10px] text-center text-muted-foreground italic">
            Tip: For best results, include your experience and education details.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportLinkedIn;
