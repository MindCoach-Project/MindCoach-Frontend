import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useGlobalState } from "../global/state";
import { actions } from "../global/state";
import { site_path } from "../utils";

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
  async function handleLogin(e, username, password) {
    e.preventDefault();
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
    <div className="">
      <div className="">
        <div className="ml-0 py-4">
          <div className="">
            <div className="">
              <h1 className="py-2 text-red100">Log in</h1>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="row pt-3">
            <div className="col-md-12">
              <section>
                <form id="account" method="post">
                  <h2 className="border-bottom pb-3 mb-4 text-secondary text-center">
                    Use a local account to log in.
                  </h2>
                  <div
                    asp-validation-summary="ModelOnly"
                    className="text-danger"
                    role="alert"
                  ></div>
                  <div className="form-floating mb-3">
                    <input
                      htmlFor="Username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="name@example.com"
                      name="username"
                      autoComplete="username"
                    />
                    <label htmlFor="Username" className="form-label">
                      Username
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      htmlFor="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="password"
                      type="password"
                      name="password"
                      autoComplete="current-password"
                    />
                    <label htmlFor="Password" className="form-label text-red90">
                      Password
                    </label>
                  </div>
                  <div>
                    <button
                      onClick={(e) =>
                        handleLogin(e, formData.username, formData.password)
                      }
                      id="login-submit"
                      type="submit"
                      className="w-100 btn btn-lg btn-primary"
                    >
                      Log in
                    </button>
                  </div>
                  <div className="d-flex justify-content-between pt-2">
                    <p>
                      <Link>Forgot your password?</Link>
                    </p>
                    <p>
                      <Link to="/register">Register as a new user</Link>
                    </p>
                    <p>
                      <Link>Resend email confirmation</Link>
                    </p>
                  </div>
                </form>
              </section>
            </div>
            <div className="col-md-12 p-3 text-center">
              <section>
                <p className="divider-text d-flex pt-3">or</p>
                <div>
                  <p>
                    There are no external authentication services configured.
                    See this{" "}
                    <Link to="https://go.microsoft.com/fwlink/?LinkID=532715">
                      article about setting up this ASP.NET application to
                      support logging in via external services
                    </Link>
                    .
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
