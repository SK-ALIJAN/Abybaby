import { message } from 'antd';
import { axiosInstance } from './axiosInstance';
import { storageService } from '../storage/storage.service';
import { PersistenceStorageKey } from '../storage/PersistenceStorageKey';

/**
 * Optional request configuration
 */
interface RequestConfig {
  params?: Record<string, unknown>;
  showSuccess?: boolean;
  successMessage?: string;
}

class APIServices {
  /**
   * Get current language from storage
   */
  private getLanguage(): string {
    const lng = storageService.get<string>(
      'local',
      PersistenceStorageKey.LANGUAGE
    );
    return lng || 'en-US';
  }

  /**
   * Handle optional success toast
   */
  private handleSuccess<T>(response: T, config?: RequestConfig) {
    if (config?.showSuccess) {
      const msg =
        config.successMessage ||
        (response as any)?.message ||
        'Success';

      message.success(msg);
    }
  }

  // ===============================
  // GET
  // ===============================
  async getCall<T = unknown>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<T> {
    const response = await axiosInstance.get<T>(endpoint, {
      headers: {
        'Accept-Language': this.getLanguage(),
      },
      params: config?.params,
    });

    this.handleSuccess(response.data, config);

    return response.data;
  }

  // ===============================
  // POST
  // ===============================
  async postCall<T, B>(
    endpoint: string,
    body: B,
    config?: RequestConfig
  ): Promise<T> {
    const response = await axiosInstance.post<T>(endpoint, body, {
      headers: {
        'Accept-Language': this.getLanguage(),
      },
      params: config?.params,
    });

    this.handleSuccess(response.data, config);

    return response.data;
  }

  // ===============================
  // PATCH
  // ===============================
  async patchCall<T, B>(
    endpoint: string,
    body: B,
    config?: RequestConfig
  ): Promise<T> {
    const response = await axiosInstance.patch<T>(endpoint, body, {
      headers: {
        'Accept-Language': this.getLanguage(),
      },
      params: config?.params,
    });

    this.handleSuccess(response.data, config);

    return response.data;
  }

  // ===============================
  // PUT
  // ===============================
  async putCall<T, B>(
    endpoint: string,
    body: B,
    config?: RequestConfig
  ): Promise<T> {
    const response = await axiosInstance.put<T>(endpoint, body, {
      headers: {
        'Accept-Language': this.getLanguage(),
      },
      params: config?.params,
    });

    this.handleSuccess(response.data, config);

    return response.data;
  }

  // ===============================
  // DELETE
  // ===============================
  async deleteCall<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<T> {
    const response = await axiosInstance.delete<T>(endpoint, {
      headers: {
        'Accept-Language': this.getLanguage(),
      },
      params: config?.params,
    });

    this.handleSuccess(response.data, config);

    return response.data;
  }

  // ===============================
  // MULTIPART POST
  // ===============================
  async postMultipartCall<T, B>(
    endpoint: string,
    body: B,
    config?: RequestConfig
  ): Promise<T> {
    const response = await axiosInstance.post<T>(endpoint, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        'Accept-Language': this.getLanguage(),
      },
      params: config?.params,
    });

    this.handleSuccess(response.data, config);

    return response.data;
  }

  // ===============================
  // MULTIPART PATCH
  // ===============================
  async patchMultipartCall<T, B>(
    endpoint: string,
    body: B,
    config?: RequestConfig
  ): Promise<T> {
    const response = await axiosInstance.patch<T>(endpoint, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        'Accept-Language': this.getLanguage(),
      },
      params: config?.params,
    });

    this.handleSuccess(response.data, config);

    return response.data;
  }

  // ===============================
  // MULTIPART PUT
  // ===============================
  async putMultipartCall<T, B>(
    endpoint: string,
    body: B,
    config?: RequestConfig
  ): Promise<T> {
    const response = await axiosInstance.put<T>(endpoint, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        'Accept-Language': this.getLanguage(),
      },
      params: config?.params,
    });

    this.handleSuccess(response.data, config);

    return response.data;
  }
}

export const apiService = new APIServices();
