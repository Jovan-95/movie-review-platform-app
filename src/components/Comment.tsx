import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getComments, postComment } from "../services";
import { showErrorToast } from "./Toast";
import type { Blog, Comment, User } from "../types";

function Comment({
  users,
  singleBlog,
  currentUser,
}: {
  users: User[];
  singleBlog: Blog;
  currentUser: User;
}) {
  const [commentObj, setCommentObj] = useState({ comment: "" });
  const queryClient = useQueryClient();

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
    onError: () => {
      showErrorToast("Registration failed!");
    },
  });

  // Error handling
  //   if (!loggedUser) return <p>User now found!</p>;
  if (commentsIsLoading) return <p>Loading...</p>;
  if (commentsError) return <p>{commentsError?.message}</p>;

  // Find comments for specific blog by comparing ID
  const filteredComments = comments.filter(
    (comment: Comment) => Number(comment?.blogId) === Number(singleBlog.id)
  );

  // Sorted comments
  const sortedComments = [...filteredComments].reverse();

  function handleAddingComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentObj.comment.trim()) {
      showErrorToast("Comment is empty!");
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
              (user: User) => String(user.id) === String(comment.userId)
            );

            return (
              <div key={comment.id} className="comment-card">
                <div className="comment-author">{author?.username}</div>
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
  );
}

export default Comment;
