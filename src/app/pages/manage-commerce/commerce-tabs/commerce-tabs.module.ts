import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { CommerceTabsPageRoutingModule } from './commerce-tabs-routing.module';

import { CommerceTabsPage } from './commerce-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommerceTabsPageRoutingModule,
    SharedModule
  ],
  declarations: [CommerceTabsPage]
})
export class CommerceTabsPageModule {}
