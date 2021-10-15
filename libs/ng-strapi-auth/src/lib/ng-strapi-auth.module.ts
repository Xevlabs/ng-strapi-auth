import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthOptionModel } from './ng-strapi-auth-options';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthMaterialModule } from './auth-material/auth-material.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
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