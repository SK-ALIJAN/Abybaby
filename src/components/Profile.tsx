import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/modules/auth.service';
import { useAuth } from '../context/AuthContext';
import {
    MapPin,
    Mail,
    Phone,
    Briefcase,
    FileText,
    Map,
    User as UserIcon
} from 'lucide-react';

const Profile = () => {
    const { user: authUser } = useAuth();
    const userId = authUser?.id || 1;

    const { data, isLoading, error } = useQuery({
        queryKey: ['sellerProfile', userId],
        queryFn: () => authService.getProfile(userId),
        enabled: !!userId,
    });

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="w-12 h-12 border-4 border-krishi-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Loading Abybaby Profile...</p>
        </div>
    );

    if (error) return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-red-50 border border-red-100 rounded-2xl text-center">
            <p className="text-red-600 font-semibold mb-2">Sync Error</p>
            <p className="text-red-500 text-sm">We couldn't retrieve your profile data at this time.</p>
        </div>
    );

    // The API might wrap data in result.response (based on latest feedback)
    const profileData = data?.result?.response || data?.response || data?.result || data;

    // Resolve profile image from various potential keys
    const profileImageUrl = profileData?.photo
        ? `https://d32neyt9p9wyaf.cloudfront.net/public/uploads/user/profile/${profileData.photo}`
        : profileData?.profile_image || profileData?.profile_img || 'https://via.placeholder.com/150';

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
            {/* Header / Primary Info Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-krishi-dark to-krishi-primary"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex flex-col md:flex-row md:items-end -mt-16 mb-6 gap-6">
                        <div className="relative">
                            <img
                                src={profileImageUrl}
                                alt="Profile"
                                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
                            />
                            {profileData?.verify_tag && (
                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                                    <UserIcon className="w-4 h-4" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 pb-1">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                {profileData?.name || 'Abybaby user'}
                            </h1>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                                    <Mail className="w-4 h-4 text-krishi-primary" />
                                    {profileData?.email}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                                    <Phone className="w-4 h-4 text-krishi-primary" />
                                    {profileData?.mobile}
                                </span>
                            </div>
                        </div>
                        <div className="flex md:pb-1 gap-3">
                             <div className="bg-emerald-50 px-4 py-2 rounded-xl text-center border border-krishi-primary/10">
                                <p className="text-xs font-bold text-krishi-primary uppercase tracking-wider">Posts</p>
                                <p className="text-xl font-black text-krishi-dark">{profileData?.user_post_count || 0}</p>
                             </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-slate-100 pt-8">
                        <section className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Business Info
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">Company</p>
                                    <p className="text-slate-700 font-bold">{profileData?.company_name || 'Individual Profile'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">GST / PAN</p>
                                    <p className="text-slate-700 font-semibold">{profileData?.gst_no || 'N/A'} / {profileData?.pan_no || 'N/A'}</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Location
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">City & State</p>
                                    <p className="text-slate-700 font-bold">{profileData?.city_name || profileData?.locality_name}, {profileData?.state_name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">Zipcode</p>
                                    <p className="text-slate-700 font-semibold">{profileData?.zipcode || 'N/A'}</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4 lg:col-span-1 md:col-span-2">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Map className="w-4 h-4" /> Full Address
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
                                "{profileData?.address || profileData?.area || 'No address details provided.'}"
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            {/* Products or Additional Data Section */}
            {profileData?.products && Array.isArray(profileData.products) && profileData.products.length > 0 && (
                <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <FileText className="w-6 h-6 text-krishi-primary" /> 
                            Featured Offerings
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profileData.products.map((product: any) => (
                            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-krishi-primary/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
                                <div className="h-48 overflow-hidden bg-slate-100">
                                    <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-800 line-clamp-1">{product.name}</h3>
                                    <div className="flex items-center justify-between mt-3">
                                        <p className="text-krishi-primary font-black text-lg">${product.price}</p>
                                        <button className="text-xs font-bold text-krishi-primary hover:text-krishi-dark">Details &rarr;</button>
                                    </div>
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
