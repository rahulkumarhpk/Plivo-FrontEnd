import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as incidentsAPI from "../api/incidents";

export const useIncidents = () => {
  const queryClient = useQueryClient();

  const incidentsQuery = useQuery(["incidents"], incidentsAPI.fetchIncidents);

  const createIncidentMutation = useMutation(incidentsAPI.createIncident, {
    onSuccess: () => queryClient.invalidateQueries(["incidents"]),
  });

  const updateIncidentMutation = useMutation(
    ({ id, updates }: { id: string; updates: Partial<any> }) =>
      incidentsAPI.updateIncident(id, updates),
    {
      onSuccess: () => queryClient.invalidateQueries(["incidents"]),
    }
  );

  const deleteIncidentMutation = useMutation(incidentsAPI.deleteIncident, {
    onSuccess: () => queryClient.invalidateQueries(["incidents"]),
  });

  return {
    incidentsQuery,
    createIncidentMutation,
    updateIncidentMutation,
    deleteIncidentMutation,
  };
};

export const useIncidentUpdates = (incidentId: string) => {
  const queryClient = useQueryClient();

  const incidentUpdatesQuery = useQuery(
    ["incidentUpdates", incidentId],
    () => incidentsAPI.fetchIncidentUpdates(incidentId),
    { enabled: !!incidentId }
  );

  const addUpdateMutation = useMutation(
    (updateText: string) => incidentsAPI.addIncidentUpdate(incidentId, updateText),
    {
      onSuccess: () => queryClient.invalidateQueries(["incidentUpdates", incidentId]),
    }
  );

  return {
    incidentUpdatesQuery,
    addUpdateMutation,
  };
};
