import apiClient from "./apiClient";

export interface Service {
  id: string;
  name: string;
  status: "Operational" | "Degraded Performance" | "Partial Outage" | "Major Outage";
  description?: string;
}

export const fetchServices = async (): Promise<Service[]> => {
  const { data } = await apiClient.get("/services/");
  return data;
};

export const createService = async (service: Omit<Service, "id">): Promise<Service> => {
  const { data } = await apiClient.post("/services/", service);
  return data;
};

export const updateService = async (id: string, service: Partial<Service>): Promise<Service> => {
  const { data } = await apiClient.put(`/services/${id}`, service);
  return data;
};

export const deleteService = async (id: string): Promise<void> => {
  await apiClient.delete(`/services/${id}`);
};
