/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../Redux/store";
import type { Notification } from "../types";
import {
  clearNotifications,
  removeNotification,
} from "../Redux/notificationSlice";

function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  function handleRemoveNotification(note: Notification) {
    console.log(note);
    dispatch(removeNotification(note));
  }

  function handleRemoveAll() {
    dispatch(clearNotifications());
  }
  return (
    <>
      <div className="notifications-page">
        <h2>Notifications</h2>
        {notifications.map((note: Notification, idx: number) => (
          <div key={idx} className={`notification ${note.type}`}>
            <p className="text-18">
              <strong>{note.type.toUpperCase()}:</strong> {note.message}
            </p>
            <small>{new Date(note.timestamp).toLocaleString()}</small>
            <button
              onClick={() => handleRemoveNotification(note)}
              className="btn btn--primary mt-16"
            >
              <span>Remove</span>
            </button>
          </div>
        ))}
        {notifications.length < 1 ? (
          ""
        ) : (
          <button onClick={handleRemoveAll} className="btn btn--primary">
            <span>Remove ALL</span>
          </button>
        )}
      </div>
    </>
  );
}

export default Notifications;
