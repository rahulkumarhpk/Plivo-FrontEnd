import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="font-bold">
            Status Page
          </Link>
          <div className="flex gap-4">
            <Link to="/organizations" className="hover:text-gray-600">
              Organizations
            </Link>
            <Link to="/services" className="hover:text-gray-600">
              Services
            </Link>
            <Link to="/incidents" className="hover:text-gray-600">
              Incidents
            </Link>
            <Link to="/status" className="hover:text-gray-600">
              Public Status
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
