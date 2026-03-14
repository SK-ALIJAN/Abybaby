import { API_ENDPOINTS } from "../../constants/apiEndPoints";
import type { LoginPayload, RegisterPayload, AuthResponse, OtpSendResponse } from "../../types/auth.types";
import { apiService } from "../api/axiosService";

export const authService = {
    sendOtp: async (mobile: string): Promise<OtpSendResponse> => {
        return await apiService.postCall<OtpSendResponse, { mobile: string }>(
            API_ENDPOINTS.OTP_SEND,
            { mobile }
        );
    },

    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        return await apiService.postCall<AuthResponse, LoginPayload>(
            API_ENDPOINTS.LOGIN,
            payload
        );
    },

    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined) {
                // Check if value is a File for the profile_image
                formData.append(key, value instanceof File ? value : String(value));
            }
        });

        return await apiService.postMultipartCall<AuthResponse, FormData>(
            API_ENDPOINTS.REGISTER,
            formData
        );
    },

    getProfile: async (userId: string | number): Promise<any> => {
        return await apiService.postCall<any, { user_id: string | number }>(
            API_ENDPOINTS.PROFILE,
            { user_id: userId }
        );
    },
};
