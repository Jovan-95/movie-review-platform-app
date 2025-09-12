/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeBlogStatus,
  changeUserStatus,
  deleteBlog,
  deleteComment,
  deleteReview,
  deleteUser,
  getBlogs,
  getComments,
  getReviews,
  getUsers,
} from "../services";
import type { Blog, Review, User } from "../types";
import { useState } from "react";
import Modal from "../components/Modal";
import { showErrorToast, showSuccessToast } from "../components/Toast";

function Admin() {
  const [modal, setModal] = useState<boolean>(false);
  const [targetUser, setTargetUser] = useState({});
  const queryClient = useQueryClient();

  // Get users
  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Getting blogs
  const {
    data: blogs,
    isLoading: blogsIsLoading,
    error: blogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  // Getting comments
  const {
    data: comments,
    isLoading: commentIsLoading,
    error: commentError,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  // Getting reviews
  const {
    data: reviews,
    isLoading: reviewsIsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  // Patch HTTP method calling
  const { mutate: userStatusChangingMutation } = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string | number;
      status: "active" | "rejected" | "banned";
    }) => changeUserStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setModal(false);
    },
  });

  // Patch HTTP method calling
  const { mutate: blogStatusChangingMutation } = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string | number;
      status: "published" | "rejected";
    }) => changeBlogStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  // Delete HTTP method calling
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessToast("User deleted successfully!");
      setModal(false);
    },
    onError: () => {
      showErrorToast("Failed to delete user!");
    },
  });

  // Delete HTTP method calling
  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      showSuccessToast("Blog deleted successfully!");
      setModal(false);
    },
    onError: () => {
      showErrorToast("Failed to delete blog!");
    },
  });

  // Delete HTTP method calling
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      showSuccessToast("Comment deleted successfully!");
      setModal(false);
    },
    onError: () => {
      showErrorToast("Failed to delete comment!");
    },
  });

  // Delete HTTP method calling
  const deleteReviewMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      showSuccessToast("Review deleted successfully!");
      setModal(false);
    },
    onError: () => {
      showErrorToast("Failed to delete review!");
    },
  });

  function handleOpenModal(user: User) {
    setModal((prev) => !prev);
    setTargetUser(user);
  }

  // Approve user
  function approveUser() {
    // console.log("target user", targetUser);

    userStatusChangingMutation({
      id: targetUser.id,
      status: "active",
    });
  }

  // Reject user
  function rejectUser() {
    userStatusChangingMutation({
      id: targetUser.id,
      status: "rejected",
    });
  }

  // Ban user
  function banUser() {
    userStatusChangingMutation({
      id: targetUser.id,
      status: "banned",
    });
  }

  // Delete User
  function handleDeleteUser() {
    deleteUserMutation.mutate(targetUser?.id);
  }

  // Blogs
  // Publish blog
  function handlePublishingBlog(blogId: string) {
    blogStatusChangingMutation({
      id: blogId,
      status: "published",
    });
  }

  // Reject blog
  function handleRejectingBlog(blogId: string) {
    blogStatusChangingMutation({
      id: blogId,
      status: "rejected",
    });
  }

  // Delete blog
  function handleBlogDelete(blogId: string) {
    deleteBlogMutation.mutate(blogId);
  }

  // Comments
  function handleDeleteComment(commentId: string) {
    console.log(commentId);
    deleteCommentMutation.mutate(commentId);
  }

  // Reviews
  function handleDeleteReview(reviewId: string) {
    deleteReviewMutation.mutate(reviewId);
  }

  // Prevent Error
  if (!Array.isArray(users)) return null;

  if (usersIsLoading || blogsIsLoading || commentIsLoading || reviewsIsLoading)
    return <p>Loading...</p>;
  if (usersError || blogsError || commentError || reviewsError)
    return <p>{usersError?.message}</p>;
  if (!users || !blogs || !comments || !reviews) return <p>No data found.</p>;
  return (
    <>
      <div className="admin-page">
        <h1 className="admin-title">Admin Dashboard</h1>

        <section className="admin-section">
          <h2 className="section-title">Users</h2>

          {/* Users */}
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => (
                  <tr key={user?.id}>
                    <td>#{user?.id}</td>
                    <td>{user?.email}</td>
                    <td>{user?.role}</td>

                    <td>
                      <span className={`badge ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleOpenModal(user)}
                        className="btn btn--primary"
                      >
                        <span>Actions</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -------- Blogs -------- */}
        <section className="admin-section">
          <h2 className="section-title">Blog Posts</h2>

          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Author</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog: Blog) => {
                  // Find author by id
                  const author = users.find(
                    (user: User) => user.id === blog.authorId
                  );

                  return (
                    <tr key={blog?.id}>
                      <td>#{blog?.id}</td>
                      <td>{author?.username}</td>
                      <td>{blog?.title}</td>
                      <td>
                        <span className={`badge ${blog.status}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handlePublishingBlog(blog.id)}
                          className="btn approve"
                        >
                          Publish
                        </button>
                        <button
                          onClick={() => handleRejectingBlog(blog.id)}
                          className="btn reject"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleBlogDelete(blog.id)}
                          className="btn reject"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Comments */}
        <section className="admin-section">
          <h2 className="section-title">Comments</h2>
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Author</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment: Comment) => {
                  const author = users.find(
                    (user: User) => user.id === comment.userId
                  );
                  return (
                    <tr key={comment?.id}>
                      <td>#{comment?.id}</td>
                      <td>{author?.username}</td>

                      <td>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="btn reject"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Reviews */}
        <section className="admin-section">
          <h2 className="section-title">Reviews</h2>
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>

                  <th>Author</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review: Review) => {
                  const author = users.find(
                    (user: User) => user.id === review.userId
                  );

                  const reviewTitle = review?.content.substring(0, 25);
                  return (
                    <tr key={review?.id}>
                      <td>#{review?.id}</td>
                      <td>{reviewTitle}</td>
                      <td>{author?.username}</td>

                      <td>
                        <button
                          onClick={() => handleDeleteReview(String(review?.id))}
                          className="btn reject"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Modal */}
      <div className={modal ? "d-block" : "d-none"}>
        <Modal>
          <div className="action-modal">
            <div
              className="action-modal__close"
              onClick={() => setModal(false)}
            >
              X
            </div>
            <div className="action-modal__title">
              Choose what you want to do with <b>{targetUser?.username}?</b>
            </div>
            <div style={{ flexWrap: "wrap" }} className="action-modal__buttons">
              <button onClick={approveUser} className="btn btn--approve">
                Approve
              </button>
              <button onClick={rejectUser} className="btn btn--reject">
                Reject
              </button>
              <button onClick={banUser} className="btn btn--ban">
                Ban
              </button>
              <button
                onClick={() => handleDeleteUser()}
                className="btn btn--reject mt-16"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Admin;
