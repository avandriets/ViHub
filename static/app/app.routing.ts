import {Routes, RouterModule} from '@angular/router';
import {ElementDetailComponent}  from './element-detail.component';
import {DashboardComponent}  from './dashboard.component';

const appRoutes: Routes = [
    {
        path: 'element/:id',
        component: ElementDetailComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    { path: '**', component: DashboardComponent }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });

export const routedComponents = [ElementDetailComponent, DashboardComponent];