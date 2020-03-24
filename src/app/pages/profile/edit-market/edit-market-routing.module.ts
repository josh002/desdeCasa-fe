import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMarketPage } from './edit-market.page';

const routes: Routes = [
  {
    path: '',
    component: EditMarketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMarketPageRoutingModule {}
