import type { CommonResponse, Flow } from "../common";

export interface CreateFlowApiResponse extends CommonResponse {
    data: {
        id: string;
        name: string;
    };
}

export interface GetFlowApiResponse extends CommonResponse {
    data: Flow;
}

export interface GetAllFlowsApiResponse extends CommonResponse {
    data: Flow[];
}
