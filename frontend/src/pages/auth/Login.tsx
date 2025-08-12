import type { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import config from "@/config";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { access_token } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (access_token) {
            navigate("/flows");
        }
    }, [access_token]);

    const handleGoogleLogin = () => {
        window.location.href = `${config.API_URL}/api/v1/auth/google`;
    };

    return (
        <div>
            <Button onClick={handleGoogleLogin}>
                <FaGoogle />
                Login with Google
            </Button>
        </div>
    );
};

export default Login;
