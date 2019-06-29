import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { Observable } from "rxjs";
import { PhotoCommment } from "../../photo/photo-comment";
import { PhotoService } from "../../photo/photo.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { switchMap, tap } from "rxjs/operators";

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit{
    
    @Input() photoId: number;

    comments$: Observable<PhotoCommment[]>;
    commentForm: FormGroup;

    constructor(
        private photoService : PhotoService,
        private formBuilder: FormBuilder
    ){}
    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        })
    }

    save(){
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService
            .addComment(this.photoId,comment)
            .pipe(switchMap(()=> this.photoService.getComments(this.photoId)))
            .pipe(tap(()=>{
                this.commentForm.reset();
                alert('adicionado');
            }));
        }
    
}