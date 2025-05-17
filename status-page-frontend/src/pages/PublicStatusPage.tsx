import React, { useEffect, useState } from 'react';
import api from '../lib/api';

interface Service {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  description: string;
}

interface Incident {
  id: string;
  title: string;
  status: string;
  created_at: string;
  description: string;
}

const PublicStatusPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesRes, incidentsRes] = await Promise.all([
          api.get('/services'),
          api.get('/incidents')
        ]);
        setServices(servicesRes.data);
        setIncidents(incidentsRes.data);
      } catch (err) {
        setError('Failed to load status information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 bg-white shadow-sm">
          <h1 className="text-2xl font-bold">System Status</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center py-12">Loading status information...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 bg-white shadow-sm">
          <h1 className="text-2xl font-bold">System Status</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-red-500 text-center py-12">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Fixed header section */}
      <div className="px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold">System Status</h1>
      </div>

      {/* Container with fixed height that scrolls */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          {/* Services Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            <div className="grid gap-4">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className="p-4 border rounded-lg shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{service.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      service.status === 'operational' ? 'bg-green-100 text-green-800' :
                      service.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Active Incidents Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Active Incidents</h2>
            <div className="grid gap-4">
              {incidents.length === 0 ? (
                <p className="text-gray-600">No active incidents</p>
              ) : (
                incidents.map((incident) => (
                  <div 
                    key={incident.id}
                    className="p-4 border rounded-lg shadow-sm"
                  >
                    <h3 className="font-medium">{incident.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Status: {incident.status}
                    </p>
                    <p className="text-gray-600 mt-2">{incident.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(incident.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicStatusPage;
