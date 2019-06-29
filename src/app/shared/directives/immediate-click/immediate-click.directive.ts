import { Directive, ElementRef, OnInit } from "@angular/core";
import { PlatFormDetectorService } from "../../../core/platform-detector/platform-detector.service";

@Directive({
    selector:'[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {
    
    constructor(
        private element: ElementRef<any>,
        private platformDetector: PlatFormDetectorService
    ){}

    ngOnInit(): void {
        if(this.platformDetector.isPlatformBrowser)
            this.element.nativeElement.click();
    }
}