/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getPopularMovies, getReviews } from "../../services";
import type { Movie, Review } from "../../types";

function SingleReview() {
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
    queryKey: ["users"],
    queryFn: getPopularMovies,
  });

  // Error handling
  if (reviewsIsLoading || moviesIsLoading) return <p>Loading...</p>;
  if (reviewsError || moviesError) return <p>{reviewsError?.message}</p>;
  if (!reviews || !movies) return <p>No data found.</p>;

  // Single review
  const singleReview = reviews.find(
    (review: Review) => Number(review.id) === Number(id)
  );

  // Prevent Error
  if (!Array.isArray(movies.results)) return null;
  // Finding movie for this review
  const movie = movies.results.find(
    (m: Movie) => m.id === singleReview.movieId
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
            <h2>Movie: {movie.title}</h2>
            <p className="single-movie__rating">
              Rating: ⭐ {singleReview.rating} / 10
            </p>

            <p className="single-movie__description">
              Review: {singleReview.content}
            </p>
            <p className="single-movie__meta">
              <span className="single-movie__year">
                Date: {singleReview.date}
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
