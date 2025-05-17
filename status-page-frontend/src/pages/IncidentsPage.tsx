import React, { useEffect, useState } from 'react';
import api from '../lib/api';

interface Incident {
  id: string;
  title: string;
  status: string;
  description: string;
  created_at: string;
}

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchIncidents = async () => {
    try {
      const response = await api.get('/incidents');
      setIncidents(response.data);
    } catch (err) {
      setError('Failed to load incidents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Incidents</h1>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {/* TODO: Add create incident handler */}}
        >
          Create Incident
        </button>
      </div>

      <div className="grid gap-4">
        {incidents.map(incident => (
          <div key={incident.id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{incident.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(incident.created_at).toLocaleString()}
                </p>
                <p className="text-gray-600 mt-2">{incident.description}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  className="text-blue-500 hover:text-blue-600"
                  onClick={() => {/* TODO: Add edit handler */}}
                >
                  Edit
                </button>
                <button 
                  className="text-red-500 hover:text-red-600"
                  onClick={() => {/* TODO: Add delete handler */}}
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

export default IncidentsPage;
