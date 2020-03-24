import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageCommercePageRoutingModule } from './manage-commerce-routing.module';

import { ManageCommercePage } from './manage-commerce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageCommercePageRoutingModule
  ],
  declarations: [ManageCommercePage]
})
export class ManageCommercePageModule {}
