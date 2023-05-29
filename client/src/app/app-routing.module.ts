import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './modules/auth/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'operations',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: 'user',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'operations',
        loadChildren: () => import('./modules/operations/operations.module').then(m => m.OperationsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'savings',
        loadChildren: () => import('./modules/savings/savings.module').then(m => m.SavingsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'categories',
        loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

