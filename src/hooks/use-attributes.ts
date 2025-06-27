import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { VariablesModifiers } from "@/constants/attributes-and-defenses";

// API functions
const fetchAttributes = async (): Promise<VariablesModifiers> => {
  const response = await fetch("/api/variables/attributes");
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch attributes");
  }

  return result.data;
};

const updateAttributes = async (data: VariablesModifiers): Promise<void> => {
  const response = await fetch("/api/variables/attributes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to update attributes");
  }
};

// React Query hooks
export const useGetAttributes = () => {
  return useQuery({
    queryKey: ["attributes"],
    queryFn: fetchAttributes,
  });
};

export const useSetAttributes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAttributes,
    onSuccess: () => {
      // Invalidate and refetch attributes data
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
  });
};
