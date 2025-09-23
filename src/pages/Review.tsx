import { useQuery } from "@tanstack/react-query";
import { getPopularMovies, getReviews } from "../services";
import type { Movie, Review } from "../types";
import { NavLink } from "react-router-dom";

function Review() {
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
  return (
    <div className="home">
      {/* <!-- Popular Movies --> */}
      <section className="section movies-preview">
        <h2 className="section__title">Reviews</h2>
        <div className="cards">
          {reviews?.map((review: Review) => {
            /* // Find matching movie for review */
            const movie = movies.results?.find(
              (m: Movie) => m.id === review.movieId
            );

            return (
              <NavLink key={review.id} to={`/review/${review.id}`}>
                <div className="card">
                  {/* <img
                  alt="movie"
                  className="card__img"
                /> */}
                  <h3 className="card__title">{movie?.title}</h3>
                  <h3 className="card__title">Rating: {review.rating}⭐</h3>
                  {/* <p>{review.content}</p> */}
                  <p className="card__meta">
                    {" "}
                    {new Date(review.date).toLocaleString()}
                  </p>
                </div>
              </NavLink>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Review;
