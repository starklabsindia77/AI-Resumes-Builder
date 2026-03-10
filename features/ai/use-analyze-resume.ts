import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/hono-rpc";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "@/hooks/use-toast";

type ResponseType = InferResponseType<typeof api.ai.analyze.$post>;
type RequestType = InferRequestType<typeof api.ai.analyze.$post>["json"];

const useAnalyzeResume = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await api.ai.analyze.$post({ json });
      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }
      return await response.json();
    },
    onSuccess: (response) => {
       if (response.success) {
         toast({
           title: "Analysis Complete",
           description: "Your AI resume score and tips are ready!",
         });
       }
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useAnalyzeResume;
