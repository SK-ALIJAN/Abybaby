import { axiosInstance } from './axiosInstance';
import { storageService } from '../storage/storage.service';
import { PersistenceStorageKey } from '../storage/PersistenceStorageKey';
import { errorHandler } from '../../utils/ErrorHandler';

// Prevent multiple refresh calls
let isRefreshing = false;

let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

// ===============================
// REQUEST INTERCEPTOR
// ===============================
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = storageService.get<string>(
        'local',
        PersistenceStorageKey.TOKEN
      );

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (typeof window === 'undefined') {
      return Promise.reject(error);
    }

    // ===============================
    // TOKEN REFRESH LOGIC
    // ===============================
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = storageService.get<string>(
          'local',
          PersistenceStorageKey.REFRESH_TOKEN
        );

        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        const response = await axiosInstance.post('/auth/refresh', {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        storageService.set(
          'local',
          PersistenceStorageKey.TOKEN,
          newAccessToken
        );

        storageService.set(
          'local',
          PersistenceStorageKey.REFRESH_TOKEN,
          newRefreshToken
        );

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        storageService.clear('local');

        window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ===============================
    // GLOBAL HTTP ERROR HANDLER
    // ===============================
    /**
     * Centralized handler for all API/HTTP errors.
     * Manages status-based responses (4xx, 5xx) and
     * network failures via Axios interceptor.
     *
     * Note: This does not handle JS runtime errors.
     */

    errorHandler.handle(error);

    return Promise.reject(error);
  }
);
