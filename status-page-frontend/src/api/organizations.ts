import apiClient from "./apiClient";

export interface Organization {
  id: string;
  name: string;
  description?: string;
}

export const fetchOrganizations = async (): Promise<Organization[]> => {
  const { data } = await apiClient.get("/organizations/");
  return data;
};

export const createOrganization = async (
  org: Omit<Organization, "id">
): Promise<Organization> => {
  const { data } = await apiClient.post("/organizations/", org);
  return data;
};

export const updateOrganization = async (
  id: string,
  org: Partial<Organization>
): Promise<Organization> => {
  const { data } = await apiClient.put(`/organizations/${id}`, org);
  return data;
};

export const deleteOrganization = async (id: string): Promise<void> => {
  await apiClient.delete(`/organizations/${id}`);
};
