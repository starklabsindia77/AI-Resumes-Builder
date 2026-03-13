import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/hono-rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof api.document)[":documentId"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof api.document)[":documentId"]["$delete"]
>;

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await api.document[":documentId"].$delete({
        param,
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast({
        title: "Success",
        description: "Resume moved to trash",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
