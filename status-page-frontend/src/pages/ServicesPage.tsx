import React, { useEffect, useState } from 'react';
import api from '../lib/api';

interface Service {
  id: string;
  name: string;
  status: 'Operational' | 'Degraded Performance' | 'Partial Outage' | 'Major Outage';
  description: string;
  organization_id?: number;
}

interface ServiceFormData {
  id?: string;  // Add id for edit functionality
  name: string;
  status: Service['status'];
  description: string;
  organization_id: number;
}

interface Organization {
  id: number;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    status: 'Operational',
    description: '',
    organization_id: 0
  });

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (err) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const response = await api.get('/organizations/dropdown');
      setOrganizations(response.data.items.map((id: number) => ({ id })));
    } catch (err) {
      setError('Failed to load organizations');
    }
  };

  const handleCreateService = async () => {
    try {
      const response = await api.post('/services/', formData);
      setServices([...services, response.data]);
      setIsModalOpen(false);
      setFormData({ name: '', status: 'Operational', description: '', organization_id: 0 });
    } catch (err) {
      setError('Failed to create service');
    }
  };

  const handleUpdateService = async (id: string) => {
    try {
      const { organization_id, ...updateData } = formData;
      const response = await api.put(`/services/${id}`, updateData);
      setServices(services.map(service => 
        service.id === id ? response.data : service
      ));
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to update service');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      handleUpdateService(formData.id);
    } else {
      handleCreateService();
    }
  };

  const deleteService = async (id: string) => {
    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter(service => service.id !== id));
    } catch (err) {
      setError('Failed to delete service');
    }
  };

  useEffect(() => {
    fetchServices();
    fetchOrganizations();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Services Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded"
        >
          Add New Service
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {formData.id ? 'Edit Service' : 'Add New Service'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border rounded p-2 bg-white text-gray-900"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded p-2 bg-white text-gray-900"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as Service['status']})}
                  className="w-full border rounded p-2 bg-white text-gray-900"
                >
                  <option value="Operational">Operational</option>
                  <option value="Degraded Performance">Degraded Performance</option>
                  <option value="Partial Outage">Partial Outage</option>
                  <option value="Major Outage">Major Outage</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Organization</label>
                <select
                  value={formData.organization_id}
                  onChange={(e) => setFormData({...formData, organization_id: parseInt(e.target.value)})}
                  className="w-full border rounded p-2 bg-white text-gray-900"
                  required
                >

                  {organizations.map(org => (
                    <option key={org.id} value={org.id}>
                      {org.id}
                    </option>
                  ))}
                </select>

              </div>
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
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
                  {formData.id ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="h-[calc(100vh-200px)] border rounded-lg shadow-sm bg-gray-50 p-4 overflow-hidden">
        <div className="h-full overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(service => (
              <div key={service.id} className="bg-white border p-4 rounded-lg shadow-sm hover:shadow">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{service.name}</h3>
                    <p className="text-gray-600 mt-2">{service.description}</p>
                    <span className={`inline-block px-2 py-1 rounded text-sm mt-3 ${
                      service.status === 'Operational' ? 'bg-green-100 text-green-800' :
                      service.status === 'Degraded Performance' ? 'bg-yellow-100 text-yellow-800' :
                      service.status === 'Partial Outage' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                    <button 
                      className="text-blue-500 hover:text-blue-600" 
                      onClick={() => {
                        setFormData({
                          id: service.id,
                          name: service.name,
                          status: service.status,
                          description: service.description,
                          organization_id: service.organization_id || 0
                        });
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-600" 
                      onClick={() => deleteService(service.id)}
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

export default ServicesPage;
