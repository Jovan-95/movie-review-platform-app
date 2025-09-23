/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { getBlogs, getUsers } from "../../services";
import { useQuery } from "@tanstack/react-query";
import type { Blog, User } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import CommentComp from "../../components/Comment";

function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get blogs
  const {
    data: blogs,
    isLoading: blogsIsLoading,
    error: blogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  // Get users
  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Find current logged user
  const loggedUser = useSelector((state: RootState) => state.auth.loggedInUser);

  // Error handling
  if (!loggedUser) return <p>User now found!</p>;
  if (blogsIsLoading || usersIsLoading) return <p>Loading...</p>;
  if (blogsError || usersError)
    return <p>{blogsError?.message || usersError?.message}</p>;
  if (!blogs || !users) return <p>No data found.</p>;

  // Determine single blog
  const singleBlog = blogs.find((blog: Blog) => blog.id === id);

  // Prevent Error
  if (!Array.isArray(users)) return null;

  // Find blog author
  const blogAuthor = users.find(
    (user: User) => user.id === singleBlog?.authorId
  );

  // Find user on
  const currentUser = users.find((user: User) => user.id === loggedUser?.id);

  return (
    <>
      <div className="single-movie">
        <div
          className="single-movie__backdrop"
          // background image inline stil možeš dodati u React-u koristeći singleMovie.backdrop_path
        ></div>

        <div className="single-movie__content-movie">
          <div className="single-movie__info">
            <h1 className="single-movie__title">{singleBlog?.title}</h1>

            <p className="single-movie__meta">
              <span className="single-movie__year">
                Release Date: {singleBlog?.createdAt}
              </span>
            </p>

            <p className="single-movie__description">{singleBlog?.content}</p>
            <p className="single-movie__description">
              Author: {blogAuthor?.username}
            </p>

            <button
              onClick={() => navigate("/blog")}
              className="single-movie__btn"
            >
              Back
            </button>
          </div>
        </div>
        {/* --- COMMENTS SECTION --- */}
        <CommentComp
          users={users}
          singleBlog={singleBlog}
          currentUser={currentUser}
        />
      </div>
    </>
  );
}

export default SingleBlog;
