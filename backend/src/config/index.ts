import "dotenv/config";

const _config = {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "",
};

const config = Object.freeze(_config);
export default config;
