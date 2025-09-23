import { createSlice } from "@reduxjs/toolkit";
import type { Notification } from "../types";

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: (() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  })(),
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({
        message: action.payload.message,
        type: action.payload.type,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (note) => note.timestamp !== action.payload.timestamp
      );
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
      localStorage.removeItem("notifications");
    },
  },
});
export const { addNotification, removeNotification, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
