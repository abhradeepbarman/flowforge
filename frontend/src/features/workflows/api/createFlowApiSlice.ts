import type { CreateFlowApiResponse } from "@/@types/workflow";
import { apiSlice } from "@/app/api/apiSlice";

export const createFlowApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createFlow: builder.mutation<CreateFlowApiResponse, void>({
            query: () => ({
                url: "/api/v1/workflow",
                method: "POST",
            }),
        }),
    }),
});

export const { useCreateFlowMutation } = createFlowApiSlice;
