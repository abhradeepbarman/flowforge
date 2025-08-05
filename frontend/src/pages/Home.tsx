import { useNavigate } from "react-router-dom";
import config from "../config";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch(`${config.API_URL}/api/v1/auth/logout`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem(
                        "access_token"
                    )}`,
                    "Allow-Control-Allow-Origin": "*",
                },
                method: "POST",
                credentials: "include",
            });

            localStorage.removeItem("access_token");
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            Home Page <button onClick={handleLogout}>Logout</button>{" "}
        </div>
    );
};

export default Home;
