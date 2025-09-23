import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../../services";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../../types";

function SingleUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Getting users
  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const singleUser = users?.find((user: User) => user.id === id);

  // Error handling
  if (usersIsLoading) return <p>Loading...</p>;
  if (usersError) return <p>{usersError?.message}</p>;
  if (!users) return <p>No data found.</p>;

  return (
    <div className="single-user-page">
      <button className="back-btn" onClick={() => navigate("/users")}>
        ← Back to Users
      </button>

      <div className="single-user-card">
        <div className="avatar-wrapper">
          <img
            src={singleUser?.profileImage}
            alt={singleUser?.username}
            className="single-user-card__avatar"
          />
        </div>

        <h2 className="single-user-card__name">{singleUser?.username}</h2>
        <p className="single-user-card__email">{singleUser?.email}</p>
        <p className="single-user-card__role">{singleUser?.role}</p>
      </div>
    </div>
  );
}

export default SingleUser;
