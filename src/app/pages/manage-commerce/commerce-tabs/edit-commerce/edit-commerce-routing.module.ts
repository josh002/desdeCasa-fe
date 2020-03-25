import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCommercePage } from './edit-commerce.page';

const routes: Routes = [
  {
    path: '',
    component: EditCommercePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCommercePageRoutingModule {}
