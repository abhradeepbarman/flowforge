import { useLogoutMutation } from "@/features/auth/api/logoutApiSlice";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { deleteCredentials } from "@/features/auth/authSlice";

const LogoutBtn = () => {
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            dispatch(deleteCredentials());
        }
    };

    return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutBtn;
