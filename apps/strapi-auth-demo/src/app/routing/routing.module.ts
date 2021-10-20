import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestPageComponent } from '../test-page/test-page.component';
import { AuthGuard } from '@ng-strapi-auth/ng-strapi-auth';
import { authenticatedRole, publicRole, testRoles } from '../core/roles';
import { TestNavComponent } from '../test-nav/test-nav.component';

const routes: Routes = [
    {
        path: 'authentication',
        loadChildren: () => import('@ng-strapi-auth/ng-strapi-auth').then(m => m.NgStrapiAuthModule),
    },
    {
        path: '',
        component: TestNavComponent
    },
    {
        path: 'noLogin',
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
        data: {roles:[authenticatedRole]},
        component: TestPageComponent
    },
    {
        path: 'public',
        canActivate: [AuthGuard],
        data: {roles:[publicRole]},
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
export class RoutingModule { }
