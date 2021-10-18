import { RoleModel } from "./core/models";

export interface AuthOptionModel {
    appName: string;
    baseAPIPath: string;
    roleList: RoleModel[];
    enableResetPassword?: boolean;
    enableRegistration?: boolean;
    subtitle?: string;
}
