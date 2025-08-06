import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoutes>
                        <Dashboard />
                    </ProtectedRoutes>
                }
            />
        </Routes>
    );
};

export default App;
