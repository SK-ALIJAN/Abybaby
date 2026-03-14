import { message } from "antd";
import { AxiosError } from "axios";
import { globalErrorService } from "../services/core/globalErrorService";


interface ApiErrorResponse {
    message?: string;
    errors?: Record<string, string[]>;
}

class ErrorHandler {
    handle(error: unknown) {
        const err = error as AxiosError<ApiErrorResponse>;

        const statusCode = err?.response?.status;
        const data = err?.response?.data;

        // Network error
        if (!statusCode) {
            message.error("Network error. Please check your connection.");

            globalErrorService.show({ status: 0 });
            return;
        }

        // Validation errors
        if (data?.errors && Object.keys(data.errors).length > 0) {
            const formatted = Object.entries(data.errors)
                .map(([field, errors]) => {
                    const label = field.replace(/_/g, " ");
                    return `${label}: ${errors.join(", ")}`;
                })
                .join("\n");

            message.error(formatted);
            return;
        }

        switch (statusCode) {
            case 400:
                message.error(data?.message || "Invalid request.");
                break;

            case 401:
                message.error(data?.message || "Unauthorized.");
                break;

            case 403:
                message.error(data?.message || "Forbidden.");
                break;

            case 404:
                message.error("Resource not found.");
                break;

            case 500:
            case 503:
                message.error(data?.message || "Server unavailable.");

                globalErrorService.show({
                    status: statusCode,
                    message: data?.message,
                });
                break;

            default:
                message.error(data?.message || "Something went wrong.");
        }
    }
}

export const errorHandler = new ErrorHandler();
