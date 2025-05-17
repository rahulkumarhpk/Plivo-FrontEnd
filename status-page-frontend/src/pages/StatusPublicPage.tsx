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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 bg-white shadow-sm">
          <h1 className="text-2xl font-bold">System Status</h1>
        </div>
        <div className="flex-1 p-6">
          <div className="text-center py-12">Loading status information...</div>
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
        <div className="flex-1 p-6">
          <div className="text-red-500 text-center py-12">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Fixed header section */}
      <div className="px-6 py-4 bg-white shadow-sm border-b">
        <h1 className="text-2xl font-bold">System Status</h1>
      </div>

      {/* Main content with fixed height containers that scroll independently */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          {/* Services Section - scrollable box with grid layout */}
          <div className="mb-6 h-[60vh]">
            <h2 className="text-xl font-semibold mb-2">Services</h2>
            <div className="border rounded-lg shadow-sm bg-gray-50 p-4 h-[calc(100%-2rem)] overflow-hidden">
              <div className="h-full overflow-auto">
                <div className="grid grid-cols-3 gap-4 auto-rows-max">
                  {services.map((service) => (
                    <div 
                      key={service.id}
                      className="p-4 bg-white border rounded-lg shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{service.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2 text-sm">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Active Incidents Section - scrollable box with grid layout */}
          <div className="h-[60vh]">
            <h2 className="text-xl font-semibold mb-2">Active Incidents</h2>
            <div className="border rounded-lg shadow-sm bg-gray-50 p-4 h-[calc(100%-2rem)] overflow-hidden">
              <div className="h-full overflow-auto">
                {incidents.length === 0 ? (
                  <p className="text-gray-600 p-4 bg-white rounded-lg">No active incidents</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4 auto-rows-max">
                    {incidents.map((incident) => (
                      <div 
                        key={incident.id}
                        className="p-4 bg-white border rounded-lg shadow-sm"
                      >
                        <h3 className="font-medium">{incident.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Status: <span className="font-medium">{incident.status}</span>
                        </p>
                        <p className="text-gray-600 mt-2 text-sm">{incident.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(incident.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicStatusPage;
