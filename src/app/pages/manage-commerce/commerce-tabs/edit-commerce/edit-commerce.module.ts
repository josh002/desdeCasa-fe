import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { EditCommercePageRoutingModule } from './edit-commerce-routing.module';

import { EditCommercePage } from './edit-commerce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCommercePageRoutingModule,
    SharedModule
  ],
  declarations: [EditCommercePage]
})
export class EditCommercePageModule {}
