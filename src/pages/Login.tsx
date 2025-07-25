/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services";
import { useState } from "react";
import type { LoginFormUser, User } from "../types";
import { useDispatch } from "react-redux";
import { addLoggedUser } from "../Redux/slice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUserObj, setLoginUserObj] = useState<LoginFormUser>({
    email: "",
    password: "",
  });

  // Getting users from services with reactQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Login
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Comparing login credentials with registered users
    const user = data.find(
      (user: User) =>
        user.email === loginUserObj.email &&
        user.password === loginUserObj.password
    );

    if (!user) {
      alert("Wrong credentials!");
      return;
    }

    // Keeping user in Redux
    if (user) {
      alert("Credentials are matching!");
      dispatch(addLoggedUser(user));
      navigate("/");
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="auth-wrapper">
      <div className="form-wrapper">
        <div className="auth-logo">MOVIE REVIEW APP</div>
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
