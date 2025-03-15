import { useEffect, useState } from "react";
import { Logo } from "../components/ui";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
function Header() {
  const [user, setUser] = useState(null);
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/8792/8792047.png";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isValidImageUrl = (url) => {
    return (
      url &&
      (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg"))
    );
  };

  return (
    <div className="flex justify-between z-50 mt-12">
      <Logo width={120} />
      <div className="flex items-center gap-12">
        <Link to="/profile">
          {user ? (
            <img
              src={
                isValidImageUrl(user.imageUrl) ? user.imageUrl : defaultImage
              }
              alt="Profile"
              className="w-10 h-10 rounded-full border border-1 border-brown object-cover"
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
