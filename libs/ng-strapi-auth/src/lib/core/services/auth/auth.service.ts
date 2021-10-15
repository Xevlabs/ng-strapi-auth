import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
        this.currentUser$ = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') as string));
        if (sessionStorage.getItem('currentUser')) {
            this.currentUser = JSON.parse(sessionStorage.getItem('currentUser') as string);
            this.authToken = sessionStorage.getItem('currentJwt');
        } else {
            this.authToken = null
        }
    }

    login(username: string, password: string) {
        return this.httpClient.post<any>(`${this.authApiBase}/auth/local`, { identifier: username, password: password })
            .pipe(map(response => {
                if (response.jwt && response.user && response.user.blocked == false) {
                    sessionStorage.setItem('currentUser', JSON.stringify(response.user));
                    sessionStorage.setItem('currentJwt', response.jwt);
                    this.currentUser = response.user;
                    this.authToken = sessionStorage.getItem('currentJwt');
                    this.currentUser$.next(response.user);
                }

                return response.user;
            }));

    }

    logout() {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentJwt');
        this.currentUser$.next(null);
        this.router.navigate(['sign-in']);
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(sessionStorage.getItem('currentUser') as string);
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

}
