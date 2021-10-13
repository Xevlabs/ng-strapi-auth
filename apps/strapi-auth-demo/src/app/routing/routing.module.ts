import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@ng-strapi-auth/ng-strapi-auth';
import { RolesEnum } from '../enums/roles.enum';
import { TestPageComponent } from '../test-page/test-page.component';

const routes: Routes = [
    {
        path: 'authentication',
        loadChildren: () => import('@ng-strapi-auth/ng-strapi-auth').then(m => m.NgStrapiAuthModule),
    },
    {
        path: '',
        component: TestPageComponent
    },
    {
        path: 'authenticated',
        canActivate: [AuthGuard],
        data: {roles:[RolesEnum.AUTHENTICATED]},
        component: TestPageComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
