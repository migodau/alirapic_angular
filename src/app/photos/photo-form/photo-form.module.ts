import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoFormComponent } from './photo-form.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VMessageModule } from '../../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { PhotoModule } from '../photo/photo.module';
import { ImmediateClickModule } from '../../shared/directives/immediate-click/immediate-click.module';


@NgModule({
    declarations: [
        PhotoFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        VMessageModule,
        RouterModule,
        PhotoModule,
        ImmediateClickModule
    ]
})
export class PhotoFormModule {
}