import searchIcon from "../assets/icons/search-icon.svg";
import bellIcon from "../assets/icons/bell-icon.svg";
import profileIcon from "../assets/icons/profile-icon.svg";

function Header() {
  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="search-wrapper">
          <img src={searchIcon} alt="" />
          <input
            className="header-search"
            placeholder="Search..."
            type="search"
          />
        </div>
        <div className="time-wrapper">
          <div className="time">Dec 16, 2023</div>
          <div className="time">09:22</div>
        </div>
        <div className="profile-wrapper">
          <div>
            <img src={bellIcon} alt="" />
          </div>
          <div>
            <img src={profileIcon} alt="" />
          </div>
        </div>
      </div>
      <div className="boxes-wrapper">
        <div className="box mr-16">
          <div>Text</div>
          <div>100</div>
        </div>
        <div className="box mr-16">
          <div>Text</div>
          <div>100</div>
        </div>
        <div className="box mr-16">
          <div>Text</div>
          <div>100</div>
        </div>
        <div className="box">
          <div>Text</div>
          <div>100</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
