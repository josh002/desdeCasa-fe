import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommerceTabsPage } from './commerce-tabs.page';

const routes: Routes = [
    {
        path: '',
        component: CommerceTabsPage,
        children: [
            {
                path: 'schedule',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./schedule/schedule.module').then(m => m.SchedulePageModule)
                    },
                    {
                        path: 'logout',
                        loadChildren: () => import('./logout/logout.module').then(m => m.LogoutPageModule)
                    },

                ]

            },
            {
                path: 'edit-commerce',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./edit-commerce/edit-commerce.module').then(m => m.EditCommercePageModule)
                    },
                    {
                        path: 'logout',
                        loadChildren: () => import('./logout/logout.module').then(m => m.LogoutPageModule)
                    },
                ]

            },

        ]
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CommerceTabsPageRoutingModule { }
