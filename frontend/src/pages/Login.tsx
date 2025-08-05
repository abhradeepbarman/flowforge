import config from "../config";

const Login = () => {
    const handleGoogleLogin = () => {
        window.location.href = `${config.API_URL}/api/v1/auth/google`;
    };

    return (
        <div>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
