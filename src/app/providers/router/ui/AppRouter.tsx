import React, { memo, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/widgets/PageLoader/PageLoader';
import { useSelector } from 'react-redux';
import {getUserAuthData, getUserRoles} from '@/entities/user';
import {checkRoles} from "@/features/checkRoles/checkRoles";

const AppRouter = () => {
    const isAuth = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRoles);

    const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
        if (route.authOnly && !isAuth) {
            return false;
        }
        if (!route.userRoles){
            return true;
        } else {
            return checkRoles(route.userRoles, userRoles)
        }
    }), [isAuth, userRoles]);

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<PageLoader />}>
                            {element}
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    );
};

export default memo(AppRouter);
