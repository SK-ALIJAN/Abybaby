import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routePaths';
import { useAuth } from '../context/AuthContext';

const GuestGuard = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
};

export default GuestGuard;
