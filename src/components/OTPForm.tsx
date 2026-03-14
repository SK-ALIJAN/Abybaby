import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    otp: z.string().min(4, "OTP must be at least 4 digits"),
});

interface OTPFormProps {
    onSubmit: (data: { otp: string }) => void;
    isLoading: boolean;
    returnedOtp?: string;
}

const OTPForm: React.FC<OTPFormProps> = ({ onSubmit, isLoading, returnedOtp }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                <input
                    type="text"
                    {...register("otp")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="1234"
                />
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>}
                {returnedOtp && <p className="text-blue-500 text-xs mt-1 italic">Testing OTP: {returnedOtp}</p>}
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
                {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
        </form>
    );
};

export default OTPForm;
