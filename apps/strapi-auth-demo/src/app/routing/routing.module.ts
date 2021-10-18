import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestPageComponent } from '../test-page/test-page.component';
import { AuthGuard } from '@ng-strapi-auth/ng-strapi-auth';
import { testRoles } from '../core/roles';

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
        path: 'anyRole',
        canActivate: [AuthGuard],
        data: {roles:[testRoles]},
        component: TestPageComponent
    },
    {
        path: 'authenticated',
        canActivate: [AuthGuard],
        data: {roles:[testRoles[0]]},
        component: TestPageComponent
    },
    {
        path: 'public',
        canActivate: [AuthGuard],
        data: {roles:[testRoles[1]]},
        component: TestPageComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
