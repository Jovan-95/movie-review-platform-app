/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../services";
import { NavLink, useNavigate } from "react-router-dom";
import type { Blog } from "../types";
import { Grid } from "ldrs/react";
import { useState } from "react";

function Blog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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
  if (blogsIsLoading)
    return (
      <div className="loading-wrapper">
        <Grid size="100" speed="1" color="#2a5298 " />
      </div>
    );
  if (blogsError) return <p>{blogsError?.message}</p>;

  // Show only published blogs (approved by admin)
  const publishedBlogs = blogs?.filter(
    (blog: Blog) => blog.status === "published"
  );

  const filteredBlogs =
    selectedCategory === "all"
      ? publishedBlogs
      : publishedBlogs?.filter(
          (blog: Blog) => blog.category === selectedCategory
        );

  console.log("Published blogs", publishedBlogs);
  return (
    <div className="home">
      {/* <!-- Blogs --> */}
      <section className="section movies-preview">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 className="section__title">Blogs</h2>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              <option value="all">All categories</option>
              <option value="movies">Movies</option>
              <option value="news">News</option>
              <option value="reviews">Reviews</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            onClick={() => navigate("/blog/create-new-blog")}
            className="btn btn--primary mt-6"
          >
            <span>Create new blog +</span>
          </button>
        </div>
        <div className="cards mt-16">
          {filteredBlogs?.map((blog: Blog) => (
            <NavLink key={blog.id} to={`/blog/${blog.id}`}>
              <div className="card">
                {/* <img
                  alt="movie"
                  className="card__img"
                /> */}
                <h3 className="card__title">{blog.title}</h3>
                <p>{blog.content}</p>
                <p className="card__meta">
                  {blog?.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blog;
