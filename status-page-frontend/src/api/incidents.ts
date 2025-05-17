import apiClient from "./apiClient";

export interface Incident {
  id: string;
  serviceId: string;
  title: string;
  description: string;
  status: "open" | "investigating" | "resolved" | "scheduled" | "maintenance";
  createdAt: string;
  updatedAt: string;
}

export interface IncidentUpdate {
  id: string;
  incidentId: string;
  updateText: string;
  createdAt: string;
}

export const fetchIncidents = async (): Promise<Incident[]> => {
  const { data } = await apiClient.get("/incidents/");
  return data;
};

export const createIncident = async (incident: Omit<Incident, "id" | "createdAt" | "updatedAt">): Promise<Incident> => {
  const { data } = await apiClient.post("/incidents/", incident);
  return data;
};

export const updateIncident = async (
  id: string,
  updates: Partial<Omit<Incident, "id" | "createdAt" | "updatedAt">>
): Promise<Incident> => {
  const { data } = await apiClient.put(`/incidents/${id}`, updates);
  return data;
};

export const deleteIncident = async (id: string): Promise<void> => {
  await apiClient.delete(`/incidents/${id}`);
};

// Incident Updates (comments on incidents)
export const fetchIncidentUpdates = async (incidentId: string): Promise<IncidentUpdate[]> => {
  const { data } = await apiClient.get(`/incidents/${incidentId}/updates`);
  return data;
};

export const addIncidentUpdate = async (
  incidentId: string,
  updateText: string
): Promise<IncidentUpdate> => {
  const { data } = await apiClient.post(`/incidents/${incidentId}/updates`, { updateText });
  return data;
};
