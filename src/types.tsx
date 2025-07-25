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
  id: number;
  role: "user" | "admin";
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
  id: number;
  movieId: number;
  userId: number;
  rating: number;
  content: string;
  date: string;
};

// Blog
export type Blog = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  tags: string[];
  image: string;
  createdAt: string;
};

// Comment
export type Comment = {
  id: number;
  blogId: number;
  userId: number;
  comment: string;
  date: number;
};
