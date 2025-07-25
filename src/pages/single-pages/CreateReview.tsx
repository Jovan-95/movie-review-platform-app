/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createReview, getUsers } from "../../services";
import type { Review, User } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";

function CreateReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [reviewObj, setReviewObj] = useState({ rating: "", content: "" });

  // POST HTTP
  const createReviewMut = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => {
      alert("Registration failed!");
    },
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

  // Find current logged user
  const loggedUser = useSelector((state: RootState) => state.auth.loggedInUser);

  // Error handling
  if (!loggedUser) return <p>User now found!</p>;
  if (usersIsLoading) return <p>Loading...</p>;
  if (usersError) return <p>{usersError?.message}</p>;
  if (!users) return <p>No data found.</p>;

  // Prevent Error
  if (!Array.isArray(users)) return null;

  const currentUser = users.find((user: User) => user.id === loggedUser?.id);

  function handleSubmitReview() {
    // console.log("movie id", id);
    // console.log("current user", currentUser);

    if (reviewObj.rating === "" || reviewObj.content === "")
      return alert("Fields are emtpy!");

    // New review creating
    const newReview: Review = {
      id: Date.now(),
      movieId: Number(id),
      userId: currentUser.id,
      rating: Number(reviewObj.rating),
      content: reviewObj.content,
      date: new Date().toLocaleString(),
    };

    createReviewMut.mutate(newReview);
    alert("Review is submitted");
  }

  //   TODO JOVAN, create reviewObj

  return (
    <form className="review-form">
      <h2 className="review-form__title">Leave a Review</h2>

      <div className="review-form__group">
        <label htmlFor="rating" className="review-form__label">
          Rating (1–10)
        </label>
        <input
          onChange={(e) =>
            setReviewObj({ ...reviewObj, rating: e.target.value })
          }
          value={reviewObj.rating}
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
          onChange={(e) =>
            setReviewObj({ ...reviewObj, content: e.target.value })
          }
          value={reviewObj.content}
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
