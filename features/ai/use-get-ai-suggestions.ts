import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/hono-rpc";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "@/hooks/use-toast";

type ResponseType = InferResponseType<typeof api.ai.suggest.$post>;
type RequestType = InferRequestType<typeof api.ai.suggest.$post>["json"];

const useGetAiSuggestions = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await api.ai.suggest.$post({ json });
      if (!response.ok) {
        throw new Error("Failed to fetch AI suggestions");
      }
      return await response.json();
    },
    onError: (error) => {
      toast({
        title: "AI Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useGetAiSuggestions;
