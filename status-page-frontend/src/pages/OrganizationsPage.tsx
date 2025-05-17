import React, { useEffect, useState } from "react";
import api from "../lib/api";

interface Organization {
  id: string;
  name: string;
  description?: string;
}

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/organizations");
      setOrganizations(response.data);
    } catch (err) {
      setError("Failed to load organizations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Organization
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="grid gap-4">
        {organizations.map((org) => (
          <div key={org.id} className="border p-4 rounded-lg">
            <h3 className="font-medium">{org.name}</h3>
            {org.description && (
              <p className="text-gray-600 mt-2">{org.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationsPage;
