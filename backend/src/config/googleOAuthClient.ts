import { google } from "googleapis";
import config from ".";

export const googleOAuthClient = new google.auth.OAuth2(
    config.GOOGLE_CLIENT_ID,
    config.GOOGLE_CLIENT_SECRET,
    `${config.BACKEND_URL}/${config.GOOGLE_CALLBACK_URL}`
);

export const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
];
