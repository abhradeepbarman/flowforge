import type { GetAllFlowsApiResponse } from "@/@types/workflow";
import { apiSlice } from "@/app/api/apiSlice";

export const getAllFlowsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFlows: builder.query<GetAllFlowsApiResponse, void>({
            query: () => `/api/v1/workflow`,
            providesTags: ["flows"],
        }),
    }),
});

export const { useGetAllFlowsQuery } = getAllFlowsApiSlice;
