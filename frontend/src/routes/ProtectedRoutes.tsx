import { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";
import type { RootState } from "../app/store";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { access_token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (searchParams.get("token") && searchParams.get("userId")) {
            dispatch(
                setCredentials({
                    user_id: searchParams.get("userId")!,
                    access_token: searchParams.get("token")!,
                })
            );
        }
    }, [searchParams, dispatch]);

    if (!access_token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoutes;
