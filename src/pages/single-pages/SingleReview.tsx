/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getReviews } from "../../services";
import type { Review } from "../../types";

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

  // Error handling
  if (reviewsIsLoading) return <p>Loading...</p>;
  if (reviewsError) return <p>{reviewsError?.message}</p>;
  if (!reviews) return <p>No data found.</p>;

  const singleReview = reviews.find(
    (review: Review) => Number(review.id) === Number(id)
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
            <p className="single-movie__rating">
              ⭐ {singleReview.rating} / 10
            </p>

            <p className="single-movie__description">{singleReview.comment}</p>
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
