import type { Action, CommonResponse, Trigger } from "../common";

export interface GetAllAppsApiResponse extends CommonResponse {
    data: {
        key: string;
        name: string;
    }[];
}

export interface GetAppTriggersApiResponse extends CommonResponse {
    data: Trigger[] | Action[];
}
