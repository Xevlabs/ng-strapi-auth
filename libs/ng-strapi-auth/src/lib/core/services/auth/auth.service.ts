import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageKeyEnum } from '@ng-strapi-auth/ng-strapi-auth';
import { AuthOptionModel } from '../../../ng-strapi-auth-options';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authToken: any;
    authApiBase: string;
    authStateChanged$: BehaviorSubject<any>;

    constructor(
        private httpClient: HttpClient,
        @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel,
        public router: Router,
    ) {
        this.authApiBase = this.options.baseAPIPath;
        this.authStateChanged$ = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_USER) as string));
        if (sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT)) {
            this.authToken = sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT)!;
        }
    }

    login(username: string, password: string) {
        return this.httpClient.post<any>(`${this.authApiBase}/auth/local`, { identifier: username, password: password })
            .pipe(map(response => {
                if (response.jwt && response.user && response.user.blocked == false) {
                    sessionStorage.setItem(LocalStorageKeyEnum.CURRENT_JWT, response.jwt);
                    this.authStateChanged$.next(response.user);
                    this.authToken = sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT)!;
                }
                return response.user;
            }));

    }

    logout() {
        sessionStorage.removeItem(LocalStorageKeyEnum.CURRENT_JWT);
        this.authStateChanged$.next(null);
        this.router.navigate(['sign-in']);
    }

    get isLoggedIn(): boolean {
        const authToken = JSON.parse(sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT)!);
        return authToken !== null;
    }

}
