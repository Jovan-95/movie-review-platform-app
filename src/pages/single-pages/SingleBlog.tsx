/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { getBlogs, getComments, getUsers, postComment } from "../../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Blog, Comment, User } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import { useState } from "react";

function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [commentObj, setCommentObj] = useState({ comment: "" });

  // Get blogs
  const {
    data: blogs,
    isLoading: blogsIsLoading,
    error: blogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
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

  // Get comments
  const {
    data: comments,
    isLoading: commentsIsLoading,
    error: commentsError,
  } = useQuery({
    queryKey: ["blogComments"],
    queryFn: getComments,
  });

  // Post comment
  const addCommentMut = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogComments"] });
    },
    onError: (err) => {
      alert("Registration failed!");
    },
  });

  // Find current logged user
  const loggedUser = useSelector((state: RootState) => state.auth.loggedInUser);

  // Error handling
  if (!loggedUser) return <p>User now found!</p>;
  if (blogsIsLoading || usersIsLoading || commentsIsLoading)
    return <p>Loading...</p>;
  if (blogsError || usersError || commentsError)
    return (
      <p>
        {blogsError?.message || commentsError?.message || usersError?.message}
      </p>
    );
  if (!blogs || !comments || !users) return <p>No data found.</p>;

  // Determine single blog
  const singleBlog = blogs.find((blog: Blog) => Number(blog.id) === Number(id));

  // Prevent Error
  if (!Array.isArray(users)) return null;

  // Find user on
  const currentUser = users.find(
    (user: User) => Number(user.id) === Number(loggedUser.id)
  );

  // Find comments for specific blog by comparing ID
  const filteredComments = comments.filter(
    (comment: Comment) => Number(comment.blogId) === Number(singleBlog.id)
  );

  // Sorted comments
  const sortedComments = [...filteredComments].reverse();

  function handleAddingComment(e: React.FormEvent) {
    e.preventDefault();

    // console.log("user", currentUser);

    if (!commentObj.comment.trim()) {
      alert("Comment is empty!");
      return;
    }

    const newComment: Comment = {
      id: Date.now(),
      blogId: singleBlog.id,
      userId: currentUser.id,
      comment: commentObj.comment,
      date: Date.now(),
    };
    // console.log("comment", newComment);

    // Add comment
    addCommentMut.mutate(newComment);

    // reset
    setCommentObj({ comment: "" });
  }

  return (
    <>
      <div className="single-movie">
        <div
          className="single-movie__backdrop"
          // background image inline stil možeš dodati u React-u koristeći singleMovie.backdrop_path
        ></div>

        <div className="single-movie__content-movie">
          <div className="single-movie__info">
            <h1 className="single-movie__title">{singleBlog.title}</h1>

            <p className="single-movie__meta">
              <span className="single-movie__year">
                Release Date: {singleBlog.createdAt}
              </span>
            </p>

            <p className="single-movie__description">{singleBlog.content}</p>

            <button className="single-movie__btn">Add to Favorites</button>
            <button
              onClick={() => navigate("/blog")}
              className="single-movie__btn"
            >
              Back
            </button>
          </div>
        </div>
        {/* --- COMMENTS SECTION --- */}
        <div className="comments-wrapper">
          <div className="comments-section">
            <h2 className="comments-title">Post comment</h2>

            <form className="comment-form">
              <textarea
                onChange={(e) =>
                  setCommentObj({ ...commentObj, comment: e.target.value })
                }
                value={commentObj.comment}
                className="comment-input"
                placeholder="Write your comment here..."
                required
              ></textarea>
              <button
                onClick={handleAddingComment}
                type="submit"
                className="comment-submit"
              >
                Post Comment
              </button>
            </form>

            <div className="comments-list">
              <h2 className="comments-title">Comments</h2>

              {/* List all comments for this blog */}
              {sortedComments.map((comment: Comment) => {
                // Find author by id
                const author = users.find(
                  (user: User) => user.id === comment.userId
                );

                return (
                  <div key={comment.id} className="comment-card">
                    <div className="comment-author">{author.username}</div>
                    <div className="comment-text">{comment.comment}</div>
                    <div className="comment-date">
                      {new Date(comment.date).toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBlog;
