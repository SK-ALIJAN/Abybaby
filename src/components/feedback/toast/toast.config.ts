import type { ToastType } from "./toast.types";

export const TOAST_STYLES: Record<
  ToastType,
  { bg: string; text: string; border: string }
> = {
  success: {
    bg: "#ecfdf5",
    text: "#065f46",
    border: "#16a34a",
  },
  error: {
    bg: "#fef2f2",
    text: "#7f1d1d",
    border: "#dc2626",
  },
  warning: {
    bg: "#fffbeb",
    text: "#92400e",
    border: "#f59e0b",
  },
  info: {
    bg: "#eff6ff",
    text: "#1e3a8a",
    border: "#2563eb",
  },
  loading: {
    bg: "#1f2937",
    text: "#ffffff",
    border: "#1f2937",
  },
};
