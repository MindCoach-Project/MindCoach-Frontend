import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useGlobalState } from "../global/state";
import { actions } from "../global/state";
import { site_path } from "../utils";
import { Logo, PageTitle, Input, Button } from "../components/ui";

function Register() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // if (formData.password !== formData.confirmPassword) {
    //   toast.error("Passwords do not match!");
    //   return;
    // }
    
    // Registration logic
    
    toast.success("Signup successful! Please log in.");
    navigate(site_path.LOGIN);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-24">
      <Logo />
      <PageTitle title="Sign Up" />
      <form className="w-full flex flex-col gap-12" onSubmit={handleSubmit}>
        <Input
          id="username"
          name="username"
          label="Username"
          type="text"
          placeholder="Enter your username"
        />
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
        />
        <Button type="submit">Sign Up</Button>
      </form>
      <p className="text-16 text-gray-700">
        Already have an account? <Link to="/login" className="text-orange">Sign In</Link>
      </p>
    </div>
  );
}

export default Register;
