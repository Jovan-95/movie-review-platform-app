/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeBlogStatus,
  changeUserStatus,
  getBlogs,
  getUsers,
} from "../services";
import type { Blog, User } from "../types";
import { useState } from "react";
import Modal from "../components/Modal";

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

  // Blogs
  function handlePublishingBlog(blogId: string) {
    blogStatusChangingMutation({
      id: blogId,
      status: "published",
    });
  }
  function handleRejectingBlog(blogId: string) {
    blogStatusChangingMutation({
      id: blogId,
      status: "rejected",
    });
  }

  // Prevent Error
  if (!Array.isArray(users)) return null;

  if (usersIsLoading || blogsIsLoading) return <p>Loading...</p>;
  if (usersError || blogsError) return <p>{usersError?.message}</p>;
  if (!users || !blogs) return <p>No data found.</p>;
  return (
    <>
      <div className="admin-page">
        <h1 className="admin-title">Admin Dashboard</h1>

        <section className="admin-section">
          <h2 className="section-title">Users</h2>
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
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

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
        </section>

        {/* -------- Blogs -------- */}
        <section className="admin-section">
          <h2 className="section-title">Blog Posts</h2>
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
                  <tr key={blog.id}>
                    <td>#{blog.id}</td>
                    <td>{author.username}</td>
                    <td>{blog.title}</td>
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>

      {/* Modal */}
      <div className={modal ? "d-block" : "d-none"}>
        <Modal>
          <>
            <div
              onClick={() => setModal(false)}
              style={{
                display: "flex",
                justifyContent: "end",
                cursor: "pointer",
              }}
            >
              X
            </div>
            <div>
              Choose what you want to do with <b>{targetUser?.username}?</b>{" "}
            </div>
            <div>
              <button onClick={approveUser} className="btn">
                Approve
              </button>
              <button onClick={rejectUser} className="btn">
                Reject
              </button>
              <button onClick={banUser} className="btn">
                Ban
              </button>
            </div>
          </>
        </Modal>
      </div>
    </>
  );
}

export default Admin;
