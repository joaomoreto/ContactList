import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomeListComponent } from 'src/app/components/home-list/home-list.component';
import { HomeCardComponent } from 'src/app/components/home-card/home-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    HomeListComponent,
    HomeCardComponent
  ]
})
export class HomePageModule { }
