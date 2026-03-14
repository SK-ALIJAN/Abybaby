import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.PUBLIC_API_URL,
    withCredentials: true, // Important for cookies
    headers: {
        'Content-Type': 'application/json',
    },
});
