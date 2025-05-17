import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar />
      <main className="w-full h-[calc(100vh-64px)] overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
