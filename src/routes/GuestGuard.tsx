import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routePaths';

const GuestGuard = () => {
    const isLogin = false; // this should be replace with redux or context api

    if (isLogin) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
};

export default GuestGuard;
