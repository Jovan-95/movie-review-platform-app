// http://localhost:3001/users
// http://localhost:3001/movies
// http://localhost:3001/reviews
// http://localhost:3001/blogs
// http://localhost:3001/blogComments

import type { User } from "./types";

//// Users

// Post HTTP method
export async function registerUser(user: User) {
  try {
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Get HTTP method
export async function getUsers() {
  try {
    const res = await fetch("http://localhost:3001/users");
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Movies
// Get HTTP method
export async function getMovies() {
  try {
    const res = await fetch("http://localhost:3001/movies");
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Reviews
// Get HTTP method
export async function getReviews() {
  try {
    const res = await fetch("http://localhost:3001/reviews");
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Blogs
// Get HTTP method
export async function getBlogs() {
  try {
    const res = await fetch("http://localhost:3001/blogs");
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
