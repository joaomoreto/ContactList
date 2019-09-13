import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreatePage } from './create.page';
import { FieldsContactComponent } from 'src/app/components/fields-contact/fields-contact.component';
import { FieldsContactModule } from 'src/app/components/fields-contact/fields-contact.module';

const routes: Routes = [
  {
    path: '',
    component: CreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FieldsContactModule
  ],
  declarations: [
    CreatePage
  ]
})
export class CreatePageModule { }
