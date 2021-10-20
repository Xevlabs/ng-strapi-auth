import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserModel, DefaultUserModel } from '../../models';
import { LocalStorageKeyEnum } from '../../enums';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        public authService: AuthService,
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
        sessionStorage.setItem(LocalStorageKeyEnum.CURRENT_USER, JSON.stringify(user));
    }

    removeUser() {
        sessionStorage.removeItem(LocalStorageKeyEnum.CURRENT_USER);
    }

    getCurrentUser<T = DefaultUserModel>() {
        return JSON.parse(sessionStorage.getItem(LocalStorageKeyEnum.CURRENT_USER)!) as UserModel<T>
    }

}
