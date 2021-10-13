import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
