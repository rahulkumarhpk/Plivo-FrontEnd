import React, { useEffect, useState } from 'react';
import api from '../lib/api';

interface Service {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  description: string;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const createService = async (serviceData: Omit<Service, 'id'>) => {
    try {
      const response = await api.post('/services/', serviceData);
      setServices([...services, response.data]);
    } catch (err) {
      setError('Failed to create service');
    }
  };

  const updateService = async (id: string, serviceData: Partial<Service>) => {
    try {
      const response = await api.put(`/services/${id}`, serviceData);
      setServices(services.map(service => 
        service.id === id ? response.data : service
      ));
    } catch (err) {
      setError('Failed to update service');
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
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Service
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="grid gap-4">
        {services.map(service => (
          <div key={service.id} className="border p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-medium">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
              <span className={`inline-block px-2 py-1 rounded text-sm mt-2 ${
                service.status === 'operational' ? 'bg-green-100 text-green-800' :
                service.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {service.status}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-500" onClick={() => {}}>Edit</button>
              <button className="text-red-500" onClick={() => deleteService(service.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
