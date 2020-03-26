import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BabyHeaderPageModule } from './baby-header/baby-header.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopoverSelectComponent } from './popover-select/popover-select.component';
import { CommerceHeaderPageModule } from './commerce-header/commerce-header.module';


@NgModule({
  declarations: [
    PopoverSelectComponent,
  ],
  imports: [
    CommonModule,
    BabyHeaderPageModule,
    CommerceHeaderPageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    FontAwesomeModule,
   
  ],
  providers: [
    BabyHeaderPageModule,
    CommerceHeaderPageModule,
    FontAwesomeModule,
   
  ],
  entryComponents: [ 
    PopoverSelectComponent,
  ],
  exports: [
    PopoverSelectComponent,
    BabyHeaderPageModule,
    CommerceHeaderPageModule,
    FontAwesomeModule,
   
  ]
})
export class SharedModule { }

/*
declarations: []

Do declare de following:
Declare these classes in exactly one module of the application.
Declare them in a module if they belong to that particular module.

Do not declare the following:
A class that's already declared in another module, whether an app module, @NgModule, or third-party module.
An array of directives imported from another module. For example, don't declare FORMS_DIRECTIVES from @angular/forms because the FormsModule already declares it.
Module classes.
Service classes.
Non-Angular classes and objects, such as strings, numbers, functions, entity models, configurations, business logic, and helper classes.
*/