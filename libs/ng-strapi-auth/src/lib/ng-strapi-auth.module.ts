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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './core/interceptor/http.auth-interceptor';

@NgModule({
    declarations: [AuthWrapperComponent, LoginWrapperComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        AuthRoutingModule,
        AuthMaterialModule,
        TranslocoModule,
        HotToastModule,
    ],
    exports: [],
    providers: [        {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true,
    },]
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
