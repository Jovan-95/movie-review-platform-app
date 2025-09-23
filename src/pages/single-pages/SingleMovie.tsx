/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getPopularMovies, getReviews, getUsers } from "../../services";
import { useQuery } from "@tanstack/react-query";
import type { Movie, Review, User } from "../../types";

function SingleMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get movies
  const {
    data: movies,
    isLoading: moviesIsLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getPopularMovies,
  });

  // Get review
  const {
    data: reviews,
    isLoading: reviewsIsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
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

  // Error handling
  if (moviesIsLoading || reviewsIsLoading || usersIsLoading)
    return <p>Loading...</p>;
  if (moviesError || reviewsError || usersError)
    return <p>{moviesError?.message}</p>;

  // Prevent Error
  if (!Array.isArray(users)) return null;

  // Find single movie
  const singleMovie = movies.results.find(
    (movie: Movie) => Number(movie.id) === Number(id)
  );
  //   console.log("single movie :", singleMovie);

  // Find review for single movie
  const filteredReviews = reviews?.filter(
    (review: Review) => review.movieId === singleMovie.id
  );

  return (
    <>
      <div className="single-movie">
        <div className="single-movie__backdrop"></div>

        <div className="single-movie__content-movie">
          <div className="single-movie__poster-wrapper">
            <img
              src={`https://image.tmdb.org/t/p/w500${singleMovie.backdrop_path}`}
              alt="movie poster"
              className="single-movie__poster"
            />
          </div>

          <div className="single-movie__info">
            <h1 className="single-movie__title">{singleMovie.title}</h1>

            <p className="single-movie__meta">
              <span className="single-movie__year">
                Release Date: {singleMovie.release_date}
              </span>
              <span className="single-movie__genre">
                Popularity: {singleMovie.popularity}
              </span>
            </p>

            <p className="single-movie__rating">
              ⭐ {singleMovie.vote_average} / 10
            </p>

            <p className="single-movie__description">{singleMovie.overview}</p>

            <NavLink to={`/movies/create-review/${singleMovie.id}`}>
              <button className="single-movie__btn">Add Review</button>
            </NavLink>
            <button
              onClick={() => navigate("/movies")}
              className="single-movie__btn"
            >
              Back
            </button>
          </div>
        </div>
      </div>
      {/* --- Review SECTION --- */}
      <div className="review-wrapper">
        <div className="reviews-section">
          <div className="reviews-list">
            <h2 className="reviews-title">Reviews</h2>
            {/* List all reviews for this Movie */}
            {filteredReviews?.map((review: Review) => {
              // Find author by id
              const author = users.find(
                (user: User) => user.id === review.userId
              );

              return (
                <div key={review.id} className="review-card">
                  <div className="review-author">{author.username}</div>
                  <div className="review-rating">{review.rating}</div>{" "}
                  <div className="review-text">{review.content}</div>
                  <div className="review-date">{review.date}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleMovie;
