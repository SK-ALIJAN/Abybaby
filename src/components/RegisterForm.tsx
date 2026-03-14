import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    user_type_id: z.coerce.number().min(1, "User type is required"),
    name: z.string().min(2, "Full name is required"),
    mobile: z.string().length(10, "Mobile must be 10 digits"),
    email: z.string().email("Invalid email address"),
    company_name: z.string().min(2, "Company name is required"),
    gst_no: z.string().min(15, "Invalid GST number"),
    pan_no: z.string().min(10, "Invalid PAN number"),
    location_id: z.coerce.number().min(1, "Location ID is required"),
    login_via: z.enum(["ANDROID", "IOS"]),
    profile_image: z.any().refine((files) => files?.length > 0, "Profile image is required"),
});

interface RegisterFormProps {
    onSubmit: (data: any) => void;
    isLoading: boolean;
    initialMobile?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading, initialMobile }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            mobile: initialMobile || '',
            login_via: 'ANDROID' as const,
            user_type_id: 1,
        }
    });

    const handleFormSubmit = (data: any) => {
        const payload = {
            ...data,
            profile_image: data.profile_image[0]
        };
        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Register New User</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" {...register("name")} className="mt-1 block w-full border rounded-md p-2 focus:ring-krishi-primary focus:border-krishi-primary outline-none" />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <input type="text" {...register("mobile")} className="mt-1 block w-full border rounded-md p-2 bg-gray-100" readOnly={!!initialMobile} />
                    {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" {...register("email")} className="mt-1 block w-full border rounded-md p-2 focus:ring-krishi-primary focus:border-krishi-primary outline-none" />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input type="text" {...register("company_name")} className="mt-1 block w-full border rounded-md p-2 focus:ring-krishi-primary focus:border-krishi-primary outline-none" />
                    {errors.company_name && <p className="text-red-500 text-xs">{errors.company_name.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">GST Number</label>
                    <input type="text" {...register("gst_no")} className="mt-1 block w-full border rounded-md p-2 focus:ring-krishi-primary focus:border-krishi-primary outline-none" placeholder="22ABCDE1234F1Z5" />
                    {errors.gst_no && <p className="text-red-500 text-xs">{errors.gst_no.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">PAN Number</label>
                    <input type="text" {...register("pan_no")} className="mt-1 block w-full border rounded-md p-2 focus:ring-krishi-primary focus:border-krishi-primary outline-none" placeholder="ABCDE1234F" />
                    {errors.pan_no && <p className="text-red-500 text-xs">{errors.pan_no.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Location ID</label>
                    <input type="number" {...register("location_id")} className="mt-1 block w-full border rounded-md p-2 focus:ring-krishi-primary focus:border-krishi-primary outline-none" />
                    {errors.location_id && <p className="text-red-500 text-xs">{errors.location_id.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">User Type ID</label>
                    <input type="number" {...register("user_type_id")} className="mt-1 block w-full border rounded-md p-2 focus:ring-krishi-primary focus:border-krishi-primary outline-none" />
                    {errors.user_type_id && <p className="text-red-500 text-xs">{errors.user_type_id.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Login Via</label>
                    <select {...register("login_via")} className="mt-1 block w-full border rounded-md p-2">
                        <option value="ANDROID">ANDROID</option>
                        <option value="IOS">IOS</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input type="file" {...register("profile_image")} className="mt-1 block w-full" />
                    {errors.profile_image && <p className="text-red-500 text-xs">{errors.profile_image.message as string}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-krishi-primary hover:bg-krishi-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-krishi-primary disabled:opacity-50 transition-all"
            >
                {isLoading ? "Registering..." : "Register"}
            </button>
        </form>
    );
};

export default RegisterForm;
