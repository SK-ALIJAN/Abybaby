export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}
