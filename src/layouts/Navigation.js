import React from "react";
import {
  FaHome,
  FaClipboardList,
  FaBell,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";
import { NavItem } from "../components/ui";

function Navigation() {
  const menuItems = [
    { id: 1, to: "/home", icon: FaHome, label: "Home" },
    { id: 2, to: "/tasks", icon: FaClipboardList, label: "Task" },
    { id: 3, to: "/reminder", icon: FaBell, label: "Reminder" },
    { id: 4, to: "/taskstatus", icon: FaCheckCircle, label: "Complete" },
    { id: 5, to: "/profile", icon: FaUser, label: "Profile" },
  ];

  return (
    <nav className="absolute w-full bottom-0 left-0 border-gray-200 bg-white shadow-md z-100">
      <div className="flex justify-around p-3">
        {menuItems.map((item) => (
          <NavItem
            key={item.id}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
