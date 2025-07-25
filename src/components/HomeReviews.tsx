import { useNavigate } from "react-router-dom";
import type { Review } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../services";

function HomeReviews() {
  const navigate = useNavigate();

  // Getting reviews from services with reactQuery
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
      </div>
      <div onClick={() => navigate("/review")} className="section__link">
        Go to Reviews →
      </div>
    </section>
  );
}

export default HomeReviews;
