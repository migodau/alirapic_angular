import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoService } from '../photo/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';
import { Subject } from 'rxjs';
import { debounceTime, debounce } from 'rxjs/operators';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
  userName: string = '';
  currentPage: number = 1;
  hasMore: boolean = true;

  constructor(
    private activatedRoute : ActivatedRoute,
    private photoService : PhotoService
    ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photos = this.activatedRoute.snapshot.data['photos'];
    });
    
  }

  load(){
    this.photoService
      .listFromUserPaginated(this.userName,++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        if (photos.length)
          this.photos = this.photos.concat(photos);
        else
          this.hasMore = false;
      });
  }

}
