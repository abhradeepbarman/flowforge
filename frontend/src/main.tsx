import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <Toaster position="top-right" />
        </BrowserRouter>
    </Provider>
);
