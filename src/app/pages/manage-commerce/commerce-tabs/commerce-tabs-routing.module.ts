import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommerceTabsPage } from './commerce-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: CommerceTabsPage,
    children:[
        {
            path: 'schedule',
            loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
          },
          {
            path: 'edit-commerce',
            loadChildren: () => import('./edit-commerce/edit-commerce.module').then( m => m.EditCommercePageModule)
          },
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommerceTabsPageRoutingModule {}
