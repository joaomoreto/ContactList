import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdatePage } from './update.page';
import { FieldsContactComponent } from 'src/app/components/fields-contact/fields-contact.component';
import { FieldsContactModule } from 'src/app/components/fields-contact/fields-contact.module';

const routes: Routes = [
  {
    path: '',
    component: UpdatePage
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
    UpdatePage
  ]
})
export class UpdatePageModule { }
