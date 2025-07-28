/* eslint-disable @typescript-eslint/no-unused-vars */
// http://localhost:3001/users
// http://localhost:3001/movies, umesto ovoga koristim pravi API dole
// http://localhost:3001/reviews
// http://localhost:3001/blogs
// http://localhost:3001/blogComments

// Local url
const localhostUrl = "http://localhost:3001";

// Real movies API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

import type { Comment, Review, User } from "./types";

//// Users
// Post HTTP method
export async function registerUser(user: User) {
  try {
    const res = await fetch(`${localhostUrl}/users`, {
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
    const res = await fetch(`${localhostUrl}/users`);
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method Edit user
export async function editUser(userId: string, editedObj: Partial<User>) {
  try {
    const res = await fetch(`${localhostUrl}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedObj),
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log("PATCH response:", data); // ✅ keep this console log
    return data;
  } catch (err) {
    console.error("PATCH error:", err);
    throw err;
  }
}

//// Patch HTTP method change user status (ban, unban, reject)
export async function changeUserStatus(
  userId: string | number,
  status: "active" | "rejected" | "banned"
) {
  const response = await fetch(`${localhostUrl}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user status");
  }

  return response.json();
}

//// Movies
// Get HTTP method. I am using real API for movies, not db.json
export async function getPopularMovies() {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
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
    const res = await fetch(`${localhostUrl}/reviews`);
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Post HTTP method
export async function createReview(review: Review) {
  try {
    const res = await fetch(`${localhostUrl}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
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
    const res = await fetch(`${localhostUrl}/blogs`);
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Comments
// Post HTTP method
export async function postComment(comment: Comment) {
  try {
    const res = await fetch(`${localhostUrl}/blogComments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
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
export async function getComments() {
  try {
    const res = await fetch(`${localhostUrl}/blogComments`);
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
