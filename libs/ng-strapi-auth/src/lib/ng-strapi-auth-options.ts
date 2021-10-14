import { ToastPosition } from "@ngneat/hot-toast";
export class AuthOptionModel {
    appName?: string;
    baseAPIPath?: string;
    roleList?: string[];
    accessRole?: string;
    disableStyleDefaultProps?: boolean;
    disabledRoutes?: string[];
    enableResetPassword?: boolean;
    enableRegistration?: boolean;
    snackBarPosition?: ToastPosition;
    showSubtitle?: boolean;
}
