import type { CommonResponse } from "../common";

export interface CreateFlowApiResponse extends CommonResponse {
    data: {
        id: string;
        name: string;
    };
}
