/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { getBlogs } from "../../services";
import { useQuery } from "@tanstack/react-query";
import type { Blog } from "../../types";

function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Getting blogs
  const {
    data: blogs,
    isLoading: blogsIsLoading,
    error: blogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  // Error handling
  if (blogsIsLoading) return <p>Loading...</p>;
  if (blogsError) return <p>{blogsError?.message}</p>;

  const singleBlog = blogs.find((blog: Blog) => Number(blog.id) === Number(id));
  return (
    <div className="single-movie">
      <div
        className="single-movie__backdrop"
        // background image inline stil možeš dodati u React-u koristeći singleMovie.backdrop_path
      ></div>

      <div className="single-movie__content-movie">
        {/* <div className="single-movie__poster-wrapper">
          <img
            src={`https://image.tmdb.org/t/p/w500${singleBlog.backdrop_path}`}
            alt="movie poster"
            className="single-movie__poster"
          />
        </div> */}

        <div className="single-movie__info">
          <h1 className="single-movie__title">{singleBlog.title}</h1>

          <p className="single-movie__meta">
            <span className="single-movie__year">
              Release Date: {singleBlog.createdAt}
            </span>
          </p>

          <p className="single-movie__description">{singleBlog.content}</p>

          <button className="single-movie__btn">Add to Favorites</button>
          <button
            onClick={() => navigate("/blog")}
            className="single-movie__btn"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
