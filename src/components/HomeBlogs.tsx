import { NavLink, useNavigate } from "react-router-dom";
import type { Blog, User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getBlogs, getUsers } from "../services";

function HomeBlogs() {
  const navigate = useNavigate();

  // Getting blogs from services with reactQuery
  const {
    data: blogs,
    isLoading: blogsIsLoading,
    error: blogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  // Getting users
  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Error handling
  if (blogsIsLoading || usersIsLoading) return <p>Loading...</p>;
  if (blogsError || usersError) return <p>{blogsError?.message}</p>;
  return (
    <section className="section blogs-preview">
      <h2 className="section__title">Latest Blog Posts</h2>
      <div className="blogs">
        {blogs?.map((blog: Blog) => {
          // Find blog author inside map, da svaki blog ima svog autora
          const blogAuthor = Array.isArray(users)
            ? users.find((user: User) => user.id === blog.authorId)
            : undefined;

          return (
            <NavLink key={blog.id} to={`/blog/${blog.id}`}>
              <div className="blog">
                <h3 className="blog__title">{blog.title}</h3>
                <p className="blog__excerpt truncate-single-line">
                  {blog.content}
                </p>
                <p className="blog__author">
                  By {blogAuthor?.username || "Unknown"}
                </p>
              </div>
            </NavLink>
          );
        })}
      </div>
      <div onClick={() => navigate("/blog")} className="section__link">
        Read Blog →
      </div>
    </section>
  );
}

export default HomeBlogs;
