/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom";
import logoutIcon from "../assets/icons/logout-icon.svg";
import Modal from "./Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/slice";
import type { RootState } from "../Redux/store";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useState<boolean>(false);

  // Get logged user from Redux
  const user = useSelector((state: RootState) => state.auth.loggedInUser);

  // Modal
  function handleLogoutModal() {
    setLogoutModal((prev) => !prev);
  }

  // Logout
  function handleLogoutUser() {
    dispatch(logoutUser());
    navigate("/login");
  }

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-logo-wrapper">
          <div className="sidebar-logo-text">MOVIE REVIEW APP</div>
        </div>
        <div className="sidebar-nav-wrapper">
          {/* <div className="sidebar-item">
          <span>GLAVNA</span>
        </div> */}
          <NavLink to={"/"}>
            <div className="sidebar-item">
              <span>HOME</span>
            </div>
          </NavLink>
          {user ? (
            <>
              <NavLink to={"/movies"}>
                <div className="sidebar-item">
                  <span>MOVIES</span>
                </div>
              </NavLink>
              <NavLink to={"/blog"}>
                <div className="sidebar-item">
                  <span>BLOG</span>
                </div>
              </NavLink>
              <NavLink to={"/review"}>
                <div className="sidebar-item">
                  <span>REVIEWS</span>
                </div>
              </NavLink>
              <NavLink to={"/profile"}>
                <div className="sidebar-item">
                  <span>PROFILE</span>
                </div>
              </NavLink>
              {user?.role === "admin" && (
                <NavLink to={"/admin"}>
                  <div className="sidebar-item">
                    <span>ADMIN PANEL</span>
                  </div>
                </NavLink>
              )}
            </>
          ) : (
            <div className="sidebar-item">
              Please{" "}
              <span
                style={{ color: "blue" }}
                onClick={() => navigate("/login")}
              >
                login
              </span>{" "}
              to see all pages
            </div>
          )}
        </div>
        <div className="sidebar-bottom-wrapper">
          {user ? (
            <>
              <div className="profile-info-wrapper">
                <div className="sidebar-item">{user.email}</div>
                <div className="sidebar-item">{user.role}</div>
              </div>
              <div className="logout">
                <div>
                  <img
                    onClick={handleLogoutModal}
                    src={logoutIcon}
                    alt="logout icon"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="logout">
              <div>
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn--primary"
                >
                  <span>Login</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={logoutModal ? "d-block" : "d-none"}>
        <Modal>
          <div>
            <p>Are you sure you want to logout?</p>
            <div>
              <button
                onClick={handleLogoutUser}
                className="btn btn--primary mr-16"
              >
                <span>Yes</span>
              </button>
              <button
                onClick={() => setLogoutModal(false)}
                className="btn btn-primary "
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Sidebar;
