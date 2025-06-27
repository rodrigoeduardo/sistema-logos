import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { VariablesModifiers } from "@/constants/attributes-and-defenses";

// API functions
const fetchDefenses = async (): Promise<VariablesModifiers> => {
  const response = await fetch("/api/variables/defenses");
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch defenses");
  }

  return result.data;
};

const updateDefenses = async (data: VariablesModifiers): Promise<void> => {
  const response = await fetch("/api/variables/defenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to update defenses");
  }
};

// React Query hooks
export const useGetDefenses = () => {
  return useQuery({
    queryKey: ["defenses"],
    queryFn: fetchDefenses,
  });
};

export const useSetDefenses = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDefenses,
    onSuccess: () => {
      // Invalidate and refetch defenses data
      queryClient.invalidateQueries({ queryKey: ["defenses"] });
    },
  });
};
