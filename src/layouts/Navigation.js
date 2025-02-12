import React from "react";
import { FaHome, FaRegListAlt, FaRegCircle, FaRegCheckCircle, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav className="absolute w-full bottom-0 left-0 bg-orange border-gray-200">
            <div className="flex justify-around p-3">
                <Link to="/home" className="flex flex-col items-center text-gray-700">
                    <FaHome size={24} />
                    <span className="text-sm">Home</span>
                </Link>
                <Link to="/list" className="flex flex-col items-center text-gray-700">
                    <FaRegListAlt size={24} />
                    <span className="text-sm">List</span>
                </Link>
                <Link to="/circle" className="flex flex-col items-center text-gray-700">
                    <FaRegCircle size={24} />
                    <span className="text-sm">Circle</span>
                </Link>
                <Link to="/check" className="flex flex-col items-center text-gray-700">
                    <FaRegCheckCircle size={24} />
                    <span className="text-sm">Check</span>
                </Link>
                <Link to="/users" className="flex flex-col items-center text-gray-700">
                    <FaUsers size={24} />
                    <span className="text-sm">Users</span>
                </Link>
            </div>
        </nav>
    );
}

export default Navigation;
