export interface CommonResponse {
    status: number;
    message: string;
    success: boolean;
    data?: unknown;
}

export interface App {
    key: string;
    name: string;
    triggers?: Trigger[];
    actions?: Action[];
}

export interface Trigger {
    key: string;
    name: string;
    description: string;
    executionIntervals: {
        name: string;
        value: number;
    }[];
}

export interface Action {
    key: string;
    name: string;
    description: string;
}
