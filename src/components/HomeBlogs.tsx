import { NavLink, useNavigate } from "react-router-dom";
import type { Blog } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../services";

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

  // Error handling
  if (blogsIsLoading) return <p>Loading...</p>;
  if (blogsError) return <p>{blogsError?.message}</p>;
  return (
    <section className="section blogs-preview">
      <h2 className="section__title">Latest Blog Posts</h2>
      <div className="blogs">
        {blogs?.map((blog: Blog) => (
          <NavLink key={blog.id} to={`/blog/${blog.id}`}>
            <div className="blog">
              <h3 className="blog__title">{blog.title}</h3>
              <p className="blog__excerpt truncate-single-line">
                {blog.content}
              </p>
              {/* TODO Jovan, find author of the blog with ID */}
              <p className="blog__author">By {blog.authorId}</p>
            </div>
          </NavLink>
        ))}
      </div>
      <div onClick={() => navigate("/blog")} className="section__link">
        Read Blog →
      </div>
    </section>
  );
}

export default HomeBlogs;
