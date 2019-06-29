import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PhotoService } from "../photo/photo.service";
import { Photo } from "../photo/photo";
import { Observable } from "rxjs";
import { PhotoCommment } from "../photo/photo-comment";
import { AlertService } from "../../shared/components/alert/alert.service";
import { UserService } from "../../core/user/user.service";

@Component({
    selector: 'ap-photo-detail',
    templateUrl: './photo-detail.component.html',
    styleUrls: ['photo-details.css']
})
export class PhotoDetailComponent implements OnInit{
    
    photo$: Observable<Photo>;
    photoId: number;

    constructor(
        private route:ActivatedRoute,
        private router: Router,
        private photoService : PhotoService,
        private alertService: AlertService,
        private userService: UserService
    ){}

    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(this.photoId);
        this.photo$.subscribe(
            ()=>{},
            err => {
                this.router.navigate(['not-found']);
            }
        );
    }

    remove(){
        this.photoService
            .removePhoto(this.photoId)
            .subscribe(
                ()=> {
                    this.alertService.success('Photo removed', true);
                    this.router.navigate(['user',this.userService.getUserName()]);
                },
                err => {
                   console.log(err);
                   this.alertService.warning('It was not possible to remove the photo', true); 
                }
            );

    }

    like(){
        this.photoService.like(this.photoId).subscribe(liked =>{
            if(liked) {
                this.photo$ = this.photoService.findById(this.photoId);
            }
        }, err => console.log(err))
    }
}