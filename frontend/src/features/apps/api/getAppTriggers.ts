import type { GetAppTriggersApiResponse } from "@/@types/app";
import { apiSlice } from "@/app/api/apiSlice";

export const getAppTriggerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAppTriggers: builder.query<GetAppTriggersApiResponse, string>({
            query: (appKey) => `/api/v1/app/${appKey}/triggers`,
        }),
    }),
});

export const { useGetAppTriggersQuery } = getAppTriggerApiSlice;
