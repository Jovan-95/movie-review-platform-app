/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";

function CreateReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  function handleSubmitReview() {
    console.log("movie id", id);
  }

  //   TODO JOVAN, create reviewObj
  //   with movieId, userId, reviewId(id), rating and comment..
  return (
    <form className="review-form">
      <h2 className="review-form__title">Leave a Review</h2>

      <div className="review-form__group">
        <label htmlFor="rating" className="review-form__label">
          Rating (1–10)
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="10"
          required
          className="review-form__input"
        />
      </div>

      <div className="review-form__group">
        <label htmlFor="comment" className="review-form__label">
          Your Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows="5"
          required
          className="review-form__textarea"
        ></textarea>
      </div>

      <button
        onClick={handleSubmitReview}
        type="submit"
        className="review-form__btn"
      >
        Submit Review
      </button>
    </form>
  );
}

export default CreateReview;
