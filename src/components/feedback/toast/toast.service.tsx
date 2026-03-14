import toast from "react-hot-toast";
import ToastCard from "./ToastCard";
import type { ShowToastOptions } from "./toast.types";

// ========================
// Normal Toast
// ========================

export const showToast = (
  options: ShowToastOptions
) => {
  return toast.custom(
    (t) => <ToastCard toastRef={t} options={options} />,
    {
      duration: options.duration ?? 4000,
      position: options.position ?? "top-right",
    }
  );
};

// ========================
// Promise Toast
// ========================

export const showPromiseToast = async <T,>(
  promise: Promise<T>,
  config: {
    loading: string;
    success: string;
    error: string;
    position?: ShowToastOptions["position"];
  }
): Promise<T> => {
  const {
    loading,
    success,
    error,
    position = "top-right",
  } = config;

  // Show loading toast (persist)
  const loadingId = showToast({
    type: "loading",
    text1: loading,
    duration: Infinity,
    position,
  });

  try {
    const result = await promise;

    // Safely dismiss loading
    toast.dismiss(loadingId);

    showToast({
      type: "success",
      text1: success,
      position,
    });

    return result;
  } catch (err) {
    toast.dismiss(loadingId);

    showToast({
      type: "error",
      text1: error,
      position,
    });

    throw err;
  }
};
