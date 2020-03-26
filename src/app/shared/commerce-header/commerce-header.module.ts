import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommerceHeaderPageRoutingModule } from './commerce-header-routing.module';

import { CommerceHeaderPage } from './commerce-header.page';

import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CommerceHeaderPageRoutingModule,
        RouterModule
    ],
    exports: [
        CommerceHeaderPage
    ],
    declarations: [CommerceHeaderPage],
    //   providers: [CommerceHeaderService]
})
export class CommerceHeaderPageModule { }
