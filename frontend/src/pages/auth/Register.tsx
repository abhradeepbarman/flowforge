import type { RootState } from "@/app/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { access_token } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (access_token) {
            navigate("/flows");
        }
    }, [access_token]);

    return <div>Register page</div>;
};

export default Register;
