import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommerceTabsPageRoutingModule } from './commerce-tabs-routing.module';

import { CommerceTabsPage } from './commerce-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommerceTabsPageRoutingModule
  ],
  declarations: [CommerceTabsPage]
})
export class CommerceTabsPageModule {}
