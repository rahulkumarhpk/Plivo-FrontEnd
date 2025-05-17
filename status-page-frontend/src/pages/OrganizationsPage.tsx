import React, { useEffect, useState } from "react";
import api from "../lib/api";

interface Organization {
  id: string;
  name: string;
}

interface OrganizationFormData {
  id?: string;
  name: string;
}

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<OrganizationFormData>({
    name: "",
  });

  const fetchOrganizations = async () => {
    try {
      const response = await api.get("/organizations");
      setOrganizations(response.data);
    } catch (err) {
      setError("Failed to load organizations");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrganization = async () => {
    try {
      const response = await api.post("/organizations/", {
        name: formData.name,
      });
      setOrganizations([...organizations, response.data]);
      setIsModalOpen(false);
      setFormData({ name: "" });
    } catch (err) {
      setError("Failed to create organization");
    }
  };

  const handleUpdateOrganization = async (id: string) => {
    try {
      const response = await api.put(`/organizations/${id}`, {
        name: formData.name,
      });
      setOrganizations(
        organizations.map((org) => (org.id === id ? response.data : org))
      );
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to update organization");
    }
  };

  const handleDeleteOrganization = async (id: string) => {
    try {
      await api.delete(`/organizations/${id}`);
      setOrganizations(organizations.filter((org) => org.id !== id));
    } catch (err) {
      setError("Failed to delete organization");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      handleUpdateOrganization(formData.id);
    } else {
      handleCreateOrganization();
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Organizations Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded"
        >
          Add New Organization
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {formData.id ? "Edit Organization" : "Add New Organization"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded p-2 bg-white text-gray-900"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded bg-white text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                >
                  {formData.id ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="bg-white border p-4 rounded-lg shadow-sm hover:shadow"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">{org.name}</h3>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-600"
                  onClick={() => {
                    setFormData({
                      id: org.id,
                      name: org.name,
                    });
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleDeleteOrganization(org.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationsPage;
