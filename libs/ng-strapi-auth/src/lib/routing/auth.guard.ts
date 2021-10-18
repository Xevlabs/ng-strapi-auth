import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserModel, RoleModel } from '../core/models';
import { UserService } from '../core/services/user/user.service';
import { AuthOptionModel } from '../ng-strapi-auth-options';
import { SnackBarService } from '@ng-xevlabs-utils-snackbar';
import { SnackBarTypeEnum } from 'libs/xevlabs-ng-utils/libs/xevlabs-snackbar/src/lib/enums';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        public userService: UserService,
        private readonly snackBarService: SnackBarService,
        @Inject('StrapiAuthLipOptions') private options: AuthOptionModel
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let roles = this.options.roleList;
        let redirectionRoute: string[] = ['authentication', 'login'];
        if (route.data.roles) {
            roles = route.data.roles as Array<RoleModel>
        }
        return this.userService.getCurrentUser().pipe(
            take(1),
            map((user: UserModel) => {
                if (!user && roles.length) {
                    this.router.navigate(redirectionRoute).then(() => {
                        this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.LOGIN_REQUIRED');
                        return false;
                    });
                } else {
                    if (roles.length) {
                        if (!roles.includes(user.role)) {
                            this.router.navigate(redirectionRoute).then(() => {
                                this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.WRONG_ROLE');
                                return false;
                            });
                        }

                        if (user.blocked) {
                            this.router.navigate(redirectionRoute).then(() => {
                                this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.USER_BLOCKED');
                                return false;
                            });
                        }

                        if (!user.confirmed) {
                            this.router.navigate(redirectionRoute).then(() => {
                                this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.USER_NOT_CONFIRMED');
                                return false;
                            });
                        }
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
