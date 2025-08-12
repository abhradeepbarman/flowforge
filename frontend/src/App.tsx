import { Route, Routes } from "react-router-dom";
import Flows from "./pages/flow/Flows";
import Home from "./pages/landing/Home";
import Login from "./pages/auth/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import FlowEditor from "./pages/flow/FlowEditor";
import Register from "./pages/auth/Register";
import NotFound from "./pages/not-found";

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
                path='/flows'
                element={
                    <ProtectedRoutes>
                        <Flows />
                    </ProtectedRoutes>
                }
            />
            <Route
                path='/flows/editor/:flowId'
                element={
                    <ProtectedRoutes>
                        <FlowEditor />
                    </ProtectedRoutes>
                }
            />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default App;
