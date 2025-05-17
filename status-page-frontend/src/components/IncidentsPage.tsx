import React, { useState } from "react";
import { useIncidents } from "../hooks/useIncidents";
import IncidentCard from "../components/IncidentCard";
import { Incident } from "../api/incidents";
import { useServices } from "../hooks/useServices";

const IncidentsPage = () => {
  const { incidentsQuery, createIncidentMutation, updateIncidentMutation, deleteIncidentMutation } = useIncidents();
  const { servicesQuery } = useServices();

  const [newIncidentTitle, setNewIncidentTitle] = useState("");
  const [newIncidentDescription, setNewIncidentDescription] = useState("");
  const [newIncidentServiceId, setNewIncidentServiceId] = useState<string | null>(null);
  const [newIncidentStatus, setNewIncidentStatus] = useState<Incident["status"]>("open");

  if (incidentsQuery.isLoading || servicesQuery.isLoading) return <div>Loading...</div>;
  if (incidentsQuery.isError || servicesQuery.isError) return <div>Error loading data.</div>;

  const onCreateIncident = () => {
    if (!newIncidentTitle.trim() || !newIncidentServiceId) return alert("Please enter title and select service");
    createIncidentMutation.mutate({
      title: newIncidentTitle,
      description: newIncidentDescription,
      serviceId: newIncidentServiceId,
      status: newIncidentStatus,
    });
    setNewIncidentTitle("");
    setNewIncidentDescription("");
    setNewIncidentServiceId(null);
    setNewIncidentStatus("open");
  };

  const onUpdateStatus = (id: string, status: Incident["status"]) => {
    updateIncidentMutation.mutate({ id, updates: { status } });
  };

  const onDelete = (id: string) => {
    if (window.confirm("Delete this incident?")) {
      deleteIncidentMutation.mutate(id);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Incidents Management</h2>

      <div className="mb-6 p-4 bg-white rounded shadow max-w-lg">
        <h3 className="font-semibold mb-2">Report New Incident / Maintenance</h3>
        <input
          type="text"
          placeholder="Incident Title"
          value={newIncidentTitle}
          onChange={(e) => setNewIncidentTitle(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={newIncidentDescription}
          onChange={(e) => setNewIncidentDescription(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
          rows={3}
        />
        <select
          value={newIncidentServiceId ?? ""}
          onChange={(e) => setNewIncidentServiceId(e.target.value || null)}
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="">Select Service</option>
          {servicesQuery.data?.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        <select
          value={newIncidentStatus}
          onChange={(e) => setNewIncidentStatus(e.target.value as Incident["status"])}
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="open">Open</option>
          <option value="investigating">Investigating</option>
          <option value="resolved">Resolved</option>
          <option value="scheduled">Scheduled</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button
          onClick={onCreateIncident}
          disabled={createIncidentMutation.isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Incident
        </button>
      </div>

    </div>
  );
};

export default IncidentsPage;
