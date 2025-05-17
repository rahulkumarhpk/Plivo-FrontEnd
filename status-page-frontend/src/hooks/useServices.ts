import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as serviceAPI from "../api/services";

export const useServices = () => {
  const queryClient = useQueryClient();

  const servicesQuery = useQuery(["services"], serviceAPI.fetchServices);

  const createServiceMutation = useMutation(serviceAPI.createService, {
    onSuccess: () => queryClient.invalidateQueries(["services"]),
  });

  const updateServiceMutation = useMutation(
    ({ id, service }: { id: string; service: Partial<serviceAPI.Service> }) =>
      serviceAPI.updateService(id, service),
    {
      onSuccess: () => queryClient.invalidateQueries(["services"]),
    }
  );

  const deleteServiceMutation = useMutation(serviceAPI.deleteService, {
    onSuccess: () => queryClient.invalidateQueries(["services"]),
  });

  return {
    servicesQuery,
    createServiceMutation,
    updateServiceMutation,
    deleteServiceMutation,
  };
};
