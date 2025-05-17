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
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Services Management</h2>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Add New Service</h3>
        {/* Existing input fields and button code for adding a service */}
      </div>

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
                      service.status === 'operational' ? 'bg-green-100 text-green-800' :
                      service.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                    <button className="text-blue-500 hover:text-blue-600" onClick={() => {}}>Edit</button>
                    <button className="text-red-500 hover:text-red-600" onClick={() => deleteService(service.id)}>Delete</button>
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
