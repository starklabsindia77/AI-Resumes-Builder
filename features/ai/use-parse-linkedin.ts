import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/hono-rpc";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "@/hooks/use-toast";

type ResponseType = InferResponseType<typeof api.ai["parse-linkedin"]["$post"]>;
type RequestType = InferRequestType<typeof api.ai["parse-linkedin"]["$post"]>["json"];

const useParseLinkedIn = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await api.ai["parse-linkedin"].$post({ json });
      if (!response.ok) {
        throw new Error("Failed to parse LinkedIn profile");
      }
      return await response.json();
    },
    onError: (error) => {
      toast({
        title: "Parsing Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useParseLinkedIn;
