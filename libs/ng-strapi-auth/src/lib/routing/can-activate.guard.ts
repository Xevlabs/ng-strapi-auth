import { Injectable, Optional } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthOptionModel } from "../ng-strapi-auth-options";

@Injectable()
export class CanActivateGuard implements CanActivate {

    constructor(@Optional() private readonly options: AuthOptionModel) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return of(true)
    }
}