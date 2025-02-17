import { useState } from "react";
import { useGlobalState } from "../global/state";
import { actions } from "../global/state";
import { site_path } from "../utils";
import { Logo, PageTitle, Input, Button } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "../components/ui/ToastMessage";
import { loginUser } from "../api";

function Login() {
  const [state, dispatch] = useGlobalState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Xóa lỗi khi nhập lại
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required.";
    }

    return validationErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await loginUser(formData);
      const { token, username, email, imageUrl } = response.data;

      // Lưu token vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ username, email, imageUrl }));

      // Cập nhật global state
      dispatch(actions.setIsLogin(true));
      dispatch(actions.setUser({ username, email, imageUrl }));

      setToast({ type: "success", message: "Login sucessful!" });

      navigate(site_path.HOME);
    } catch (error) {
      if (error.status === 400) {
        setErrors({ email: "Invalid email or password. Please try again." });
      } else {
        setToast({ type: "error", message: error.title || "Login failed." });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-24">
      <Logo />
      <PageTitle title="Sign In" />
      <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
        <Input
          id="email"
          name="email"
          label="Email"
          type="text"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.email}
        />
        <p className="text-left text-16 text-brown">Forgot password?</p>
        <div className="flex justify-center">
          <Button className="w-1/2" size="lg" type="submit">
            Sign In
          </Button>
        </div>
      </form>
      <p className="text-16 text-gray-700">
        Don't have an account?{" "}
        <Link to="/register" className="text-orange">
          Sign Up
        </Link>
      </p>
      {toast && <ToastMessage type={toast.type} message={toast.message} />}
    </div>
  );
}

export default Login;
