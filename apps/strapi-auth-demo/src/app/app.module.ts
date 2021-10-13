import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { AuthMaterialModule, NgStrapiAuthModule } from '@ng-strapi-auth/ng-strapi-auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RolesEnum } from './enums/roles.enum';
import { AppRoutingModule } from './routing/routing.module';
import { TestNavComponent } from './test-nav/test-nav.component';
import { TestPageComponent } from './test-page/test-page.component';
import { TranslocoRootModule } from './transloco/transloco-root.module';

@NgModule({
    declarations: [AppComponent, TestNavComponent, TestPageComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslocoRootModule,
        AuthMaterialModule,
        FlexLayoutModule,
        NgStrapiAuthModule.forRoot(
            {
                baseAPIPath: 'http://localhost:1337',
                accessRole: RolesEnum.AUTHENTICATED,
                roleList: [RolesEnum.AUTHENTICATED],
                appName: 'StrapiAuthTest',
                snackBarPosition: 'bottom-center'
            })

    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
