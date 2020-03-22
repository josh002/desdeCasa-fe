import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForumPage } from './forum.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PopoverPriceComponent } from 'src/app/shared/popover-price/popover-price.component';
import { PopoverCategoryComponent } from 'src/app/shared/popover-category/popover-category.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    component: ForumPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ForumPage]
})
export class ForumPageModule { }
