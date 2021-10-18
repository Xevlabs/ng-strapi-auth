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
import { NgStrapiAuthModule } from '@ng-strapi-auth/ng-strapi-auth';
import { testRoles } from './core/roles';

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
        HttpClientModule,
        TranslocoRootModule,
        FlexLayoutModule,
        NgStrapiAuthModule.forRoot({
            appName:'NgStrapiAuthLibDemo',
            baseAPIPath:'http://localhost:1337',
            roleList: testRoles,
        })
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
