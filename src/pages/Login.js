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
  const [state, dispatch] = useGlobalState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(site_path.HOME); 
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    if (Object.values(validationErrors).some((error) => error)) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { data } = await loginUser(formData);
      const { token, username, email, imageUrl } = data;

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ username, email, imageUrl })
      );

      dispatch(actions.setIsLogin(true));
      dispatch(actions.setUser({ username, email, imageUrl }));

      setToast({ type: "success", message: "Login successful!" });
      navigate(site_path.HOME);
    } catch (error) {
      const errorMessage = "Invalid email or password.";
      setErrors({ email: errorMessage, password: errorMessage });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6">
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
          error={errors.password}
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
