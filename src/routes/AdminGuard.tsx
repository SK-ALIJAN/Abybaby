import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routePaths';

const AdminGuard = () => {
    const isLogin = false; // this should be replace with redux or context api

    //   if (!user?.isAuthenticated) {
    //     return <Navigate to={ROUTES.SIGN_IN} replace />;
    //   }

    //   if (user.role !== 'admin') {
    //     return <Navigate to={ROUTES.HOME} replace />;
    //   }  here admin related logicshould write here 

    return <Outlet />;
};

export default AdminGuard;
