import { Route, Routes } from "react-router-dom";
import Flows from "./pages/Flows";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import FlowEditor from "./pages/FlowEditor";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/flows"
                element={
                    <ProtectedRoutes>
                        <Flows />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/flows/editor/:flowId"
                element={
                    <ProtectedRoutes>
                        <FlowEditor />
                    </ProtectedRoutes>
                }
            />
        </Routes>
    );
};

export default App;
