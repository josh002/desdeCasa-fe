import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { NgxMaskIonicModule } from 'ngx-mask-ionic'
// import { InputMaskModule } from 'ionic-input-mask';
// import { TextMaskModule } from 'angular2-text-mask';
// import { NgxMaskModule } from 'ngx-mask'

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxMaskIonicModule, // Este funca pero no puedo poner numeros
    // InputMaskModule,
    // TextMaskModule,  // Error: More than one custom value accessor matches form control with unspecified name attribute
    // NgxMaskModule,  // Error: More than one custom value accessor matches form control with unspecified name attribute
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule { }
