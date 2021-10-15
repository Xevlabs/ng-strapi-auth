import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable()
export class CanActivateGuard implements CanActivate {

    constructor() { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return of(true)
    }
}