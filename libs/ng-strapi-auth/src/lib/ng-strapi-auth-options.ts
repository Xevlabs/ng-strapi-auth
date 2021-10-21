import { RoleModel } from "./core/models";

export interface AuthOptionModel {
    appName: string;
    baseAPIPath: string;
    roleList: string[];
    blockIfNotConfirmed: boolean;
    enableResetPassword?: boolean;
    enableRegistration?: boolean;
    subtitle?: string;
}
