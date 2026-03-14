import { API_ENDPOINTS } from "../../constants/apiEndPoints";
import type { LoginPayload, RegisterPayload, User } from "../../types/auth.types";
import { apiService } from "../api/axiosService";


interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export const authService = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        return await apiService.postCall<AuthResponse, LoginPayload>(
            API_ENDPOINTS.LOGIN,
            payload,
        );
    },

    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        return await apiService.postCall<AuthResponse, RegisterPayload>(
            API_ENDPOINTS.REGISTER,
            payload
        );
    },

    getProfile: async (): Promise<User> => {
        return await apiService.getCall<User>(API_ENDPOINTS.PROFILE);
    },

    logout: async (): Promise<void> => {
        await apiService.postCall<void, {}>(API_ENDPOINTS.LOGOUT, {});
    },
};
