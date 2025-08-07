/* eslint-disable @typescript-eslint/no-unused-vars */
import searchIcon from "../assets/icons/search-icon.svg";
import bellIcon from "../assets/icons/bell-icon.svg";
import profileIcon from "../assets/icons/profile-icon.svg";
import Modal from "./Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogs, getPopularMovies, getReviews, getUsers } from "../services";
import useGlobalSearch from "../hooks/useGlobalSearch";
import Notifications from "./Notifications";

function Header() {
  const [notificationsModal, setNotificationsModal] = useState(false);
  const navigate = useNavigate();

  // Users are loaded from redux
  const { users, loading } = useSelector((state: RootState) => state.users);
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

  return (
    <div className="header-wrapper">
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
        </div>
        <div className="time-wrapper">
          <div className="time">{formattedDate}</div>
          <div className="time">{formattedTime}</div>
        </div>
        <div className="profile-wrapper">
          {user ? (
            <div className="profile-name">{user.username}</div>
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
          <div>
            <img
              onClick={() => navigate("/profile")}
              src={profileIcon}
              alt=""
            />
          </div>
        </div>
      </div>
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
          <div className="p-20">
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
      {/* Modal showing search results when typing starts */}
      {searchQuery && (
        <Modal>
          {" "}
          <div className="search-results">
            {results.length === 0 ? (
              <div>No results found</div>
            ) : (
              results.map((item) => (
                <div key={item.id} className="search-result">
                  <strong>{item.type.toUpperCase()}:</strong>{" "}
                  {item.title || item.username}
                </div>
              ))
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Header;
