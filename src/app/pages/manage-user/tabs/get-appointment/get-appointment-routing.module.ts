import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetAppointmentPage } from './get-appointment.page';

const routes: Routes = [
    {
        path: '',
        component: GetAppointmentPage
    },
    {
        path: 'appointment-hour',
        children:[
            {
            path:'',
            loadChildren: () => import('./appointment-hour/appointment-hour.module').then(m => m.AppointmentHourPageModule)
        },
    ]
        
    },
    {
        path: 'logout',
        loadChildren: () => import('../logout/logout.module').then(m => m.LogoutPageModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GetAppointmentPageRoutingModule { }
