import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/modules/auth.service';
import LoginForm from '../../components/LoginForm';
import OTPForm from '../../components/OTPForm';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../routes/routePaths';
import toast from 'react-hot-toast';
import { useState } from 'react';
import type { OtpSendResponse, AuthResponse } from '../../types/auth.types';

const LoginPage = () => {
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState('');
    const [returnedOtp, setReturnedOtp] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const sendOtpMutation = useMutation({
        mutationFn: (mob: string) => authService.sendOtp(mob),
        onSuccess: (response: OtpSendResponse) => {
            console.log("OTP Response:", response);
            const { result } = response;
            // The API returns success: 1 for true
            if (result.success === 1 || result.response?.otp) {
                setStep(2);
                // The OTP might be Base64 encoded (e.g., "ODkxNjg1")
                let otpValue = result.response?.otp;
                try {
                    // Simple check if it might be base64
                    if (otpValue && otpValue.length > 4 && !/^\d+$/.test(otpValue)) {
                        otpValue = atob(otpValue);
                    }
                } catch (e) {
                    console.error("Failed to decode OTP:", e);
                }
                
                setReturnedOtp(otpValue || '');
                toast.success(result.message || "OTP sent successfully!");
            } else {
                toast.error(result.message || "Failed to send OTP");
            }
        },
        onError: (error: any) => {
            console.error("OTP Mutation Error:", error);
            toast.error("An error occurred. Please try again.");
        }
    });

    const loginMutation = useMutation({
        mutationFn: (mob: string) => authService.login({ mobile: mob }),
        onSuccess: (response: AuthResponse) => {
            const { result } = response;
            if (result.success === 1) {
                login(result.response.user, result.response.token);
                toast.success(result.message || "Login successful!");
                navigate(ROUTES.HOME);
            } else {
                // If user doesn't exist or other error, redirect to register
                toast(result.message || "User not found, please register.");
                navigate(ROUTES.REGISTER, { state: { mobile } });
            }
        },
        onError: (error: any) => {
            console.error("Login Mutation Error:", error);
            toast.error("Login failed. Please try again.");
        }
    });

    const handleSendOtp = (data: { mobile: string }) => {
        setMobile(data.mobile);
        sendOtpMutation.mutate(data.mobile);
    };

    const handleVerifyOtp = (data: { otp: string }) => {
        if (data.otp === returnedOtp) {
            loginMutation.mutate(mobile);
        } else {
            toast.error("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {step === 1 ? "Sign in to your account" : "Enter Verification Code"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {step === 1 ? "Enter your mobile number to receive an OTP" : `We've sent a code to ${mobile}`}
                    </p>
                </div>
                {step === 1 ? (
                    <LoginForm onSubmit={handleSendOtp} isLoading={sendOtpMutation.isPending} />
                ) : (
                    <OTPForm onSubmit={handleVerifyOtp} isLoading={loginMutation.isPending} returnedOtp={returnedOtp} />
                )}
            </div>
        </div>
    );
};

export default LoginPage;
