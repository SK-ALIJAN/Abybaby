import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/modules/auth.service';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user: authUser } = useAuth();
    const userId = authUser?.id || 1;

    const { data, isLoading, error } = useQuery({
        queryKey: ['sellerProfile', userId],
        queryFn: () => authService.getProfile(userId),
        enabled: !!userId,
    });

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Profile...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading profile data</div>;

    // The API might wrap data in result.response or just result
    const profileData = data?.result?.response || data?.response || data?.result || data;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white shadow-sm rounded-lg mt-10">
            <div className="flex items-center space-x-6 border-b pb-6">
                <img 
                    src={profileData?.profile_image || 'https://via.placeholder.com/150'} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                />
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{profileData?.name || 'Seller Name'}</h1>
                    <p className="text-gray-500">{profileData?.email}</p>
                    <p className="text-gray-500">{profileData?.mobile}</p>
                    {profileData?.company_name && (
                        <p className="mt-2 inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                            {profileData.company_name}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Store Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-500 uppercase">GST Number</p>
                        <p className="font-semibold">{profileData?.gst_no || 'N/A'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-500 uppercase">PAN Number</p>
                        <p className="font-semibold">{profileData?.pan_no || 'N/A'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-500 uppercase">Location ID</p>
                        <p className="font-semibold">{profileData?.location_id || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {profileData?.products && Array.isArray(profileData.products) && profileData.products.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {profileData.products.map((product: any) => (
                            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-bold">{product.name}</h3>
                                    <p className="text-indigo-600 font-semibold">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
