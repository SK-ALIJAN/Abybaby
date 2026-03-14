import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/modules/auth.service';
import RegisterForm from '../../components/RegisterForm';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../routes/routePaths';
import toast from 'react-hot-toast';
import type { AuthResponse, RegisterPayload } from '../../types/auth.types';

const RegisterPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const initialMobile = state?.mobile || '';

    const registerMutation = useMutation({
        mutationFn: (payload: RegisterPayload) => authService.register(payload),
        onSuccess: (response: AuthResponse) => {
            const { result } = response;
            if (result.success === 1) {
                login(result.response.user, result.response.token);
                toast.success(result.message || "Registration successful!");
                navigate(ROUTES.HOME);
            } else {
                toast.error(result.message || "Registration failed");
            }
        },
        onError: (error: any) => {
            console.error("Register Mutation Error:", error);
            toast.error("An error occurred during registration.");
        }
    });

    const handleRegister = (data: RegisterPayload) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <RegisterForm onSubmit={handleRegister} isLoading={registerMutation.isPending} initialMobile={initialMobile} />
        </div>
    );
};

export default RegisterPage;
