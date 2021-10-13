import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthWrapperComponent } from './auth/auth-wrapper/auth-wrapper.component';
import { LoginWrapperComponent } from './auth/login-wrapper/login-wrapper.component';
import { HotToastModule, ToastConfig, ToastPosition } from '@ngneat/hot-toast';
import { AuthOptionModel } from './ng-strapi-auth-options';
import { CanActivateGuard } from './routing/can-activate.guard';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthRoutingModule } from './routing/auth-routing.module';
import { AuthMaterialModule } from './auth-material/auth-material.module';


@NgModule({
  declarations: [
    AuthWrapperComponent,
    LoginWrapperComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    AuthMaterialModule,
    TranslocoModule,
    HotToastModule.forRoot({
        className: 'xevlabs-auth-snackbar',
        reverseOrder: true
      }),
],
exports: [],
providers: [CanActivateGuard]
})
export class NgStrapiAuthModule {
    static forRoot( options?: ModuleOptions ) : ModuleWithProviders<any> {
        return({
            ngModule: NgStrapiAuthModule,
            providers: [
                {
                    provide: FOR_ROOT_OPTIONS_TOKEN,
                    useValue: options
                },
                {
                    provide: NgStrapiAuthModule,
                    useFactory: provideAuthLibOptions,
                    deps: [ FOR_ROOT_OPTIONS_TOKEN ]
                },
                {
                    provide: ToastConfig,
                    useValue: {position: options ? options.snackBarPosition : 'bottom-center'}
                }
            ]
        });
    }
}

export interface ModuleOptions {
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

export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<ModuleOptions>( "forRoot() NgStrapiAuth configuration." );

export function provideAuthLibOptions( options?: ModuleOptions ) : AuthOptionModel {

    const xevlabsAuthLibOptions = new AuthOptionModel();

    if (options) {
        if (typeof (options.appName) === "string") {
            xevlabsAuthLibOptions.appName = options.appName;
        }

        if (typeof (options.baseAPIPath) === "string") {
            xevlabsAuthLibOptions.baseAPIPath = options.baseAPIPath;
        }

        if (typeof (options.roleList) === "object") {
            xevlabsAuthLibOptions.roleList = options.roleList;
        }

        if (typeof (options.accessRole) === "string") {
            xevlabsAuthLibOptions.accessRole = options.accessRole;
        }

        if (typeof (options.disabledRoutes) === "object") {
            xevlabsAuthLibOptions.disabledRoutes = options.disabledRoutes;
        }

        if (typeof (options.disableStyleDefaultProps) === "boolean") {
            xevlabsAuthLibOptions.disableStyleDefaultProps = options.disableStyleDefaultProps;
        }

        if (typeof (options.enableResetPassword) === "boolean") {
            xevlabsAuthLibOptions.enableResetPassword = options.enableResetPassword;
        }

        if (typeof (options.enableRegistration) === "boolean") {
            xevlabsAuthLibOptions.enableRegistration = options.enableRegistration;
        }

        if (typeof (options.snackBarPosition) === "string") {
            xevlabsAuthLibOptions.snackBarPosition = options.snackBarPosition;
        }

        if (typeof (options.showSubtitle) === "boolean") {
            xevlabsAuthLibOptions.showSubtitle = options.showSubtitle;
        }
    }
    return (xevlabsAuthLibOptions);
}