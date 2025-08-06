import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../@types/features/authSlice";
import config from "../../config";

const isExist = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

const initialState: AuthState = {
    user_id: isExist ? isExist?.id : null,
    access_token: isExist ? isExist?.access_token : null,
};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state: AuthState, action) => {
            const payload = action.payload;
            state.user_id = payload.id;
            state.access_token = payload.access_token;
            localStorage.setItem("user", JSON.stringify(payload));
        },
        deleteCredentials: (state: AuthState) => {
            state.user_id = null;
            state.access_token = null;
            localStorage.removeItem("user");
            window.location.href = `${config.FRONTEND_URL}/login`;
        },
        updateCredentials: (state: AuthState, action) => {
            const payload = action.payload;
            state.user_id = payload.id;
            state.access_token = payload.access_token;
            localStorage.setItem("user", JSON.stringify(payload));
        },
    },
});

export const { setCredentials, deleteCredentials, updateCredentials } =
    authSlice.actions;
export default authSlice.reducer;
