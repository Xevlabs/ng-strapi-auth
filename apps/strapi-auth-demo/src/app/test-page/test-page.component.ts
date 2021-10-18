import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-strapi-auth-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent {

    authApiBase = 'http://localhost:1337';
    userData: any;
    authToken: any;
    busy = false;

    constructor(
        private httpClient: HttpClient,
        public router: Router,
    ) { }

    get currentJwt() {
        return sessionStorage.getItem('currentJwt')
    }
 
    login(validCredentials: boolean) {
        this.busy = true;
        return this.httpClient.post<any>(`${this.authApiBase}/auth/local`, { identifier: validCredentials ? 'test_user' : 'wrong', password: 'testpass' })
            .subscribe((response: any) => {
                if (response.jwt && response.user && response.user.blocked == false) {
                    sessionStorage.setItem('currentUser', JSON.stringify(response.user));
                    sessionStorage.setItem('currentJwt', response.jwt);
                    this.userData = response.user;
                    this.authToken = sessionStorage.getItem('currentJwt');
                }
                this.busy = false;
            }, (err: HttpErrorResponse) => {
                this.busy = false;
            });

    }

    logout() {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentJwt');
    }
}
