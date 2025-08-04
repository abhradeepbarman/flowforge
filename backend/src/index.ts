import express from "express";
import config from "./config";
import cors from "cors";
import { authRoutes } from "./routes";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();

/** Middlewares */
app.use(express.json());
app.use(cors());

/** passport */
app.use(
    session({
        secret: "your-secret-key",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile) => {
            console.log("profile", profile);
            console.log("access token", accessToken);
            console.log("refresh token", refreshToken);
            return profile;
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});

/** Routes */
app.use("/api/v1/auth", authRoutes);

app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});

export default app;
