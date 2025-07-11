import logoutIcon from "../assets/icons/logout-icon.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo-wrapper">
        <div className="sidebar-logo-text">MOVIE REVIEW APP</div>
      </div>
      <div className="sidebar-nav-wrapper">
        <div className="sidebar-item">
          <span>GLAVNA</span>
        </div>
        <div className="sidebar-item">
          <span>HOME</span>
        </div>
        <div className="sidebar-item">
          <span>MOVIES</span>
        </div>
        <div className="sidebar-item">
          <span>BLOG</span>
        </div>
        <div className="sidebar-item">
          <span>PROFILE</span>
        </div>
        <div className="sidebar-item">
          <span>NOTIFICATIONS</span>
        </div>
        <div className="sidebar-item">
          <span>ADMIN PANEL</span>
        </div>
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
