import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthOptionModel } from './ng-strapi-auth-options';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthMaterialModule } from './auth-material/auth-material.module';
import { AuthRoutingModule } from './routing/auth-routing.module';
import { AuthWrapperComponent } from './auth/auth-wrapper/auth-wrapper.component';
import { LoginWrapperComponent } from './auth/login-wrapper/login-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HotToastModule } from '@ngneat/hot-toast';
import { PassForgottenComponent } from './auth/pass-forgotten/pass-forgotten.component';
import { PassResetComponent } from './auth/pass-reset/pass-reset.component';
import { ConfirmPasswordValidatorDirective } from './core/custom-validators/confirm-password-validator.directive';

@NgModule({
    declarations: [
        AuthWrapperComponent,
        LoginWrapperComponent,
        PassForgottenComponent,
        PassResetComponent,
        ConfirmPasswordValidatorDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        AuthRoutingModule,
        AuthMaterialModule,
        TranslocoModule,
        HotToastModule.forRoot({
            className: 'xevlabs-auth-snackbar',
            position: 'bottom-center'
        }),
    ],
    exports: [],
    providers: []
})

export class NgStrapiAuthModule {
    static forRoot(options?: AuthOptionModel): ModuleWithProviders<any> {
        return ({
            ngModule: NgStrapiAuthModule,
            providers: [
                {
                    provide: 'StrapiAuthLibOptions',
                    useValue: options
                },
            ]
        });
    }
}
