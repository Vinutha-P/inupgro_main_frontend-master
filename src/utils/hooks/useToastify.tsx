import { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";

export type ToastType = "success" | "error" | "info";

export const useToastify = () => {
  const [toast, setToast] = useState({
    message: "",
    type: "success" as ToastType,
    show: false,
  });

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type, show: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const getStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white shadow-lg border-l-4 border-green-700";
      case "error":
        return "bg-red-500 text-white shadow-lg border-l-4 border-red-700";
      case "info":
        return "bg-blue-500 text-white shadow-lg border-l-4 border-blue-700";
      default:
        return "bg-gray-800 text-white shadow-lg border-l-4 border-gray-700";
    }
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <AiOutlineCheckCircle className="w-6 h-6 text-white" />;
      case "error":
        return <AiOutlineCloseCircle className="w-6 h-6 text-white" />;
      case "info":
        return <AiOutlineInfoCircle className="w-6 h-6 text-white" />;
      default:
        return null;
    }
  };

  const ToastComponent = () =>
    toast.show ? (
      <div
        className={`fixed top-5 right-5 z-60 flex items-center gap-3 rounded-lg px-6 py-4 transition-all duration-300 w-[320px] ${getStyles(
          toast.type
        )}`}
      >
        {getIcon(toast.type)}
        <div className="text-sm font-medium">{toast.message}</div>
      </div>
    ) : null;

  return { showToast, ToastComponent };
};
