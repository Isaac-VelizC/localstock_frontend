import { ToastContainer, toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ReactNode } from "react";
import { createContext } from "react";

export type ToastContextType = {
  showToast: (message: string, type?: "success" | "error" | "info" | "warning", options?: ToastOptions) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info",
    options?: ToastOptions
  ) => {
    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "warning":
        toast.warning(message, options);
        break;
      default:
        toast.info(message, options);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar closeOnClick pauseOnHover />
    </ToastContext.Provider>
  );
};

