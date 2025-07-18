/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../services";
import { NavLink } from "react-router-dom";
import type { Blog } from "../types";

function Blog() {
  // Getting blogs
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
    <div className="home">
      {/* <!-- Blogs --> */}
      <section className="section movies-preview">
        <h2 className="section__title">Blogs</h2>
        <div className="cards">
          {blogs.map((blog: Blog) => (
            <NavLink key={blog.id} to={`/blog/${blog.id}`}>
              <div className="card">
                {/* <img
                  alt="movie"
                  className="card__img"
                /> */}
                <h3 className="card__title">{blog.title}</h3>
                <p>{blog.content}</p>
                <p className="card__meta">{blog.createdAt}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blog;
