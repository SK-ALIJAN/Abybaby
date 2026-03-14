import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import MainLayout from "../layouts/MainLayout";
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';

import AdminGuard from './AdminGuard';
import GuestGuard from './GuestGuard';
import { ROUTES } from './routePaths';
import NotFound from '../pages/404';

// Lazy load pages
const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));


const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>

                {/* Public */}
                <Route element={<MainLayout />}>
                    <Route path={ROUTES.HOME} element={<Home />} />
                </Route>

                {/* Guest */}
                <Route element={<GuestGuard />}>
                    <Route element={<AuthLayout />}>
                        <Route path={ROUTES.SIGN_IN} element={<Login />} />
                        <Route path={ROUTES.SIGN_UP} element={<Register />} />
                    </Route>
                </Route>

                {/* Authenticated */}
                {/* <Route element={<AuthGuard />}>
                    <Route element={<MainLayout />}>
                        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    </Route>
                </Route> */}

                {/* Admin */}
                {/* <Route element={<AdminGuard />}>
                    <Route element={<AdminLayout />}>
                        <Route path={ROUTES.ADMIN} element={<AdminPanel />} />
                    </Route>
                </Route> */}

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
