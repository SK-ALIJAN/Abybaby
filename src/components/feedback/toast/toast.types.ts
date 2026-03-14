import type { ReactNode } from "react";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface ToastCustomProps {
  bgColor?: string;
  showButton?: boolean;
  buttonLabel?: string;
  onButtonPress?: () => void;
}

export interface ShowToastOptions {
  type: ToastType;
  text1: string;
  text2?: string;

  duration?: number;
  position?: ToastPosition;

  icon?: ReactNode;
  image?: string;
  lottie?: ReactNode;

  pauseOnHover?: boolean;

  props?: ToastCustomProps;
}
