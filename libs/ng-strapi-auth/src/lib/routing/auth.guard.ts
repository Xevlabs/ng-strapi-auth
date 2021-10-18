import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserModel } from '../core/models';
import { UserService } from '../core/services/user/user.service';
import { AuthOptionModel } from '../ng-strapi-auth-options';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        public userService: UserService,
        @Inject('StrapiAuthLipOptions') private options: AuthOptionModel
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let roles = this.options.roleList;
        let redirectionRoute: string[] = ['authentication', 'login'];

        return this.userService.getCurrentUser().pipe(
            take(1),
            map((user: UserModel) => {
                if (!user && (!!roles && !roles.includes(''))) {
                    this.router.navigate(redirectionRoute).then(() => {
                        this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.LOGIN_REQUIRED');
                        return false;
                    });
                } else {
                    if (roles.length && !roles.includes(user.role)) {
                        this.router.navigate(redirectionRoute).then(() => {
                            this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.WRONG_ROLE');
                            return false;
                        });
                    } else {
                        this.router.navigate(['']).then(() => {
                            this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.NOT_AUTHORIZED');
                            return false;
                        });
                    }
                }
                return false
            }));
    }

}
