import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      <div className="form-wrapper">
        <div className="auth-logo">MOVIE REVIEW APP</div>
        <div className="auth-heading">Login</div>

        <div className="input-wrapper">
          <label>Email</label>
          <input type="email" />
        </div>
        <div className="input-wrapper">
          <label>Password</label>
          <input type="password" />
        </div>

        <div className="button-wrapper">
          <button className="btn btn--primary">
            <span>Login</span>
          </button>
        </div>

        <p className="login-text">
          Don't have an account? Register{" "}
          <span onClick={() => navigate("/register")}>here!</span>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
