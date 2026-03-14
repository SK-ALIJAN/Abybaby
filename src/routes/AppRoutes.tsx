import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import MainLayout from "../layouts/MainLayout";
import AuthLayout from '../layouts/AuthLayout';

import AuthGuard from './AuthGuard';
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
                {/* Public / Authenticated */}
                <Route element={<AuthGuard />}>
                    <Route element={<MainLayout />}>
                        <Route path={ROUTES.HOME} element={<Home />} />
                    </Route>
                </Route>

                {/* Guest Only */}
                <Route element={<GuestGuard />}>
                    <Route element={<AuthLayout />}>
                        <Route path={ROUTES.LOGIN} element={<Login />} />
                        <Route path={ROUTES.REGISTER} element={<Register />} />
                    </Route>
                </Route>

                {/* Redirects */}
                <Route path="/signin" element={<Navigate to={ROUTES.LOGIN} replace />} />
                <Route path="/signup" element={<Navigate to={ROUTES.REGISTER} replace />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
