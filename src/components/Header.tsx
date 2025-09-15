/* eslint-disable @typescript-eslint/no-unused-vars */
import searchIcon from "../assets/icons/search-icon.svg";
import bellIcon from "../assets/icons/bell-icon.svg";
import Modal from "./Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogs, getPopularMovies, getReviews } from "../services";
import useGlobalSearch from "../hooks/useGlobalSearch";
import Notifications from "./Notifications";
import type { User } from "../types";
import MobileModal from "./MobileModalNav";

function Header() {
  const [notificationsModal, setNotificationsModal] = useState(false);
  const navigate = useNavigate();

  // Mobile modal
  const [mobModal, setMobModal] = useState(false);

  // Users are loaded from redux
  const { users } = useSelector((state: RootState) => state.users);
  const [searchQuery, setSearchQuery] = useState("");
  const results = useGlobalSearch(searchQuery);

  function showNotificationsModal() {
    setNotificationsModal((prev) => !prev);
  }

  // Get logged user from Redux
  const user = useSelector((state: RootState) => state.auth.loggedInUser);
  // console.log("Header user", user);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Getting movies
  const {
    data: movies,
    isLoading: moviesIsLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getPopularMovies,
  });

  // Getting reviews from services with reactQuery
  const {
    data: reviews,
    isLoading: reviewsIsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  // Getting blogs from services with reactQuery
  const {
    data: blogs,
    isLoading: blogsIsLoading,
    error: blogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  // Error handling
  if (moviesIsLoading || reviewsIsLoading || blogsIsLoading)
    <div>{users ? users.length : "..."}</div>;
  if (moviesError || reviewsError || blogsError)
    return <p>{reviewsError?.message}</p>;

  // console.log(movies.results);
  // console.log(blogs);
  // console.log(users);
  // console.log(reviews);

  const currentUser = users.find(
    (foundUser: User) => String(foundUser.id) === String(user?.id)
  );

  function handleMobileNavModal() {
    setMobModal((prev) => !prev);
  }

  return (
    <div className="header-wrapper">
      {/* Desktop wrapper */}
      <div className="header">
        <div className="search-wrapper">
          <img src={searchIcon} alt="" />
          <input
            className="header-search"
            placeholder="Search..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* dp showing search results when typing starts */}
          {searchQuery && (
            <div className="search-results">
              <div
                onClick={() => setSearchQuery("")}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  cursor: "pointer",
                }}
              >
                X
              </div>
              {results.length === 0 ? (
                <div>No results found</div>
              ) : (
                results.map((item) => (
                  <NavLink key={item.id} to={`/${item.type}/${item.id}`}>
                    {" "}
                    <div key={item.id} className="search-result">
                      <strong>{item.type.toUpperCase()}:</strong>{" "}
                      {item.title || item.username}
                    </div>
                  </NavLink>
                ))
              )}
            </div>
          )}
        </div>
        <div className="time-wrapper">
          <div className="time">{formattedDate}</div>
          <div className="time">{formattedTime}</div>
        </div>
        <div className="profile-wrapper">
          {user ? (
            <div className="profile-name">{currentUser?.username}</div>
          ) : (
            <div>
              <button
                onClick={() => navigate("/login")}
                className="btn btn--primary"
              >
                <span>Login</span>
              </button>
            </div>
          )}

          <div>
            <img onClick={showNotificationsModal} src={bellIcon} alt="" />
          </div>
          <div className="img-wrapper">
            <img
              onClick={() => navigate("/profile")}
              src={
                currentUser?.profileImage || "https://via.placeholder.com/120"
              }
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Mobile wrapper */}
      <div className="mobile-header">
        <div>
          {" "}
          <svg
            onClick={handleMobileNavModal}
            viewBox="0 0 100 80"
            width="40"
            height="40"
          >
            <rect fill="#fff" width="80" height="20" rx="10"></rect>
            <rect fill="#fff" y="30" width="80" height="20" rx="10"></rect>
            <rect fill="#fff" y="60" width="80" height="20" rx="10"></rect>
          </svg>
        </div>
      </div>

      {/* Mobile modal */}
      {mobModal ? (
        <MobileModal>
          <div>
            <div
              onClick={() => setMobModal(false)}
              style={{
                display: "flex",
                justifyContent: "end",
                cursor: "pointer",
                color: "white",
              }}
            >
              X
            </div>
            <div className="navigation">
              <NavLink onClick={() => setMobModal(false)} to={"/"}>
                <div className="sidebar-item">
                  <span>HOME</span>
                </div>
              </NavLink>
              <NavLink onClick={() => setMobModal(false)} to={"/movies"}>
                <div className="sidebar-item">
                  <span>MOVIES</span>
                </div>
              </NavLink>
              <NavLink onClick={() => setMobModal(false)} to={"/blog"}>
                <div className="sidebar-item">
                  <span>BLOG</span>
                </div>
              </NavLink>
              <NavLink onClick={() => setMobModal(false)} to={"/review"}>
                <div className="sidebar-item">
                  <span>REVIEWS</span>
                </div>
              </NavLink>
              <NavLink onClick={() => setMobModal(false)} to={"/profile"}>
                <div className="sidebar-item">
                  <span>PROFILE</span>
                </div>
              </NavLink>
              {currentUser?.role === "admin" && (
                <NavLink onClick={() => setMobModal(false)} to={"/admin"}>
                  <div className="sidebar-item">
                    <span>ADMIN PANEL</span>
                  </div>
                </NavLink>
              )}
            </div>
          </div>
        </MobileModal>
      ) : (
        ""
      )}

      <div className="boxes-wrapper">
        <div className="box mr-16">
          <div>Users</div>
          <div>{users?.length ?? 0}</div>
        </div>
        <div className="box mr-16">
          <div>Movies</div>
          <div>{movies?.results?.length ?? 0}</div>
        </div>
        <div className="box mr-16">
          <div>Reviews</div>
          <div>{reviews?.length ?? 0}</div>
        </div>
        <div className="box">
          <div>Blogs</div>
          <div>{blogs?.length ?? 0}</div>
        </div>
      </div>

      {/* Modal */}
      <div className={notificationsModal ? "d-block" : "d-none"}>
        <Modal>
          <div className="p-16 ">
            <div style={{ textAlign: "right" }}>
              <span
                onClick={() => setNotificationsModal(false)}
                style={{ cursor: "pointer" }}
              >
                X
              </span>
            </div>
            <div>
              <Notifications />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Header;
