import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../services";
import type { Review } from "../types";
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

  // Error handling
  if (reviewsIsLoading) return <p>Loading...</p>;
  if (reviewsError) return <p>{reviewsError?.message}</p>;
  return (
    <div className="home">
      {/* <!-- Popular Movies --> */}
      <section className="section movies-preview">
        <h2 className="section__title">Reviews</h2>
        <div className="cards">
          {reviews.map((review: Review) => (
            <NavLink key={review.id} to={`/review/${review.id}`}>
              <div className="card">
                {/* <img
                  alt="movie"
                  className="card__img"
                /> */}
                <h3 className="card__title">Rating: {review.rating}⭐</h3>
                <p>{review.comment}</p>
                <p className="card__meta">
                  {" "}
                  {new Date(review.date).toLocaleString()}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Review;
