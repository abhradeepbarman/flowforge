import cors from "cors";
import express from "express";
import config from "./config";
import errorHandler from "./middlewares/errorHandler";
import { authRoutes } from "./routes";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

/** Middlewares */
app.use(express.json());
app.use(
    cors({
        origin: config.FRONTEND_URL,
        credentials: true,
    })
);
app.use(cookieParser());
app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

/** Routes */
app.use("/api/v1/auth", authRoutes);

/** Error Handler */
app.use(errorHandler);

app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});

export default app;
