import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageCommercePage } from './manage-commerce.page';

const routes: Routes = [
  {
    path: '',
    component: ManageCommercePage
  },
  {
    path: 'commerce-tabs',
    loadChildren: () => import('./commerce-tabs/commerce-tabs.module').then( m => m.CommerceTabsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCommercePageRoutingModule {}
