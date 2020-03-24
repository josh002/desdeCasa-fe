import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCompletePage } from './register-complete.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCompletePage
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientPageModule)
  },
  {
    path: 'commerce',
    loadChildren: () => import('./commerce/commerce.module').then(m => m.CommercePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCompletePageRoutingModule { }
