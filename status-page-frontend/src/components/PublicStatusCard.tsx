import React from "react";

interface Props {
  service: {
    id: string;
    name: string;
    status: string;
  };
}

const statusColors: Record<string, string> = {
  operational: "text-green-600",
  degraded: "text-yellow-500",
  partial_outage: "text-orange-600",
  major_outage: "text-red-700",
};

const PublicStatusCard: React.FC<Props> = ({ service }) => {
  const statusText = service.status.replace(/_/g, " ").toUpperCase();

  return (
    <div className="border p-4 rounded shadow bg-white mb-4">
      <h3 className="text-lg font-semibold">{service.name}</h3>
      <p className={`font-bold ${statusColors[service.status] || "text-gray-700"}`}>
        {statusText}
      </p>
    </div>
  );
};

export default PublicStatusCard;
