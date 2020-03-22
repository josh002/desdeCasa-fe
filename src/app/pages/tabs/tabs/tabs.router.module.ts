import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '', component: TabsPage,
        children: [
            { path: '/tabs', redirectTo: '/tabs/home', pathMatch: 'full' },
            {
                path: 'forum', children: [
                    { path: '', loadChildren: () => import('../forum/forum.module').then(m => m.ForumPageModule) },
                    { path: 'thread-add', children: [{ path: '', loadChildren: () => import('../forum/thread-add/thread-add.module').then(m => m.ThreadAddPageModule) }] },
                    { path: 'thread/:id', children: [{ path: '', loadChildren: () => import('../forum/thread/thread.module').then(m => m.ThreadPageModule) }] }
                ]
            },
        ]
    },
    { path: '/tabs', redirectTo: '/tabs/forum', pathMatch: 'full' }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
