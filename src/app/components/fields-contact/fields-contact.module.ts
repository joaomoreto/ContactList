import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FieldsContactComponent } from './fields-contact.component';
import { MaskDirective } from 'src/app/directives/mask.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule
    ],
    declarations: [
        FieldsContactComponent,
        MaskDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        FieldsContactComponent,
        IonicModule,
        MaskDirective
    ]
})
export class FieldsContactModule { }