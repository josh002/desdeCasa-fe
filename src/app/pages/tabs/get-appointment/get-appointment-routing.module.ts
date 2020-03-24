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
    loadChildren: () => import('./appointment-hour/appointment-hour.module').then( m => m.AppointmentHourPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetAppointmentPageRoutingModule {}
