import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api/auth/register";
import { site_path } from "../utils";
import { Logo, PageTitle, Input, Button } from "../components/ui";
import ToastMessage from "../components/ui/ToastMessage";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null); // Quản lý thông báo toast

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Xóa lỗi khi người dùng nhập lại
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.username.trim()) {
      validationErrors.username = "Username is required.";
    } else if (formData.username.length < 2) {
      validationErrors.username = "Username must have at least 2 characters.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password must have at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await registerUser(formData);
      setToast({ type: "success", message: response.message });
      setTimeout(() => navigate(site_path.LOGIN), 2000);
    } catch (error) {
      if (error.status === 400 && error.errors) {
        setErrors(error.errors);
      } else if (error.status === 409) {
        setErrors({ email: "This email is already in use." });
      } else {
        setToast({ type: "error", message: error.title || "Registration failed." });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-24">
      <Logo />
      <PageTitle title="Sign Up" />
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
        <Input
          id="username"
          name="username"
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
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
        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <div className="flex justify-center">
          <Button className="w-1/2" size="lg" type="submit">
            Sign Up
          </Button>
        </div>
      </form>
      <p className="text-16 text-gray-700">
        Already have an account? <Link to="/login" className="text-orange">Sign In</Link>
      </p>
      {toast && <ToastMessage type={toast.type} message={toast.message} />}
    </div>
  );
}

export default Register;
