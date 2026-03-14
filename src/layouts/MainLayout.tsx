import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0">
                            <span className="text-xl font-black text-krishi-primary">Abybaby</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-slate-600">Hello, {user?.name || 'User'}</span>
                            <button
                                onClick={logout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-bold rounded-lg text-white bg-krishi-primary hover:bg-krishi-dark focus:outline-none transition-all shadow-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
