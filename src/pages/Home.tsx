/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import type { RootState } from "../Redux/store";
import { getBlogs, getPopularMovies, getReviews } from "../services";
import { useQuery } from "@tanstack/react-query";
import type { Blog, Movie, Review } from "../types";

function Home() {
  const navigate = useNavigate();
  // Get logged user from Redux
  const user = useSelector((state: RootState) => state.auth.loggedInUser);

  // Getting movies
  const {
    data: movies,
    isLoading: moviesIsLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["users"],
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
    return <p>Loading...</p>;
  if (moviesError || reviewsError || blogsError)
    return <p>{reviewsError?.message}</p>;
  return (
    <div className="home">
      {/* <!-- Hero Section --> */}
      <section className="hero">
        <h1 className="hero__title">Welcome to Movie Review Platform</h1>
        <p className="hero__subtitle">
          Discover movies, share your thoughts, and read community insights.
        </p>
        <div className="hero__buttons">
          <button
            onClick={() => navigate("/movies")}
            className="btn btn--primary"
          >
            <span>Explore Movies</span>
          </button>
          <button
            onClick={() => navigate("/blog")}
            className="btn btn--secondary"
          >
            <span>Read Blog</span>
          </button>
        </div>
      </section>

      {/* <!-- Popular Movies --> */}
      <section className="section movies-preview">
        <h2 className="section__title">Popular Movies</h2>
        <div className="cards">
          {/* With slice we only show 5 movies instead of all of them */}
          {movies.results?.slice(0, 5).map((movie: Movie) => (
            <NavLink key={movie.id} to={`movies/${movie.id}`}>
              {" "}
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt="movie"
                  className="card__img"
                />
                <h3 className="card__title">{movie.title}</h3>
                <p>{movie.popularity}</p>
                <p className="card__meta">
                  {movie.release_date} · {movie.vote_average} ⭐
                </p>
              </div>
            </NavLink>
          ))}

          {/* <!-- Repeat 2–3x --> */}
        </div>
        <div onClick={() => navigate("/movies")} className="section__link">
          See all movies →
        </div>
      </section>

      {/* <!-- Top Reviews --> */}
      <section className="section reviews-preview">
        <h2 className="section__title">Top Reviews</h2>
        <div className="reviews">
          {reviews.slice(0, 5).map((review: Review) => (
            <div key={review.id} className="review">
              <p className="review__rating">⭐ {review.rating}</p>
              <p className="review__text">{review.content}</p>
              {/* TODO Jovan, find author of the review with ID */}
              <p className="review__author">– {review.date}</p>
            </div>
          ))}

          {/* <!-- Repeat --> */}
        </div>
        <div onClick={() => navigate("/review")} className="section__link">
          Go to Reviews →
        </div>
      </section>

      {/* <!-- Latest Blogs --> */}
      <section className="section blogs-preview">
        <h2 className="section__title">Latest Blog Posts</h2>
        <div className="blogs">
          {blogs.map((blog: Blog) => (
            <NavLink key={blog.id} to={`/blog/${blog.id}`}>
              <div className="blog">
                <h3 className="blog__title">{blog.title}</h3>
                <p className="blog__excerpt">{blog.content}</p>
                {/* TODO Jovan, find author of the blog with ID */}
                <p className="blog__author">By {blog.authorId}</p>
              </div>
            </NavLink>
          ))}

          {/* <!-- Repeat --> */}
        </div>
        <div onClick={() => navigate("/blog")} className="section__link">
          Read Blog →
        </div>
      </section>

      {/* <!-- Call to Action --> */}
      {user ? (
        ""
      ) : (
        <section className="cta">
          <h2 className="cta__title">Ready to join the community?</h2>
          <button onClick={() => navigate("/register")} className="btn ">
            <span>Create an Account</span>
          </button>
        </section>
      )}
    </div>
  );
}

export default Home;
