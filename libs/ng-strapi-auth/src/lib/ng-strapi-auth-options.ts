export interface AuthOptionModel {
    appName: string;
    baseAPIPath: string;
    roleList: string[];
    enableResetPassword?: boolean;
    enableRegistration?: boolean;
    subtitle?: string;
}
