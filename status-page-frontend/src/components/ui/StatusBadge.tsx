interface StatusBadgeProps {
  status: string;
  className?: string;
}

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'operational':
      return 'bg-green-100 text-green-800';
    case 'degraded':
    case 'degraded performance':
      return 'bg-yellow-100 text-yellow-800';
    case 'partial outage':
      return 'bg-orange-100 text-orange-800';
    case 'major outage':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => (
  <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(status)} ${className}`}>
    {status}
  </span>
);
