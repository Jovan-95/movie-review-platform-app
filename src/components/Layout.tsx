import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content-wrapper">
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
