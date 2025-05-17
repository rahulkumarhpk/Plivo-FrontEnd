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
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Incidents</h1>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {/* TODO: Add create incident handler */}}
        >
          Create Incident
        </button>
      </div>

      <div className="h-[calc(100vh-120px)] border rounded-lg shadow-sm bg-gray-50 p-4 overflow-hidden">
        <div className="h-full overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {incidents.map(incident => (
              <div key={incident.id} className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-lg mb-2">{incident.title}</h4>
                <p className="text-gray-600 mb-3">{incident.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {new Date(incident.created_at).toLocaleString()}
                  </p>
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
      </div>
    </div>
  );
};

export default IncidentsPage;
