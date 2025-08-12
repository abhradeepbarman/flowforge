import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='text-4xl font-bold'>Not Found</div>
            <Button onClick={() => navigate("/")}>Home</Button>
        </>
    );
};

export default NotFound;
