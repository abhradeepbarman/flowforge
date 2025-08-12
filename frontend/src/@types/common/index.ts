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

export interface Flow {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    steps?: Step[];
}

export interface Step {
    id: string;
    name: string;
    type: string;
    index: number;
    app: string;
    action: string;
    credentials: string;
    executionInterval: string;
}

export interface StepCondition {
    id: string;
    stepId: string;
    key: string;
    operator: string;
    value: string;
}
