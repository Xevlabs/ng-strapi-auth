import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { LocalStorageKeyEnum } from '../../enums';
import { UserModel, PassResetModel, DefaultUserModel } from '../../models';
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
        this.authToken = localStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT);
        if (this.authToken) this.getUserFromServer().pipe(take(1)).subscribe((user) => {
            this.authUserChanged$.next(this.authToken ? user : null)
        })
    }

    login<T = DefaultUserModel>(username: string, password: string): Observable<UserModel<T>> {
        return this.httpClient.post<any>(`${this.authApiBase}/auth/local`, { identifier: username, password: password })
            .pipe(map((response: { jwt: string, user: UserModel<T> }) => {
                if (response.jwt && response.user && response.user.blocked == false) {
                    if (this.allowedRoles.includes(response.user.role.type)) {
                        localStorage.setItem(LocalStorageKeyEnum.CURRENT_JWT, response.jwt);
                        this.authUserChanged$.next(response.user);
                        this.authToken = localStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT)!;
                    } else {
                        this.snackbarService.showSnackBar(SnackBarTypeEnum.ERROR, 'Forbidden')
                    }
                }
                return response.user;
            }));

    }

    loginWithJWT<T = DefaultUserModel>(token: string): Observable<UserModel<T>> {
        this.authToken = token
        return this.getUserFromServer().pipe(map((user: UserModel<T>) => {
            localStorage.setItem(LocalStorageKeyEnum.CURRENT_JWT, token)
            this.authUserChanged$.next(user);
            return user
        }))
    }

    logout() {
        localStorage.removeItem(LocalStorageKeyEnum.CURRENT_JWT);
        this.authUserChanged$.next(null);
        this.router.navigate(['authentication']);
    }

    get isLoggedIn(): boolean {
        const authToken = JSON.parse(localStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT)!);
        return authToken !== null;
    }

    getUserFromServer() {
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
        return this.httpClient.post<boolean>(`${this.authApiBase}/auth/forgot-password`, { email: email });
    }

    resetPassword(passReset: PassResetModel) {
        return this.httpClient.post<any>(`${this.authApiBase}/auth/reset-password`, passReset);
    }

}
