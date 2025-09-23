/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getPopularMovies, getReviews, getUsers } from "../../services";
import type { Movie, Review, User } from "../../types";

function SingleReview() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const { id } = useParams();
  const navigate = useNavigate();

  // Getting review
  const {
    data: reviews,
    isLoading: reviewsIsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  // Getting movies
  const {
    data: movies,
    isLoading: moviesIsLoading,
    error: moviesError,
  } = useQuery({
    queryKey: [`movie/popular?api_key=${API_KEY}&language=en-US&page=1`],
    queryFn: getPopularMovies,
  });

  // Getting users
  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Error handling
  if (reviewsIsLoading || moviesIsLoading || usersIsLoading)
    return <p>Loading...</p>;
  if (reviewsError || moviesError || usersError)
    return <p>{reviewsError?.message}</p>;
  if (!reviews || !movies || !users) return <p>No data found.</p>;

  // Single review
  const singleReview = reviews.find((review: Review) => review.id === id);

  // Prevent Error
  if (!Array.isArray(movies.results)) return null;

  // Prevent Error
  if (!Array.isArray(users)) return null;

  // Finding movie for this review
  const movie = movies.results.find(
    (m: Movie) => m.id === singleReview?.movieId
  );

  // Find review author
  const reviewAuthor = users.find(
    (user: User) => user.id === singleReview?.userId
  );
  return (
    <>
      <div className="single-movie h-100">
        <div
          className="single-movie__backdrop"
          // background image inline stil možeš dodati u React-u koristeći singleMovie.backdrop_path
        ></div>

        <div className="single-movie__content-movie">
          <div className="single-movie__info">
            <h2>Movie: {movie?.title}</h2>
            <p className="single-movie__rating">
              Rating: ⭐ {singleReview?.rating} / 10
            </p>

            <p className="single-movie__description">
              Review: {singleReview?.content}
            </p>

            <p className="single-movie__description">
              Author: {reviewAuthor?.username}
            </p>
            <p className="single-movie__meta">
              <span className="single-movie__year">
                Date: {singleReview?.date}
              </span>
            </p>
            <button
              onClick={() => navigate("/review")}
              className="single-movie__btn"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleReview;
