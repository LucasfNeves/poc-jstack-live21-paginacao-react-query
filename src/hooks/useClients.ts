import { ClientsService } from "@/services/ClientsService";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "./usePagination";

export function useClients(perPage: number = 10) {
  const pagination = usePagination(1);

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

  return {
    clients: data?.data || [],
    isLoading,
    pagination,
  };
}
