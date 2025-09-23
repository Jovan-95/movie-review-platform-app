import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services";
import type { User } from "../types";
import { NavLink } from "react-router-dom";

function Users() {
  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (usersIsLoading) return <p>Loading...</p>;
  if (usersError) return <p>{usersError?.message}</p>;
  if (!Array.isArray(users) || users.length === 0) return <p>No users found</p>;

  return (
    <section className="users-page">
      <h2 className="users-page__title">All Users</h2>
      <div className="users-page__grid">
        {users.map((user: User) => (
          <NavLink to={`/users/${user.id}`} key={user.id}>
            <div key={user.id} className="user-card">
              <img
                className="user-card__avatar"
                src={user.profileImage}
                alt={user.username}
              />
              <h3 className="user-card__name">{user.username}</h3>
              <p className="user-card__email">{user.email}</p>
              <p className="user-card__role">{user.role}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

export default Users;
