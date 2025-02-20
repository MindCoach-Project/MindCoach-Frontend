import { useState } from "react";
import { useGlobalState } from "../global/state";
import { actions } from "../global/state";
import { site_path } from "../utils";
import { Logo, PageTitle, Input, Button } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "../components/ui/ToastMessage";
import { loginUser } from "../api/auth/login";
import { API_BASE_URL } from "../global/state/constants";

function Login() {
  const [state, dispatch] = useGlobalState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null); // Phản hồi từ server
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
       /// trả về toàn bộ response là được 

      setToast({ type: "success", message: "Login successful!1" }); //ko vào

      const { token, username, email, imageUrl } = response.data;

      setToast({ type: "success", message: "Login successful!2" }); // ko vào
      // Lưu token vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ username, email, imageUrl }));

      // Cập nhật global state
      dispatch(actions.setIsLogin(true));
      dispatch(actions.setUser({ username, email, imageUrl }));

      setToast({ type: "success", message: "Login successful!" });

      navigate(site_path.HOME);
    } catch (error) {


      setToast({ type: "fail", message: "Login failed!3" }); // giá trị trả về được 
      
      // setToast({ type: "success", message: error });
      let errorMessage = "Login failed. Please try again.";
      let errorData = null;

      if (error.response) {
        errorMessage = error.response.data?.message || "Unexpected error from server.";
        errorData = error.response.data;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setResponse({
        response: response,
        errorData: errorData,
        error: error
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6">
      <p>{API_BASE_URL}</p>
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
      
     

      {/* Hiển thị response data */}
      {response && (
        <div className="text-green-500 bg-green-100 p-3 rounded-md w-3/4">
          <strong>Response Data:</strong>
          <pre className="text-left">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {toast && <ToastMessage type={toast.type} message={toast.message} />}
    </div>
  );
}

export default Login;
