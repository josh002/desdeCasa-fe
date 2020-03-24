import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMarketPageRoutingModule } from './edit-market-routing.module';

import { EditMarketPage } from './edit-market.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMarketPageRoutingModule
  ],
  declarations: [EditMarketPage]
})
export class EditMarketPageModule {}
