import React, { useEffect, useState } from 'react';
import api from '../lib/api';

interface Incident {
  id: string;
  title: string;
  status: string;
  description: string;
  created_at: string;
  service_id?: number;
  organization_id?: number;
}

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'investigating',
    service_id: 0,
    organization_id: 0
  });
  const [editingId, setEditingId] = useState<string | null>(null);

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

  const handleCreateIncident = async () => {
    try {
      const response = await api.post('/incidents/', formData);
      setIncidents([...incidents, response.data]);
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setError('Failed to create incident');
    }
  };

  const handleUpdateIncident = async () => {
    if (!editingId) return;
    try {
      const { service_id, organization_id, ...updateData } = formData;
      const response = await api.put(`/incidents/${editingId}`, updateData);
      setIncidents(incidents.map(inc => inc.id === editingId ? response.data : inc));
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setError('Failed to update incident');
    }
  };

  const handleDeleteIncident = async (id: string) => { {
      try {
        await api.delete(`/incidents/${id}`);
        setIncidents(incidents.filter(inc => inc.id !== id));
      } catch (err) {
        setError('Failed to delete incident');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'investigating',
      service_id: 0,
      organization_id: 0
    });
    setEditingId(null);
  };

  const handleEdit = (incident: Incident) => {
    setFormData({
      title: incident.title,
      description: incident.description,
      status: incident.status,
      service_id: incident.service_id || 0,
      organization_id: incident.organization_id || 0
    });
    setEditingId(incident.id);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      handleUpdateIncident();
    } else {
      handleCreateIncident();
    }
  };

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
          onClick={() => setIsModalOpen(true)}
        >
          Create Incident
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Incident' : 'Create New Incident'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border rounded p-2 bg-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded p-2 bg-white"
                  required
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full border rounded p-2 bg-white"
                >
                  <option value="investigating">Investigating</option>
                  <option value="open">Open</option>
                  <option value="resolved">Resolved</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              {!editingId && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Service ID</label>
                    <input
                      type="number"
                      value={formData.service_id}
                      onChange={(e) => setFormData({...formData, service_id: parseInt(e.target.value)})}
                      className="w-full border rounded p-2 bg-white"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Organization ID</label>
                    <input
                      type="number"
                      value={formData.organization_id}
                      onChange={(e) => setFormData({...formData, organization_id: parseInt(e.target.value)})}
                      className="w-full border rounded p-2 bg-white"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border rounded bg-white text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                      onClick={() => handleEdit(incident)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteIncident(incident.id)}
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
