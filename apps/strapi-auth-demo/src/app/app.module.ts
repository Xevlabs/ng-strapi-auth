import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { TestNavComponent } from './test-nav/test-nav.component';
import { TestPageComponent } from './test-page/test-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard, AuthMaterialModule, NgStrapiAuthModule, RoleTypeEnum } from '@ng-strapi-auth/ng-strapi-auth';

@NgModule({
    declarations: [
        AppComponent,
        TestNavComponent,
        TestPageComponent
    ],
    imports: [
        BrowserModule,
        RoutingModule,
        BrowserAnimationsModule,
        AuthMaterialModule,
        HttpClientModule,
        TranslocoRootModule,
        FlexLayoutModule,
        NgStrapiAuthModule.forRoot({
            appName:'NgStrapiAuthLibDemo',
            baseAPIPath:'http://localhost:1337',
            baseServerUrl: 'http://localhost:4200',
            roleList: [RoleTypeEnum.PUBLIC, RoleTypeEnum.AUTHENTICATED],
            blockIfNotConfirmed: true,
            enableResetPassword: true
        })
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule { }
