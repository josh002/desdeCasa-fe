import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { AppointmentHourPageRoutingModule } from './appointment-hour-routing.module';

import { AppointmentHourPage } from './appointment-hour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentHourPageRoutingModule,
    SharedModule
  ],
  declarations: [AppointmentHourPage]
})
export class AppointmentHourPageModule {}
