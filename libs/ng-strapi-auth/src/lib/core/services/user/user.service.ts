import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserModel, DefaultUserModel } from '../../models';
import { LocalStorageKeyEnum } from '../../enums';
import { AuthOptionModel } from '../../../ng-strapi-auth-options';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        public authService: AuthService,
        private http: HttpClient,
        @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel,
    ) {
        this.authService.authUserChanged$.subscribe((user) => {
            if (user) {
                this.setUser(user)
            } else {
                this.removeUser()
            }
        })
    }

    setUser(user: UserModel) {
        localStorage.setItem(LocalStorageKeyEnum.CURRENT_USER, JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem(LocalStorageKeyEnum.CURRENT_USER);
    }

    getCurrentUser<T = DefaultUserModel>() {
        return JSON.parse(localStorage.getItem(LocalStorageKeyEnum.CURRENT_USER)!) as UserModel<T>
    }

    updateUserSelf<T>(userBody: T) {
        return this.http.put<UserModel>(`${this.options.baseAPIPath}/user/me`, userBody, { params: { populate: 'role' } }).pipe(
            tap((user) => {
                this.authService.authUserChanged$.next(user)
            })
        );
    }

}
