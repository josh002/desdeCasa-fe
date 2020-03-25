import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { ScheduleHourPageRoutingModule } from './schedule-hour-routing.module';

import { ScheduleHourPage } from './schedule-hour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleHourPageRoutingModule,
    SharedModule
  ],
  declarations: [ScheduleHourPage]
})
export class ScheduleHourPageModule {}
