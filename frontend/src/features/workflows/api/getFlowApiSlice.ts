import type { GetFlowApiResponse } from "@/@types/workflow";
import { apiSlice } from "@/app/api/apiSlice";

export const getFlowApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFlow: builder.query<GetFlowApiResponse, string>({
            query: (flowId) => `/api/v1/workflow/${flowId}`,
        }),
    }),
});

export const { useGetFlowQuery } = getFlowApiSlice;
