import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommerceHeaderPage } from './commerce-header.page';

const routes: Routes = [
  {
    path: '',
    component: CommerceHeaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommerceHeaderPageRoutingModule {}
