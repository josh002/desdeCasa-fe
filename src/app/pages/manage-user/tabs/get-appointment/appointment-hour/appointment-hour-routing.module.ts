import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { AppointmentHourPage } from './appointment-hour.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentHourPage
  }
];

@NgModule({
  imports: [
    SharedModule,  
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentHourPageRoutingModule {}
