import { api } from "@/lib/hono-rpc";
import { useQuery } from "@tanstack/react-query";

const useGetSubscription = () => {
  const query = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const response = await api.subscription.me.$get();

      if (!response.ok) {
        throw new Error("Failed to get subscription");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};

export default useGetSubscription;
