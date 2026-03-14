import { Toaster } from "react-hot-toast";
import "./toast.css";

const ToastProvider = () => {
  return <Toaster gutter={10} />;
};

export default ToastProvider;
