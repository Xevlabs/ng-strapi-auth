import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgStrapiAuthModule } from '@ng-strapi-auth/ng-strapi-auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RolesEnum } from './enums/roles.enum';
import { AppRoutingModule } from './routing/routing.module';
import { TestNavComponent } from './test-nav/test-nav.component';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { AuthMaterialModule } from 'libs/ng-strapi-auth/src/lib/auth-material/auth-material.module';
import { TestPageComponent } from './test-page/test-page.component';
import { XevlabsStrapiErrorHandlingModule } from '@ng-strapi-error-handling';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
    declarations: [AppComponent, TestNavComponent, TestPageComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        AuthMaterialModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslocoRootModule,
        XevlabsStrapiErrorHandlingModule,
        AuthMaterialModule,
        FlexLayoutModule,
        HotToastModule.forRoot({
            position: 'bottom-center'
        }),
        NgStrapiAuthModule.forRoot(
            {
                baseAPIPath: 'http://localhost:1337',
                roleList: [RolesEnum.AUTHENTICATED],
                appName: 'StrapiAuthTest',
            })

    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
