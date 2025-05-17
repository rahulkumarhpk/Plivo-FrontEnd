import apiClient from "./apiClient";

export interface PublicServiceStatus {
  id: string;
  name: string;
  status: "operational" | "degraded" | "partial_outage" | "major_outage";
}

export interface PublicIncident {
  id: string;
  serviceId: string;
  title: string;
  status: "open" | "investigating" | "resolved" | "scheduled" | "maintenance";
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEntry {
  id: string;
  timestamp: string;
  description: string;
}

export const fetchPublicServices = async (): Promise<PublicServiceStatus[]> => {
  const { data } = await apiClient.get("/public/services");
  return data;
};

export const fetchPublicIncidents = async (): Promise<PublicIncident[]> => {
  const { data } = await apiClient.get("/public/incidents");
  return data;
};

export const fetchTimeline = async (): Promise<TimelineEntry[]> => {
  const { data } = await apiClient.get("/public/timeline");
  return data;
};
