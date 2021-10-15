import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthWrapperComponent } from './auth/auth-wrapper/auth-wrapper.component';
import { LoginWrapperComponent } from './auth/login-wrapper/login-wrapper.component';
import { AuthRoutingModule } from './routing/auth-routing.module';

@NgModule({
    declarations: [AuthWrapperComponent, LoginWrapperComponent],
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
})
export class NgStrapiAuthModule { }
