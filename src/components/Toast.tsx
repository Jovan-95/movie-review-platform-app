// utils/toast.js
import { toast } from "react-toastify";
import store from "../Redux/store"; // tvoj redux store
import { addNotification } from "../Redux/notificationSlice";

export const showSuccessToast = (message: string) => {
  toast.success(message);
  // Koristimo store.dispatch jer ovo nije klasicna react funckija i nepodrzava useDispatch()
  store.dispatch(addNotification({ message, type: "success" }));
};

export const showErrorToast = (message: string) => {
  toast.error(message);
  store.dispatch(addNotification({ message, type: "error" }));
};

export const showInfoToast = (message: string) => {
  toast.info(message);
  store.dispatch(addNotification({ message, type: "info" }));
};
