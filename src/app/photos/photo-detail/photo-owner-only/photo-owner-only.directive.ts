import { Directive, ElementRef, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { Photo } from "../../photo/photo";
import { Renderer } from "@angular/core";
import { UserService } from "../../../core/user/user.service";

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {
    
    @Input() photoOwned: Photo;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ){}

    ngOnInit(): void {
        this.userService.getUser()
            .subscribe(user => {
                if(!user || user.id != this.photoOwned.userId){
                    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
                }
            });
    }
}