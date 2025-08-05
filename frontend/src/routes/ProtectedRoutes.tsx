import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = !!localStorage.getItem("accessToken");
    const location = useLocation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("token")) {
            localStorage.setItem("accessToken", searchParams.get("token")!);
        }
    }, [searchParams]);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoutes;
