import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from './routePaths';

const AuthGuard = () => {
    const isLogin = false; // this should be replace with redux or context api
    const location = useLocation();

    if (isLogin) {
        return <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
