/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom";
import logoutIcon from "../assets/icons/logout-icon.svg";

function Sidebar() {
  const navigate = useNavigate();

  return (
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
        <NavLink to={"/profile"}>
          <div className="sidebar-item">
            <span>PROFILE</span>
          </div>
        </NavLink>
        {/* <NavLink to={"/notifications"}>
          <div className="sidebar-item">
            <span>NOTIFICATIONS</span>
          </div>
        </NavLink> */}
        <NavLink to={"/admin"}>
          <div className="sidebar-item">
            <span>ADMIN PANEL</span>
          </div>
        </NavLink>
      </div>
      <div className="sidebar-bottom-wrapper">
        <div className="profile-info-wrapper">
          <div className="sidebar-item">Jovan Vuksanovic</div>
          <div className="sidebar-item">Role</div>
        </div>
        <div className="logout">
          <div>
            <img src={logoutIcon} alt="logout icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
