export interface User {
    id: number | string;
    name: string;
    email: string;
    mobile: string;
    company_name?: string | null;
    profile_image?: string | null;
    profile_img?: string | null;
    photo?: string | null;
    address?: string | null;
    city_name?: string | null;
    state_name?: string | null;
    district_name?: string | null;
    zipcode?: string | null;
    user_post_count?: number;
    locality_name?: string | null;
    area?: string | null;
    whatsapp_notification?: number;
}

export interface AuthResponse {
    result: {
        status: number;
        success: number;
        response: {
            token: string;
            user: User;
            otp?: string;
        };
        message: string;
    };
}

export interface OtpSendResponse {
    result: {
        status: number;
        success: number;
        response: {
            otp: string;
        };
        message: string;
        token?: string;
    };
}

export interface LoginPayload {
    mobile: string;
}

export interface RegisterPayload {
    user_type_id: number;
    name: string;
    mobile: string;
    email: string;
    company_name: string;
    firebase_token?: string;
    installation_id?: string;
    login_via: "ANDROID" | "IOS";
    gst_no: string;
    pan_no: string;
    location_id: number;
    profile_image: File;
}
