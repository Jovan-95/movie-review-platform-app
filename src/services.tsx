/* eslint-disable @typescript-eslint/no-unused-vars */
// Real movies API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

import { supabase } from "./supabaseClient";
import type { Blog, Comment, Review, User } from "./types";

//// Users
// Create user
export async function registerUser(user: User) {
  const { data, error } = await supabase.from("users").insert([user]);
  if (error) throw error;
  return data;
}

// Get all users
export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
}

// Edit user
export async function editUser(userId: string, editedObj: Partial<User>) {
  const { data, error } = await supabase
    .from("users")
    .update(editedObj)
    .eq("id", userId);
  if (error) throw error;
  return data;
}

// Change user status
export async function changeUserStatus(
  userId: string,
  status: "active" | "rejected" | "banned"
) {
  const { data, error } = await supabase
    .from("users")
    .update({ status })
    .eq("id", userId);
  if (error) throw error;
  return data;
}

// Delete user
export async function deleteUser(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);
  if (error) throw error;
  return data;
}

// Upload avatar
export async function uploadAvatar(
  file: File,
  userId: string
): Promise<string> {
  if (!file) throw new Error("No file provided");
  if (!userId) throw new Error("No userId provided");

  const ext = file.name.split(".").pop();
  const baseName = file.name.split(".")[0].replace(/\W/g, "_");
  const fileName = `${Date.now()}_${baseName}.${ext}`;
  const filePath = `${userId}/${fileName}`;

  // Upload u bucket
  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
      contentType: file.type,
    });

  if (error) throw error;

  // Public URL
  const { data: publicData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);
  if (!publicData?.publicUrl) throw new Error("Failed to get public URL");

  return publicData.publicUrl;
}

//// Reviews
// Get all reviews
export async function getReviews() {
  const { data, error } = await supabase.from("reviews").select("*");
  if (error) throw error;
  return data;
}

// Create review
export async function createReview(review: Review) {
  const { data, error } = await supabase.from("reviews").insert([review]);
  if (error) throw error;
  return data;
}

// Delete review
export async function deleteReview(reviewId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId);
  if (error) throw error;
  return data;
}

//// Blogs
// Get all blogs
export async function getBlogs() {
  const { data, error } = await supabase.from("blogs").select("*");
  if (error) throw error;
  return data;
}

// Post a blog
export async function postBlog(blog: Blog) {
  const { data, error } = await supabase.from("blogs").insert([blog]);
  if (error) throw error;
  return data;
}

// Change blog status
export async function changeBlogStatus(
  blogId: string,
  status: "published" | "rejected"
) {
  const { data, error } = await supabase
    .from("blogs")
    .update({ status })
    .eq("id", blogId);
  if (error) throw error;
  return data;
}

// Delete blog
export async function deleteBlog(blogId: string) {
  const { data, error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", blogId);
  if (error) throw error;
  return data;
}

// Comments
// Get comments
export async function getComments() {
  const { data, error } = await supabase.from("blogComments").select("*");
  if (error) throw error;
  return data;
}

// Post comment
export async function postComment(comment: Comment) {
  const { data, error } = await supabase.from("blogComments").insert([comment]);
  if (error) throw error;
  return data;
}

// Delete comment
export async function deleteComment(commentId: string) {
  const { data, error } = await supabase
    .from("blogComments")
    .delete()
    .eq("id", commentId);
  if (error) throw error;
  return data;
}

/////////////////////////////////// Movies
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
