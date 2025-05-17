import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import DashboardPage from "./pages/DashboardPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import ServicesPage from "./pages/ServicesPage";
import IncidentsPage from "./pages/IncidentsPage";
import StatusPublicPage from "./pages/StatusPublicPage";
import NotFoundPage from "./pages/NotFoundPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="organizations" element={<OrganizationsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="incidents" element={<IncidentsPage />} />
          <Route path="status" element={<StatusPublicPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
