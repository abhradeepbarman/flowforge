import type { GetAllAppsApiResponse } from "@/@types/app";
import { apiSlice } from "@/app/api/apiSlice";

export const getAllAppsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllApps: builder.query<GetAllAppsApiResponse, void>({
            query: () => `/api/v1/app`,
            providesTags: ["apps"],
        }),
    }),
});

export const { useGetAllAppsQuery } = getAllAppsApiSlice;
