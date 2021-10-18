import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { UserModel } from '../../models';
import { AuthOptionModel } from '../../../ng-strapi-auth-options';
import { LocalStorageKeyEnum } from '../../enums';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private authApiBase: string;

    constructor(
        @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel,
        private httpClient: HttpClient,
        public authService: AuthService,
    ) {
        this.authApiBase = this.options.baseAPIPath
        this.authService.authStateChanged$.subscribe((user) => {
            if (user) {
                this.setUser(user)
            } else {
                this.removeUser()
            }
        })
    }

    setUser(user: UserModel) {
        sessionStorage.setItem(LocalStorageKeyEnum.CURRENT_USER, JSON.stringify(user));
    }

    removeUser() {
        sessionStorage.removeItem(LocalStorageKeyEnum.CURRENT_USER);
    }

    getCurrentUser(): Observable<UserModel> {
        return this.httpClient.get<any>(`${this.authApiBase}/users/me`,
            {
                headers: {
                    Authorization: `Bearer ${this.authService.authToken}`,
                }
            })
            .pipe(map(response => {
                return response;
            }));
    }

}
