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
