import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthOptionModel } from './ng-strapi-auth-options';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthMaterialModule } from './auth-material/auth-material.module';
import { AuthRoutingModule } from './routing/auth-routing.module';
import { AuthWrapperComponent } from './auth/auth-wrapper/auth-wrapper.component';
import { LoginWrapperComponent } from './auth/login-wrapper/login-wrapper.component';

@NgModule({
    declarations: [AuthWrapperComponent, LoginWrapperComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        AuthMaterialModule,
        TranslocoModule,
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
                    provide: 'StrapiAuthLipOptions',
                    useValue: options
                },
            ]
        });
    }
}
