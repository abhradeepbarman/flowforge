import type { GetFlowApiResponse } from "@/@types/workflow";
import { apiSlice } from "@/app/api/apiSlice";

export const getFlowApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFlow: builder.query<GetFlowApiResponse, string>({
            query: (id) => `/api/v1/workflow/${id}`,
        }),
    }),
});

export const { useGetFlowQuery } = getFlowApiSlice;
