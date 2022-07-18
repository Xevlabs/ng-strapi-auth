import { RouteModel } from "./core/models/route.model";

export interface AuthOptionModel {
    appName: string;
    baseAPIPath: string;
    roleList: string[];
    blockIfNotConfirmed: boolean;
    enableResetPassword?: boolean;
    enableRegistration?: boolean;
    subtitle?: string;
    customRoutes?: RouteModel[];
    hideCard?: boolean;
    disableDefaultLoader?: boolean
}
