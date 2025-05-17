import React, { useState } from "react";
import { Incident, useIncidentUpdates } from "../hooks/useIncidents";

interface Props {
  incident: Incident;
  onUpdateStatus: (id: string, status: Incident["status"]) => void;
  onDelete: (id: string) => void;
}

const IncidentCard: React.FC<Props> = ({ incident, onUpdateStatus, onDelete }) => {
  const { incidentUpdatesQuery, addUpdateMutation } = useIncidentUpdates(incident.id);
  const [newUpdateText, setNewUpdateText] = useState("");

  if (incidentUpdatesQuery.isLoading) return <p>Loading updates...</p>;
  if (incidentUpdatesQuery.isError) return <p>Error loading updates.</p>;

  const handleAddUpdate = () => {
    if (!newUpdateText.trim()) return;
    addUpdateMutation.mutate(newUpdateText);
    setNewUpdateText("");
  };

  const statusOptions = [
    "open",
    "investigating",
    "resolved",
    "scheduled",
    "maintenance",
  ] as Incident["status"][];

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow">
      <h4 className="font-bold text-lg mb-2">{incident.title}</h4>
      <p className="mb-2">{incident.description}</p>

      <div className="mb-2">
        <label className="mr-2 font-semibold">Status:</label>
        <select
          value={incident.status}
          onChange={(e) => onUpdateStatus(incident.id, e.target.value as Incident["status"])}
          className="border rounded p-1"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <h5 className="font-semibold mb-1">Updates:</h5>
        {incidentUpdatesQuery.data?.length === 0 && <p>No updates yet.</p>}
        <ul className="mb-2 max-h-40 overflow-y-auto">
          {incidentUpdatesQuery.data?.map((update) => (
            <li key={update.id} className="border-t pt-1 text-sm">
              {update.updateText} <span className="text-gray-500 text-xs italic">({new Date(update.createdAt).toLocaleString()})</span>
            </li>
          ))}
        </ul>
        <textarea
          rows={2}
          placeholder="Add update..."
          value={newUpdateText}
          onChange={(e) => setNewUpdateText(e.target.value)}
          className="border p-2 rounded w-full mb-1"
        />
        <button
          onClick={handleAddUpdate}
          disabled={addUpdateMutation.isLoading}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add Update
        </button>
      </div>

      <button
        onClick={() => onDelete(incident.id)}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Delete Incident
      </button>
    </div>
  );
};

export default IncidentCard;
