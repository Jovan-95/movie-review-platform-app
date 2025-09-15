// Form register user fields
export type RegisterFormUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// User
export type User = {
  username: string;
  email: string;
  password: string;
  id: string;
  role: "user" | "admin";
  status: string;
};

// Login user fields
export type LoginFormUser = {
  email: string;
  password: string;
};

// Movie
export type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  popularity: string;
  backdrop_path: string;
  vote_average: number;
};

// Review
export type Review = {
  id: string;
  movieId: number;
  userId: string;
  rating: number;
  content: string;
  date: string;
};

// Blog
export type Blog = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  image: string;
  createdAt: string;
  status: string;
};

// Comment
export type Comment = {
  id: number;
  blogId: string;
  userId: string;
  comment: string;
  date: number;
};

// Notifications
export type NotificationType = "success" | "error" | "info";

export interface Notification {
  message: string;
  type: NotificationType;
  timestamp: string;
}
