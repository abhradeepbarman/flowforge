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
    executionInterval: {
        name: string;
        value: number;
    };
    login: Function;
    callback: Function;
}

export interface Action {
    key: string;
    name: string;
    description: string;
}
