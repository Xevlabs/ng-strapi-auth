import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserModel, RoleModel } from '../core/models';
import { UserService } from '../core/services/user/user.service';
import { SnackBarService } from '@ng-xevlabs-utils-snackbar';
import { SnackBarTypeEnum } from 'libs/xevlabs-ng-utils/libs/xevlabs-snackbar/src/lib/enums';
import { AuthOptionModel } from '../ng-strapi-auth-options';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        public userService: UserService,
        @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel,
        private readonly snackBarService: SnackBarService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let redirectionRoute: string[] = ['authentication', 'login'];
        let roles = route.data.roles as Array<RoleModel>
        return this.userService.getCurrentUser().pipe(
            take(1),
            switchMap((user: UserModel) => {
                if (!user && roles?.length) {
                    return this.router.navigate(redirectionRoute).then(() => {
                        this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.LOGIN_REQUIRED');
                        return false;
                    });
                }
                if (roles!.length) {
                    if (!roles!.includes(user.role)) {
                        return this.router.navigate(redirectionRoute).then(() => {
                            this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.WRONG_ROLE');
                            return false;
                        });
                    }

                    if (user.blocked) {
                        return this.router.navigate(redirectionRoute).then(() => {
                            this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.USER_BLOCKED');
                            return false;
                        });
                    }

                    if (!user.confirmed && this.options.blockIfNotConfirmed) {
                        return this.router.navigate(redirectionRoute).then(() => {
                            this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.USER_NOT_CONFIRMED');
                            return false;
                        });
                    }
                }
                return this.router.navigate(['']).then(() => {
                    this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.NOT_AUTHORIZED');
                    return false;
                });
            }));
    }

}
