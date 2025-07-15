/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../Redux/store";
import { getBlogs, getMovies, getReviews } from "../services";
import { useQuery } from "@tanstack/react-query";
import type { Movie, Review } from "../types";

function Home() {
  const navigate = useNavigate();
  // Get logged user from Redux
  const user = useSelector((state: RootState) => state.auth.loggedInUser);

  // Getting movies from services with reactQuery
  const {
    data: movies,
    isLoading: moviesIsLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getMovies,
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
    return <p>{moviesError?.message}</p>;
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

      {/* <!-- Latest Movies --> */}
      <section className="section movies-preview">
        <h2 className="section__title">Latest Movies</h2>
        <div className="cards">
          {movies.map((movie: Movie) => (
            <div key={movie.id} className="card">
              <img src={movie.image} alt="movie" className="card__img" />
              <h3 className="card__title">{movie.title}</h3>
              <p className="card__meta">
                {movie.year} · {movie.rating} ⭐
              </p>
            </div>
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
          {reviews.map((review: Review) => (
            <div className="review">
              <p className="review__rating">⭐ {review.rating}</p>
              <p className="review__text">{review.comment}</p>
              {/* TODO Jovan, find author of the review with ID */}
              <p className="review__author">– Ana Petrovic</p>
            </div>
          ))}

          {/* <!-- Repeat --> */}
        </div>
        <div onClick={() => navigate("/reviews")} className="section__link">
          Go to Reviews →
        </div>
      </section>

      {/* <!-- Latest Blogs --> */}
      <section className="section blogs-preview">
        <h2 className="section__title">Latest Blog Posts</h2>
        <div className="blogs">
          {blogs.map((blog) => (
            <div className="blog">
              <h3 className="blog__title">{blog.title}</h3>
              <p className="blog__excerpt">{blog.content}</p>
              {/* TODO Jovan, find author of the blog with ID */}
              <p className="blog__author">By {blog.authorId}</p>
            </div>
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
