import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthWrapperComponent } from '../auth/auth-wrapper/auth-wrapper.component';
import { LoginWrapperComponent } from '../auth/login-wrapper/login-wrapper.component';
import { ForgottenPasswordComponent } from '../auth/forgotten-password/forgotten-password.component';
import { PassResetComponent } from '../auth/pass-reset/pass-reset.component';

const routes: Routes = [
    {
        path: '',
        component: AuthWrapperComponent,
        children: [
            {
                path: 'login',
                component: LoginWrapperComponent
            },
            {
                path: 'forgot-password',
                component: ForgottenPasswordComponent
            },
            {
                path: 'reset-password',
                component: PassResetComponent
            },
            {
                path: '**',
                redirectTo: 'login',
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
