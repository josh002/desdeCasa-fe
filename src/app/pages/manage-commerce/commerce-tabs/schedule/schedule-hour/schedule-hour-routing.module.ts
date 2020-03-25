import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleHourPage } from './schedule-hour.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleHourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleHourPageRoutingModule {}
