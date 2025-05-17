import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as orgAPI from "../api/organizations";

export const useOrganizations = () => {
  const queryClient = useQueryClient();

  const organizationsQuery = useQuery(["organizations"], orgAPI.fetchOrganizations);

  const createOrgMutation = useMutation(orgAPI.createOrganization, {
    onSuccess: () => queryClient.invalidateQueries(["organizations"]),
  });

  const updateOrgMutation = useMutation(
    ({ id, org }: { id: string; org: Partial<orgAPI.Organization> }) =>
      orgAPI.updateOrganization(id, org),
    {
      onSuccess: () => queryClient.invalidateQueries(["organizations"]),
    }
  );

  const deleteOrgMutation = useMutation(orgAPI.deleteOrganization, {
    onSuccess: () => queryClient.invalidateQueries(["organizations"]),
  });

  return {
    organizationsQuery,
    createOrgMutation,
    updateOrgMutation,
    deleteOrgMutation,
  };
};
