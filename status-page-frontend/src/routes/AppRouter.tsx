
import { Route, Routes } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/Dashboard'
import Services from '../pages/Services'
import Incidents from '../pages/Incidents'
import Organizations from '../pages/Organizations'
import Login from '../pages/Login'
import PublicStatusPage from '../pages/PublicStatusPage'

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Status Page */}
      <Route path="/" element={<PublicStatusPage />} />

      {/* Auth/Login */}
      <Route path="/login" element={<Login />} />

      {/* Protected Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="organizations" element={<Organizations />} />
      </Route>
    </Routes>
  )
}
