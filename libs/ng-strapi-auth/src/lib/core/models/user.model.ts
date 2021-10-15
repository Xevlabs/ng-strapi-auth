import { RoleModel } from "./role.model";

export interface BaseUserModel {
    id: string;
    email: string;
    username: string;
    confirmed: boolean;
    blocked: boolean;
    role?: RoleModel;
}

export interface DefaultUserModel {}

export type UserModel<T=DefaultUserModel> = T & BaseUserModel;
