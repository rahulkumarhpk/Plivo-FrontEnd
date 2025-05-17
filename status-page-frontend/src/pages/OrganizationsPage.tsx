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
    <div className="h-full flex flex-col">
      {/* Fixed header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Organization
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 border rounded-lg shadow-sm bg-gray-50 p-4 overflow-hidden">
        <div className="h-full overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizations.map((org) => (
              <div key={org.id} className="bg-white border p-4 rounded-lg shadow-sm hover:shadow">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{org.name}</h3>
                    {org.description && (
                      <p className="text-gray-600 mt-2">{org.description}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                    <button className="text-blue-500 hover:text-blue-600">Edit</button>
                    <button className="text-red-500 hover:text-red-600">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;
