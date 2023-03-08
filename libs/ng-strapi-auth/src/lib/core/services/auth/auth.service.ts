import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject, Subject, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { LocalStorageKeyEnum } from '../../enums';
import { UserModel, PassResetModel, DefaultUserModel, BaseUserModel } from '../../models';
import { AuthOptionModel } from '../../../ng-strapi-auth-options';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthResponseModel } from '../../models/auth-response.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authToken: string | null;
    allowedRoles: string[]
    authApiBase: string;
    authUserChanged$: Subject<UserModel | null> = new ReplaySubject<UserModel | null>(0);

    constructor(
        private httpClient: HttpClient,
        @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel,
        private readonly hotToastService: HotToastService,
        public router: Router,
    ) {
        this.allowedRoles = this.options.roleList;
        this.authApiBase = this.options.baseAPIPath;
        this.authToken = localStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT);
        if (this.authToken) {
            this.getUserFromServer().pipe(take(1)).subscribe((user) => {
                this.authUserChanged$.next(this.authToken ? user : null)
            })
        } else {
            this.authUserChanged$.next(null)
        }
    }

    login<T = DefaultUserModel>(username: string, password: string): Observable<UserModel<T>> {
      let jwt: string;
      return this.httpClient.post<any>(`${this.authApiBase}/auth/local`, { identifier: username, password: password })
        .pipe(
          switchMap((data: AuthResponseModel<T>) => {
            if (data.jwt) {
              jwt = data.jwt;
              return this.getUserWithRoles<T>(jwt);
            }
            return of(null);
          }),
          map((user: UserModel<T> | null) => {
            if (user && user.blocked == false) {
              if (this.allowedRoles && !this.allowedRoles.includes(user.role.name)) {
                this.hotToastService.error('Forbidden');
              }

              if (!this.allowedRoles || this.allowedRoles.includes(user.role.name)){
                localStorage.setItem(LocalStorageKeyEnum.CURRENT_JWT, jwt);
                this.authUserChanged$.next(user);
                this.authToken = localStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT)!;
                return user;
              }
            }
            return user as UserModel<T>;
          })
        );
    }



    getUserWithRoles<T>(jwt: string): Observable<UserModel<T>> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${jwt}`
        });

        return this.httpClient.get<UserModel<T>>(`${this.authApiBase}/users/me`, { headers, params: {populate: 'role'} });
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

    registerUser<T = DefaultUserModel, Y = any>(clientInformation: T, apiPath: string) {
        return this.httpClient.post<Y>(apiPath, clientInformation)
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
