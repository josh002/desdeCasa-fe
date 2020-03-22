import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyHeaderPage } from './baby-header.page';
import { BabyHeaderService } from './baby-headerService';

// const routes: Routes = [
//   {
//     path: '',
//     component: BabyHeaderPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    BabyHeaderPage
  ],
  declarations: [BabyHeaderPage],
  providers: [BabyHeaderService]
})
export class BabyHeaderPageModule { }
