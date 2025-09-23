/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { LoginFormUser, User } from "../types";
import { useDispatch } from "react-redux";
import { addLoggedUser } from "../Redux/slice";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services";
import Logo from "../assets/images/movie-logo.png"; // prilagodi putanju komponenti

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get users
  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [loginUserObj, setLoginUserObj] = useState<LoginFormUser>({
    email: "",
    password: "",
  });

  if (usersIsLoading) return <p>Loading...</p>;
  if (usersError) return <p>{usersError?.message}</p>;
  if (!users) return <p>No data found.</p>;

  // Login
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Comparing login credentials with registered users
    const user = users?.find(
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
          <img onClick={() => navigate("/")} src={Logo} alt="Logo" />
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
