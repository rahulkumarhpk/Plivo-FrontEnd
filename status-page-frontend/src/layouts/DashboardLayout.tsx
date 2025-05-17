// src/layouts/DashboardLayout.tsx
import { Link, Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        <nav className="space-y-2">
          <Link to="/dashboard" className="block">Dashboard</Link>
          <Link to="/dashboard/services" className="block">Services</Link>
          <Link to="/dashboard/incidents" className="block">Incidents</Link>
          <Link to="/dashboard/organizations" className="block">Organizations</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
