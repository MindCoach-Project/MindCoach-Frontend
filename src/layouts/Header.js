import { Logo } from "../components/ui";
import { Link } from "react-router-dom";
import { FaUser, FaBell } from "react-icons/fa";

function Header() {
  return (
    <div className="flex justify-between">
      <Logo />
      <div className="flex items-center gap-12">
        <Link to="/notification">
          <FaBell size={24} />
        </Link>
        <Link to="/profile">
          <FaUser size={24} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
