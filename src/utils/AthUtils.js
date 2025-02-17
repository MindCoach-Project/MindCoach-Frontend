import { toast } from "react-toastify";

class AthUtils {
  static handleAuthorization() {
    toast.error("You are not permitted to access this page.", {
      position: "bottom-center",
      autoClose: 2000,
      onClose: () => {
        window.location.href = "/login";
      },
    });
  }
}

export default AthUtils;
