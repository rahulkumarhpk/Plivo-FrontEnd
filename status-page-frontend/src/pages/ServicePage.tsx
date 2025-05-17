import React, { useState } from "react";
import { useServices } from "../hooks/useServices";

const statusOptions = [
  "Operational",
  "Degraded Performance",
  "Partial Outage",
  "Major Outage",
] as const;

const ServicesPage = () => {
  const { servicesQuery, createServiceMutation, updateServiceMutation, deleteServiceMutation } = useServices();
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceStatus, setNewServiceStatus] = useState<typeof statusOptions[number]>("Operational");

  if (servicesQuery.isLoading) return <div>Loading services...</div>;
  if (servicesQuery.isError) return <div>Error loading services.</div>;

  const onCreate = () => {
    if (!newServiceName.trim()) return alert("Service name required");
    createServiceMutation.mutate({ name: newServiceName, status: newServiceStatus });
    setNewServiceName("");
    setNewServiceStatus("Operational");
  };

  const onDelete = (id: string) => {
    if (window.confirm("Delete this service?")) {
      deleteServiceMutation.mutate(id);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Services Management</h2>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Add New Service</h3>
        <input
          type="text"
          placeholder="Service Name"
          className="border p-2 rounded mr-2"
          value={newServiceName}
          onChange={(e) => setNewServiceName(e.target.value)}
        />
        <select
          className="border p-2 rounded mr-2"
          value={newServiceStatus}
          onChange={(e) => setNewServiceStatus(e.target.value as typeof statusOptions[number])}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={onCreate}
          disabled={createServiceMutation.isLoading}
        >
          Add Service
        </button>
      </div>

      <div className="space-y-4">
        {servicesQuery.data?.map((service) => (
          <div
            key={service.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold text-lg">{service.name}</h4>
              <p>Status: {service.status}</p>
            </div>
            <div>
              <button
                onClick={() => onDelete(service.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                disabled={deleteServiceMutation.isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
