import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import config from "../../config";
import type { RootState } from "../store";
import {
    deleteCredentials,
    setCredentials,
} from "../../features/auth/authSlice";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: config.API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.access_token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithRefresh: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // Attempt to refresh token
        const refreshResult = await baseQuery(
            { url: "/api/v1/auth/refresh", method: "POST" },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            api.dispatch(setCredentials(refreshResult.data));

            // Retry the original request with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            deleteCredentials();
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithRefresh,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ["apps"],
    endpoints: () => ({}),
});
