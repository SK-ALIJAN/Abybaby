import React from "react";
import { Link, useLocation, matchPath } from "react-router-dom";

interface RouteConfig {
    path: string;
    label: string;
}

interface BreadcrumbProps {
    routes: RouteConfig[];
    separator?: React.ReactNode;
    renderContainer?: (children: React.ReactNode) => React.ReactNode;
    renderItem?: (
        crumb: { label: string; path: string; isLast: boolean },
        defaultNode: React.ReactNode
    ) => React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    routes,
    separator = "/",
    renderContainer,
    renderItem,
}) => {
    const { pathname } = useLocation();
    const segments = pathname.split("/").filter(Boolean);

    const breadcrumbs: { label: string; path: string }[] = [];
    let currentPath = "";

    segments.forEach((segment) => {
        currentPath += `/${segment}`;

        const match = routes.find((route) =>
            matchPath({ path: route.path, end: true }, currentPath)
        );

        if (match) {
            breadcrumbs.push({
                label: match.label,
                path: currentPath,
            });
        }
    });

    const content = (
        <>
            <Link to="/">Home</Link>

            {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;

                const defaultNode = (
                    <>
                        <span>{separator}</span>
                        {isLast ? (
                            <span>{crumb.label}</span>
                        ) : (
                            <Link to={crumb.path}>{crumb.label}</Link>
                        )}
                    </>
                );

                return (
                    <React.Fragment key={crumb.path}>
                        {renderItem
                            ? renderItem({ ...crumb, isLast }, defaultNode)
                            : defaultNode}
                    </React.Fragment>
                );
            })}
        </>
    );

    return renderContainer ? renderContainer(content) : <nav>{content}</nav>;
};

export default Breadcrumb;
