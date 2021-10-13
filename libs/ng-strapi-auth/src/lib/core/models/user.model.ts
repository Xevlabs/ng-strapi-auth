
export interface BaseUserModel {
    id: string;
    email: string;
    username: string;
    created_at: any;
    updated_at: any;
}

export interface DefaultUserModel {
    role?: any;
    blocked: boolean;
    confirmed: boolean;
}

export type UserModel<T=DefaultUserModel> = T & BaseUserModel;
