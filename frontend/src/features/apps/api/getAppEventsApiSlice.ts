import type { GetAppTriggersApiResponse } from "@/@types/app";
import { apiSlice } from "@/app/api/apiSlice";

export const getAppEventsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAppEvents: builder.query<
            GetAppTriggersApiResponse,
            {
                appKey: string;
                isTrigger: boolean;
            }
        >({
            query: ({ appKey, isTrigger }) =>
                `/api/v1/app/${appKey}/events?isTrigger=${isTrigger}`,
        }),
    }),
});

export const { useGetAppEventsQuery } = getAppEventsApiSlice;
