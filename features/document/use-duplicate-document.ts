import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/hono-rpc";
import { toast } from "@/hooks/use-toast";

const useDuplicateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (param: { documentId: string }) => {
      // Use standard bracket notation for dynamic Hono routes
      const response = await api.document.duplicate[":documentId"].$post({
        param,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error((errorData as any)?.message || "Failed to duplicate resume");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Resume Duplicated",
        description: "Created a new shadow version of your resume.",
      });
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      toast({
        title: "Duplication Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useDuplicateDocument;
