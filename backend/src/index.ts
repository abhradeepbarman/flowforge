import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import errorHandler from "./middlewares/errorHandler";
import { appRoutes, authRoutes, workflowRoutes } from "./routes";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

/** Middlewares */
app.use(express.json());
app.use(
    cors({
        origin: [config.FRONTEND_URL, config.GOOGLE_URL],
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }),
);

/** Routes */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/workflow", workflowRoutes);
app.use("/api/v1/app", appRoutes);

/** Error Handler */
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
    errorHandler(err, req, res, next),
);

app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});

export default app;
