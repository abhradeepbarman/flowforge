import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoutes>
                        <Home />
                    </ProtectedRoutes>
                }
            />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default App;
