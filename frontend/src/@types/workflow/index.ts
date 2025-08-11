import type { CommonResponse } from "../common";

export interface CreateFlowApiResponse extends CommonResponse {
    data: {
        id: string;
        name: string;
    };
}

export interface GetFlowApiResponse extends CommonResponse {
    data: {
        id: string;
        name: string;
    };
}

export interface UpdateFlowApiResponse extends CommonResponse {
    data: {
        id: string;
        name: string;
    };
}
