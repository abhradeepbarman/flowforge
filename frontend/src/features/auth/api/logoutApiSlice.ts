import { apiSlice } from "@/app/api/apiSlice";

export const logoutApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/api/v1/auth/logout",
                method: "POST",
            }),
        }),
    }),
});

export const { useLogoutMutation } = logoutApiSlice;
