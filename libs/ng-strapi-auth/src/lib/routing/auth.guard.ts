import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { UserModel, RoleModel } from '../core/models';
import { UserService } from '../core/services/user/user.service';
import { SnackBarService } from '@ng-xevlabs-utils-snackbar';
import { SnackBarTypeEnum } from 'libs/xevlabs-ng-utils/libs/xevlabs-snackbar/src/lib/enums';
import { AuthOptionModel } from '../ng-strapi-auth-options';
import { AuthService } from '@ng-strapi-auth/ng-strapi-auth';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        public userService: UserService,
        public authService: AuthService,
        @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel,
        private readonly snackBarService: SnackBarService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let redirectionRoute: string[] = ['authentication', 'login'];
        let roles = route.data.roles as Array<RoleModel>
        let user = this.userService.getCurrentUser()
                if (!roles.length) {
                    return of(this.router.navigate(redirectionRoute)).pipe(map(() => {
                        this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.NO_ROLES');
                        return false;
                    }));
                }
                if (!user) {
                    return of(this.router.navigate(redirectionRoute)).pipe(map(() => {
                        this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.LOGIN_REQUIRED');
                        return false;
                    }));
                }
                if (!roles!.filter(role => role.id === user!.role.id).length) {
                        this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.WRONG_ROLE');
                        return of(false);
                }

                if (user!.blocked) {
                    return of(this.router.navigate(redirectionRoute)).pipe(map(() => {
                        this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.USER_BLOCKED');
                        return false;
                    }));
                }

                if (!user!.confirmed && this.options.blockIfNotConfirmed) {
                    return of(this.router.navigate(redirectionRoute)).pipe(map(() => {
                        this.snackBarService.showSnackBar(SnackBarTypeEnum.ERROR, 'AUTH.GUARD.USER_NOT_CONFIRMED');
                        return false;
                    }));
                }
                return of(true)
            }
}
