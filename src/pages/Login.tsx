/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { LoginFormUser, User } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { addLoggedUser } from "../Redux/slice";
import type { RootState } from "../Redux/store";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../components/Toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Users are called from redux, because they are needed on every page
  const { users, loading } = useSelector((state: RootState) => state.users);

  const [loginUserObj, setLoginUserObj] = useState<LoginFormUser>({
    email: "",
    password: "",
  });

  // Login
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Comparing login credentials with registered users
    const user = users.find(
      (user: User) =>
        user.email === loginUserObj.email &&
        user.password === loginUserObj.password
    );

    if (!user) {
      showErrorToast("Wrong credentials!");
      return;
    }

    if (user.status === "banned") {
      showErrorToast("You are banned!");
      return;
    }

    if (user.status === "rejected") {
      showErrorToast("You are rejected!");
      return;
    }

    if (user.status === "pending") {
      showInfoToast("Your registration is waiting for approval!");
      return;
    }

    // Keeping user in Redux
    if (user) {
      showSuccessToast("Credentials are matching!");
      dispatch(addLoggedUser(user));
      navigate("/");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="form-wrapper">
        <div className="auth-logo">
          <img
            onClick={() => navigate("/")}
            src="./src/assets/images/movie-logo.png"
          />
        </div>
        <div className="auth-heading">Login</div>

        <div className="input-wrapper">
          <label>Email</label>
          <input
            onChange={(e) =>
              setLoginUserObj({ ...loginUserObj, email: e.target.value })
            }
            value={loginUserObj.email}
            type="email"
          />
        </div>
        <div className="input-wrapper">
          <label>Password</label>
          <input
            onChange={(e) =>
              setLoginUserObj({ ...loginUserObj, password: e.target.value })
            }
            value={loginUserObj.password}
            type="password"
          />
        </div>

        <div className="button-wrapper">
          <button
            onClick={handleLogin}
            className="btn btn--primary"
            type="submit"
          >
            <span>Login</span>
          </button>
        </div>

        <p className="login-text">
          Don't have an account? Register{" "}
          <span onClick={() => navigate("/register")}>here!</span>{" "}
        </p>
        <p className="login-text">
          You can <span onClick={() => navigate("/")}>browse</span> without
          account, but you cant see all pages!
        </p>
      </div>
    </div>
  );
}

export default Login;
