import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useGlobalState } from "../global/state";
import { actions } from "../global/state";
import { site_path } from "../utils";
import { Logo, PageTitle, Input, Button } from "../components/ui";

function Login() {
  const [state, dispatch] = useGlobalState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function handleLogin(e) {
    e.preventDefault();
    const { username, password } = formData; // Lấy username và password từ formData
    if (username === "admin" && password === "admin") {
      localStorage.setItem("token", "ok");
      dispatch(actions.setIsLogin(true));
      toast.success("Login is successfully");
      navigate(site_path.HOME);
    } else {
      toast.error(
        "There are wrong this here, please typing username and password again"
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-center gap-24">
      <Logo />
      <PageTitle title="Sign In" />
      <form className="w-full flex flex-col gap-18" onSubmit={handleLogin}>
        <Input
          id="username"
          name="username"
          label="Email"
          type="text"
          placeholder="Enter your username"
          onChange={handleChange}
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
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
    </div>
  );
}

export default Login;
