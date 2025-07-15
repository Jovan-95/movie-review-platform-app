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
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  director: string;
  image: string;
  rating: number;
  createdAt: string;
};

// Review
export type Review = {
  id: string;
  movieId: number;
  userId: number;
  rating: number;
  comment: string;
  date: string;
};

// Blog
export type Blog = {
  id: string;
  title: string;
  content: string;
  authorId: number;
  tags: string[];
  image: string;
  createdAt: string;
};
