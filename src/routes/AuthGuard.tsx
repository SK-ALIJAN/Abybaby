import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from './routePaths';
import { useAuth } from '../context/AuthContext';

const AuthGuard = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
