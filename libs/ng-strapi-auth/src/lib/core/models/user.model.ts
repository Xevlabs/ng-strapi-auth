export interface BaseUserModel {
    id: number;
    email: string;
    username: string;
    confirmed: boolean;
    blocked: boolean;
    role: {
        [key: string]: string
    };
}

export interface DefaultUserModel {}

export type UserModel<T = DefaultUserModel> = T & BaseUserModel;
