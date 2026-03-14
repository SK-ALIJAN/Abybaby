export const ROUTES = {
  REGISTER: '/register',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  HOME: '/',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
