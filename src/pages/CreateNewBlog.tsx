import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { postBlog } from "../services";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";

function CreateNewBlog() {
  const queryClient = useQueryClient();

  const [blogObj, setBlogObj] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });

  // POST HTTP
  const createBlogMut = useMutation({
    mutationFn: postBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
    onError: (err) => {
      alert("Registration failed!");
    },
  });

  // Find current logged user
  const loggedUser = useSelector((state: RootState) => state.auth.loggedInUser);

  function handleAddNewBlog(e) {
    e.preventDefault();

    if (
      blogObj.title === "" ||
      blogObj.category === "" ||
      blogObj.content === "" ||
      blogObj.image === ""
    ) {
      alert("Fill all fields!");
      return;
    }

    const newBlog = {
      id: String(Date.now()),
      title: blogObj.title,
      content: blogObj.content,
      authorId: loggedUser?.id,
      image: blogObj.image,
      createdAt: new Date().toLocaleString(),
      status: "pending",
    };

    createBlogMut.mutate(newBlog);
    alert("Your blog is submitted for review");

    blogObj.title = "";
    blogObj.category = "";
    blogObj.content = "";
    blogObj.image = "";
  }
  return (
    <div className="create-blog-page">
      <h1 className="page-title">Create New Blog</h1>
      <form className="create-blog-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Blog Title
          </label>
          <input
            onChange={(e) => setBlogObj({ ...blogObj, title: e.target.value })}
            value={blogObj.title}
            type="text"
            id="title"
            className="form-input"
            placeholder="Enter blog title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            onChange={(e) =>
              setBlogObj({ ...blogObj, category: e.target.value })
            }
            value={blogObj.category}
            id="category"
            className="form-input"
          >
            <option value="">Select category</option>
            <option value="movies">Movies</option>
            <option value="reviews">Reviews</option>
            <option value="news">News</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Cover Image URL
          </label>
          <input
            onChange={(e) => setBlogObj({ ...blogObj, image: e.target.value })}
            value={blogObj.image}
            type="text"
            id="image"
            className="form-input"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            onChange={(e) =>
              setBlogObj({ ...blogObj, content: e.target.value })
            }
            value={blogObj.content}
            id="content"
            className="form-textarea"
            placeholder="Write your blog content here..."
          ></textarea>
        </div>

        <button
          onClick={(e) => handleAddNewBlog(e)}
          type="submit"
          className="btn btn--primary"
        >
          <span>Publish Blog</span>
        </button>
      </form>
    </div>
  );
}

export default CreateNewBlog;
