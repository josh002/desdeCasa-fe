import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/start', pathMatch: 'full' },
    { path: 'recover', loadChildren: './pages/login/recover/recover.module#RecoverPageModule' },
    // { path: 'tabs', loadChildren: './pages/tabs/tabs/tabs.module#TabsPageModule' },
    { path: 'start', loadChildren: './pages/start/start.module#StartPageModule' },
    // { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
    // { path: 'thread-add', loadChildren: './pages/tabs/forum/thread-add/thread-add.module#ThreadAddPageModule' },
    // { path: 'thread', loadChildren: './pages/tabs/forum/thread/thread.module#ThreadPageModule' },
    {
        path: 'register-complete',
        loadChildren: () => import('./pages/login/register-complete/register-complete.module').then(m => m.RegisterCompletePageModule)
    },
    {
        path: 'manage-commerce',
        loadChildren: () => import('./pages/manage-commerce/manage-commerce.module').then(m => m.ManageCommercePageModule)
    },   {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }