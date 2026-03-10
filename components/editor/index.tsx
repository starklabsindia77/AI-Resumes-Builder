import React, { useState } from "react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
} from "react-simple-wysiwyg";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import useGetAiSuggestions from "@/features/ai/use-get-ai-suggestions";

const RichTextEditor = (props: {
  jobTitle: string | null;
  initialValue: string;
  onEditorChange: (e: any) => void;
}) => {
  const { jobTitle, initialValue, onEditorChange } = props;

  const [value, setValue] = useState(initialValue || "");
  const { mutate: suggest, isPending: loading } = useGetAiSuggestions();

  const GenerateSummaryFromAI = async () => {
    if (!jobTitle) {
      toast({
        title: "Must provide Job Position",
        variant: "destructive",
      });
      return;
    }

    suggest({
      type: "experience",
      context: jobTitle
    }, {
      onSuccess: (response) => {
        if (response.success && response.data?.[0]) {
          // Join bullets if they aren't already formatted as HTML or just pick the best one
          // The backend prompt specifically asks for bullet points
          const aiValue = response.data[0]; 
          setValue(aiValue);
          onEditorChange(aiValue);
        }
      }
    });
  };

  return (
    <div>
      <div
        className="flex items-center 
      justify-between my-2"
      >
        <Label>Work Summary</Label>
        <Button
          variant="outline"
          type="button"
          className="gap-1"
          disabled={loading}
          onClick={() => GenerateSummaryFromAI()}
        >
          <>
            <Sparkles size="15px" className="text-purple-500" />
            Generate with AI
          </>
          {loading && <Loader size="13px" className="animate-spin" />}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          containerProps={{
            style: {
              resize: "vertical",
              lineHeight: 1.2,
              fontSize: "13.5px",
            },
          }}
          onChange={(e) => {
            setValue(e.target.value);
            onEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
