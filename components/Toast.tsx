// components/Toast.tsx
import { useEffect } from "react";

export default function Toast({
  message,
  type = "error",
  onClose,
}: {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div className={`fixed top-4 right-4 z-50`}>
      <div
        className={`text-white px-4 py-3 rounded-md shadow-lg ${bgColors[type]} max-w-xs`}
      >
        {message}
      </div>
    </div>
  );
}
