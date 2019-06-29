import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AlertType, Alert } from "./alert";
import { Router, NavigationStart } from "@angular/router";


@Injectable({providedIn:'root'})
export class AlertService {
    constructor(router: Router){
        router.events.subscribe(event=>{
            if(event instanceof NavigationStart){
                if(this.keepAfterRouteChange){
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
            }
        })
    }

    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepAfterRouteChange = false;

    success(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean){
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alertSubject.next(new Alert(alertType, message));
    }

    getAlert(){
        return this.alertSubject.asObservable();
    }

    clear(){
        this.alertSubject.next(null);
    }
}