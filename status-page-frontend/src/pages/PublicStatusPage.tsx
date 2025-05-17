import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface Service {
  id: string;
  name: string;
  status: "operational" | "degraded" | "partial_outage" | "major_outage";
}

interface Incident {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  created_at: string;
}

const PublicStatusPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    // Fetch services and incidents
    const fetchData = async () => {
      const servicesRes = await fetch("/api/v1/services");
      const incidentsRes = await fetch("/api/v1/incidents");
      setServices(await servicesRes.json());
      setIncidents(await incidentsRes.json());
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">System Status</h1>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold">Services</h2>
        </CardHeader>
        <CardContent>
          {services.map((service) => (
            <div
              key={service.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <span>{service.name}</span>
              <span className={`status-${service.status}`}>{service.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Active Incidents</h2>
        </CardHeader>
        <CardContent>
          {incidents.map((incident) => (
            <div key={incident.id} className="p-4 border-b">
              <h3 className="font-medium">{incident.title}</h3>
              <p className="text-sm text-gray-500">
                Status: {incident.status}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicStatusPage;
