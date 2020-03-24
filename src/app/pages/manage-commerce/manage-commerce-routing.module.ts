import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageCommercePage } from './manage-commerce.page';

const routes: Routes = [
  {
    path: '',
    component: ManageCommercePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCommercePageRoutingModule {}
