import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavItem({ to, icon: Icon, label }) {
    const location = useLocation();
    const isActive = location.pathname === to;
  
    return (
      <Link to={to} className="flex flex-col items-center">
        <Icon size={24} className={isActive ? "text-orange" : "text-gray-600"} />
        <span className={`text-sm ${isActive ? "text-orange font-semibold" : "text-gray-600"}`}>
          {label}
        </span>
      </Link>
    );
}

export default NavItem;
