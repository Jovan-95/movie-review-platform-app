// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice";
import usersReducer from "./usersSlice";
import notReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    notifications: notReducer,
  },
});

export default store;

// Types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
