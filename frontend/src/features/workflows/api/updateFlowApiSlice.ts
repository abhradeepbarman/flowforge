import type { CreateFlowApiResponse, UpdateFlowApiResponse } from "@/@types/workflow";
import { apiSlice } from "@/app/api/apiSlice";

export const updateFlowApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateFlow: builder.mutation<UpdateFlowApiResponse, void>({
            query: (name) => ({
                url: "/api/v1/workflow",
                method: "POST",
                body: {
                    name,
                },
            }),
        }),
    }),
});

export const { useUpdateFlowMutation } = updateFlowApiSlice;
