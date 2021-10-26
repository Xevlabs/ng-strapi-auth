export interface AuthOptionModel {
    appName: string;
    baseAPIPath: string;
    baseServerUrl: string;
    roleList: string[];
    blockIfNotConfirmed: boolean;
    enableResetPassword?: boolean;
    enableRegistration?: boolean;
    subtitle?: string;
}
