// hooks/useToast.ts
import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error" | "info";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "error"
  ) => {
    setToast({ message, type });
  };

  const hideToast = () => setToast(null);

  return {
    toast,
    showToast,
    hideToast,
  };
}
