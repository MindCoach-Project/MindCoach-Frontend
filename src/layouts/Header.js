import { useEffect, useState } from "react";
import { Logo } from "../components/ui";
import { Link } from "react-router-dom";
import { FaUser, FaBell } from "react-icons/fa";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Lấy thông tin người dùng từ localStorage
    }
  }, []);

  return (
    <div className="flex justify-between z-50">
      <Logo width={120} />
      <div className="flex items-center gap-12">
        <Link to="/notification">
          <FaBell size={24} />
        </Link>
        <Link to="/profile">
          {user ? (
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-1 border-brown"
            />
          ) : (
            <FaUser size={24} />
          )}
        </Link>
      </div>
    </div>
  );
}

export default Header;
