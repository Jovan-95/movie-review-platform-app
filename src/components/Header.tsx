/* eslint-disable @typescript-eslint/no-unused-vars */
import searchIcon from "../assets/icons/search-icon.svg";
import bellIcon from "../assets/icons/bell-icon.svg";
import profileIcon from "../assets/icons/profile-icon.svg";
import Modal from "./Modal";
import { useState } from "react";

function Header() {
  const [notificationsModal, setNotificationsModal] = useState(false);

  function showNotificationsModal() {
    setNotificationsModal((prev) => !prev);
  }

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
            <img onClick={showNotificationsModal} src={bellIcon} alt="" />
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
      {/* Modal */}
      <div className={notificationsModal ? "d-block" : "d-none"}>
        <Modal>
          <div>
            <div style={{ textAlign: "right" }}>
              <span
                onClick={() => setNotificationsModal(false)}
                style={{ cursor: "pointer" }}
              >
                X
              </span>
            </div>
            <div>Notifications:</div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Header;
