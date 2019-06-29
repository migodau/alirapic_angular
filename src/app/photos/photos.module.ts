import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoDetailModule } from "./photo-detail/photo-detail.module";

@NgModule({
    imports: [
        CommonModule,
        PhotoModule,
        PhotoListModule,
        PhotoFormModule,
        PhotoDetailModule
    ]
})
export class PhotosModule {

}