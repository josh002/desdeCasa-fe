import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulePage } from './schedule.page';

const routes: Routes = [
    {
        path: '',
        component: SchedulePage
    },
    {
        path: 'schedule-hour/:id',
        children: [
            {
                path: '',
                loadChildren: () => import('./schedule-hour/schedule-hour.module').then(m => m.ScheduleHourPageModule)
            },
            {
                path: 'logout',
                loadChildren: () => import('../logout/logout.module').then(m => m.LogoutPageModule)
            },
        ]

    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SchedulePageRoutingModule { }
