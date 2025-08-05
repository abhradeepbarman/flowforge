declare namespace Express {
    export interface User {
        id: string;
    }
    interface Request {
        user: User;
    }
}
