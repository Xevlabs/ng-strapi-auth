import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageKeyEnum } from '@ng-strapi-auth/ng-strapi-auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authToken: string | null;
    authApiBase: string = 'http://localhost:1337';
    currentUser$: BehaviorSubject<any>;
    currentUser: any;

    constructor(
        private httpClient: HttpClient,
        public router: Router,
    ) {
        this.currentUser$ = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_USER) as string));
        if (sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_USER)) {
            this.currentUser = JSON.parse(sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_USER) as string);
            this.authToken = sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT);
        } else {
            this.authToken = null
        }
    }

    login(username: string, password: string) {
        return this.httpClient.post<any>(`${this.authApiBase}/auth/local`, { identifier: username, password: password })
            .pipe(map(response => {
                if (response.jwt && response.user && response.user.blocked == false) {
                    sessionStorage.setItem(LocalStorageKeyEnum.CURRENT_USER, JSON.stringify(response.user));
                    sessionStorage.setItem(LocalStorageKeyEnum.CURRENT_JWT, response.jwt);
                    this.currentUser = response.user;
                    this.authToken = sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT);
                    this.currentUser$.next(response.user);
                }

                return response.user;
            }));

    }

    logout() {
        sessionStorage.removeItem(LocalStorageKeyEnum.CURRENT_USER);
        sessionStorage.removeItem(LocalStorageKeyEnum.CURRENT_JWT);
        this.currentUser$.next(null);
        this.router.navigate(['sign-in']);
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_USER) as string);
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

}
