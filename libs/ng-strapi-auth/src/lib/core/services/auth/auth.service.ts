import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { LocalStorageKeyEnum } from '../../enums';
import { UserModel } from '../../models';
import { AuthOptionModel } from '../../../ng-strapi-auth-options';
import { SnackBarService, SnackBarTypeEnum } from '@xevlabs-ng-utils/ng-snackbar';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authToken: any;
    allowedRoles: string[]
    authApiBase: string;
    authUserChanged$: Subject<UserModel | null> = new Subject<UserModel | null>();

    constructor(
        private httpClient: HttpClient,
        @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel,
        private readonly snackbarService: SnackBarService,
        public router: Router,
    ) {
        this.allowedRoles = this.options.roleList;
        this.authApiBase = this.options.baseAPIPath;
        this.authToken = sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT);
        if (this.authToken) this.getUserFromServer().pipe(take(1)).subscribe((user) => {
            this.authUserChanged$.next(this.authToken ? user : null)
        })
    }

    login(username: string, password: string) {
        return this.httpClient.post<any>(`${this.authApiBase}/auth/local`, { identifier: username, password: password })
            .pipe(map(response => {
                if (response.jwt && response.user && response.user.blocked == false) {
                    if (this.allowedRoles.includes(response.user.role.type)) {
                        sessionStorage.setItem(LocalStorageKeyEnum.CURRENT_JWT, response.jwt);
                        this.authUserChanged$.next(response.user);
                        this.authToken = sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT)!;
                    } else {
                        this.snackbarService.showSnackBar(SnackBarTypeEnum.ERROR, 'Forbidden')
                    }
                }
                return response.user;
            }));

    }

    logout() {
        sessionStorage.removeItem(LocalStorageKeyEnum.CURRENT_JWT);
        this.authUserChanged$.next(null);
        this.router.navigate(['authentication']);
    }

    get isLoggedIn(): boolean {
        const authToken = JSON.parse(sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT)!);
        return authToken !== null;
    }

    private getUserFromServer() {
        return this.httpClient.get<any>(`${this.authApiBase}/users/me`,
            {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            .pipe(map(response => {
                return response;
            }));
    }

    forgotPassword(email: string): Observable<boolean> {
        const url = `${this.authApiBase}/authentication/request-password`
        return this.httpClient.post<boolean>(`${this.authApiBase}/auth/forgot-password`, { email: email, url: url });
    }

}
