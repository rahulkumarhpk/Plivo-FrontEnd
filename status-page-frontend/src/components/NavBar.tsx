import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white shadow h-16 flex-shrink-0 w-full">
      <div className="w-full h-full px-4">
        <div className="flex h-full items-center justify-between">
          <Link to="/" className="font-bold text-xl">
            Status Page
          </Link>
          <div className="flex space-x-8">
            <Link to="/organizations" className="hover:text-gray-600 px-3 py-2">
              Organizations
            </Link>
            <Link to="/services" className="hover:text-gray-600 px-3 py-2">
              Services
            </Link>
            <Link to="/incidents" className="hover:text-gray-600 px-3 py-2">
              Incidents
            </Link>
            <Link to="/status" className="hover:text-gray-600 px-3 py-2">
              Public Status
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
