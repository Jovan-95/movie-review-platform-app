/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { editUser, getUsers } from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types";
import Modal from "../components/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/slice";

function Profile() {
  const [modal, setModal] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);

  // Edit user fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get users
  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Patch HTTP method Edit user
  const { mutate: editUserFormFields } = useMutation({
    mutationFn: ({
      userId,
      editedObj,
    }: {
      userId: string;
      editedObj: Partial<User>; // Use Partial<User> for type safety
    }) => editUser(userId, editedObj),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
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

  // Find user on
  const currentUser = users.find(
    (user: User) => String(user.id) === String(loggedUser.id)
  );

  // Edit modal
  function handleEditModal() {
    setModal((prev) => !prev);
    setUsername(currentUser.username);
    setEmail(currentUser.email);
    setPassword(currentUser.password); // Assuming you store plain text (in real apps, don't)
    setConfirmPassword(currentUser.password);
  }

  // Submit EDITED obj
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    if (!username || !email || !password) {
      return alert("All fields are required");
    }

    const editedObj = {
      username,
      email,
      password,
    };

    editUserFormFields({ userId: String(currentUser.id), editedObj });
    alert("Changes are saved!");
    setModal(false);
  }

  // Logout Modal
  function handleLogoutModal() {
    setLogoutModal((prev) => !prev);
  }

  // Logout
  function handleLogoutUser() {
    dispatch(logoutUser());
    navigate("/login");
  }
  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/120"
          alt="Profile"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2 className="profile-name">{currentUser?.username}</h2>
          <p className="profile-role">{currentUser?.role}</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{currentUser?.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Username:</span>
          <span className="detail-value">{currentUser?.username}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Joined:</span>
          <span className="detail-value">{currentUser?.role}</span>
        </div>
      </div>

      <div className="profile-actions">
        <button onClick={handleEditModal} className="btn edit-btn">
          Edit Profile
        </button>
        <button onClick={handleLogoutModal} className="btn logout-btn">
          Log Out
        </button>
      </div>

      <div className={modal ? "d-block" : "d-none"}>
        <Modal>
          <div
            onClick={() => setModal(false)}
            style={{ textAlign: "right", cursor: "pointer" }}
          >
            X
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                disabled
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn--primary">
              <span>Save</span>
            </button>
          </form>
        </Modal>
      </div>

      {/* Logout modal */}
      <div className={logoutModal ? "d-block" : "d-none"}>
        <Modal>
          <div>
            <p>Are you sure you want to logout?</p>
            <div>
              <button
                onClick={handleLogoutUser}
                className="btn btn--primary mr-16"
              >
                <span>Yes</span>
              </button>
              <button
                onClick={() => setLogoutModal(false)}
                className="btn btn-primary "
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
