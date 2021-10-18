export interface AuthOptionModel {
    appName: string;
    baseAPIPath: string;
    roleList: any[];
    enableResetPassword?: boolean;
    enableRegistration?: boolean;
    subtitle?: string;
}
