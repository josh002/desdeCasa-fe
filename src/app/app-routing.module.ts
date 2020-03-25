import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/start', pathMatch: 'full' },
    { path: 'recover', loadChildren: './pages/login/recover/recover.module#RecoverPageModule' },
    { path: 'start', loadChildren: './pages/start/start.module#StartPageModule' },
    { path: 'register-complete', loadChildren: () => import('./pages/login/register-complete/register-complete.module').then(m => m.RegisterCompletePageModule) },
    { path: 'manage-commerce', loadChildren: () => import('./pages/manage-commerce/manage-commerce.module').then(m => m.ManageCommercePageModule) },
    { path: 'tabs', loadChildren: () => import('./pages/manage-user/tabs/tabs.module').then(m => m.TabsPageModule) },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }