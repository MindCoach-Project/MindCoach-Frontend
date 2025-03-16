import { Logo } from "../components/ui";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useGlobalState } from "../global/state";

function Header() {
  const { state } = useGlobalState();
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/8792/8792047.png";

  const isValidImageUrl = (url) => {
    return (
      url &&
      (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg"))
    );
  };

  return (
    <div className="flex justify-between z-50 mt-12">
      <Link to="/home">
        <Logo width={120} />
      </Link>
      <div className="flex items-center gap-12">
        <Link to="/profile">
          {state.user ? (
            <img
              src={
                isValidImageUrl(state.user.imageUrl)
                  ? state.user.imageUrl
                  : defaultImage
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
