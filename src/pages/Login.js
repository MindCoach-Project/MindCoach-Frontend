import { useState, useEffect } from "react";
import { useGlobalState } from "../global/state";
import { actions } from "../global/state";
import { site_path } from "../utils";
import { validateLoginForm } from "../utils";
import { Logo, PageTitle, Input, Button } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "../components/ui/ToastMessage";
import { loginUser } from "../api/auth/login";

function Login() {
  const { state, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(site_path.HOME);
    }
  }, [navigate]);

  const saveUserToLocalStorage = ({ token, username, email, imageUrl }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ username, email, imageUrl }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    if (Object.values(validationErrors).some((error) => error)) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await loginUser(formData);
      setToast({ type: "success", message: "Login successful!" });

      saveUserToLocalStorage(data);

      dispatch(actions.setIsLogin(true));
      dispatch(actions.setUser(data));

      setTimeout(() => navigate(site_path.HOME), 1000);
    } catch (error) {
      const errorMessage = "Invalid email or password.";
      setErrors({ email: errorMessage, password: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6">
      <Logo width={220} />
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
          error={errors.password}
        />
        <div className="flex justify-center mt-12">
          <Button
            className="w-1/2"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing..." : "Sign In"}
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
