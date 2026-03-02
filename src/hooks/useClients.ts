import { ClientsService } from "@/services/ClientsService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePagination } from "./usePagination";
import { useEffect } from "react";

export function useClients(perPage: number = 10) {
  const pagination = usePagination(1);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryKey: ["clients", { page: pagination.currentPage, perPage }],
    queryFn: async () => {
      const response = await ClientsService.getAll(
        pagination.currentPage,
        perPage,
      );
      pagination.handleSetTotalItems(response.items);
      return response;
    },
  });

  useEffect(() => {
    const nextPage = pagination.currentPage + 1;

    if (!pagination.hasNextPage) return;

    queryClient.prefetchQuery({
      queryKey: ["clients", { page: nextPage, perPage }],
      queryFn: async () => {
        const response = await ClientsService.getAll(nextPage, perPage);
        return response;
      },
    });
  }, [pagination.currentPage, pagination.hasNextPage]);

  return {
    clients: data?.data || [],
    isLoading,
    pagination,
  };
}
