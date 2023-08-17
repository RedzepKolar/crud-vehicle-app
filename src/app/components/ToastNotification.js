import { toast } from "react-toastify";

function ToastNotification ({ type, message }) {
  if (type === "success") {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      theme: "colored",
    });
  } else if (type === "error") {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      theme: "colored",
    });
  }
};

export const showSuccessNotification = (message) => {
  ToastNotification({ type: "success", message });
};

export const showErrorNotification = (message) => {
  ToastNotification({ type: "error", message });
};
