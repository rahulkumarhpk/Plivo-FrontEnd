// src/layouts/DashboardLayout.tsx
import { Link, Outlet, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/dashboard/services', label: 'Services' },
  { path: '/dashboard/incidents', label: 'Incidents' },
  { path: '/dashboard/organizations', label: 'Organizations' },
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="h-screen w-full p-4 bg-gray-50">
      <div className="flex h-full rounded-lg shadow-lg bg-white overflow-hidden">
        <aside className="w-64 bg-gray-100 flex-shrink-0">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          </div>
          <nav className="flex flex-col space-y-2 p-4">
            {NAV_ITEMS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded transition-colors ${
                  location.pathname === path
                    ? 'bg-gray-200 text-gray-900'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
