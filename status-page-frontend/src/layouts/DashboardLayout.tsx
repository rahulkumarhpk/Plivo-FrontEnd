// src/layouts/DashboardLayout.tsx
import { Link, Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="h-screen w-full p-4 bg-gray-50">
      <div className="flex h-full rounded-lg shadow-lg bg-white overflow-hidden">
        <aside className="w-64 bg-gray-100 flex-shrink-0">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          </div>
          <nav className="flex flex-col space-y-2 p-4">
            <Link to="/dashboard" className="px-4 py-2 hover:bg-gray-200 rounded">Dashboard</Link>
            <Link to="/dashboard/services" className="px-4 py-2 hover:bg-gray-200 rounded">Services</Link>
            <Link to="/dashboard/incidents" className="px-4 py-2 hover:bg-gray-200 rounded">Incidents</Link>
            <Link to="/dashboard/organizations" className="px-4 py-2 hover:bg-gray-200 rounded">Organizations</Link>
          </nav>
        </aside>
        <main className="flex-1 flex flex-col">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold">Your Dashboard</h1>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
