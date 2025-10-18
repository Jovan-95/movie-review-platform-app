// Form register user fields
export type RegisterFormUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// User
export type User = {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  status: string;
  profileImage: string;
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
  id?: string;
  movieId: number;
  userId: string;
  rating: number;
  content: string;
  date: string;
};

// Blog
export type Blog = {
  id?: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  status: string;
  category: string;
};

// Comment
export type Comment = {
  id?: string; // UUID ili bilo koji string ID
  blogId: string;
  userId: string;
  comment: string;
  date: string;
};

export type UploadFileProps = {
  currentUser: User;
  editUserFormFields: (args: {
    userId: string;
    editedObj: Partial<User>;
  }) => void;
};

// Notifications
export type NotificationType = "success" | "error" | "info";

export type Notification = {
  type: string;
  message: string;
  timestamp: string;
};
