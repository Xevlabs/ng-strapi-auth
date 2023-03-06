import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../core/services/user/user.service';
import { AuthOptionModel } from '../ng-strapi-auth-options';
import { AuthService } from '../core/services';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        public userService: UserService,
        public authService: AuthService,
        @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel,
        private readonly hotToastService: HotToastService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let redirectionRoute: string[] = ['authentication', 'login'];
        let roles = route.data.roles as Array<string>
      console.log("auth In ////////////")
        let user = this.userService.getCurrentUser()
                if (!roles.length) {
                    return of(this.router.navigate(redirectionRoute)).pipe(map(() => {
                        this.hotToastService.error('AUTH.GUARD.NO_ROLES');
                        return false;
                    }));
                }
                if (!user) {
                    return of(this.router.navigate(redirectionRoute)).pipe(map(() => {
                        this.hotToastService.error('AUTH.GUARD.LOGIN_REQUIRED');
                        return false;
                    }));
                }
                if (!roles!.includes(user!.role.type)) {
                        this.hotToastService.error('AUTH.GUARD.WRONG_ROLE');
                        return of(false);
                }

                if (user!.blocked) {
                    return of(this.router.navigate(redirectionRoute)).pipe(map(() => {
                        this.hotToastService.error('AUTH.GUARD.USER_BLOCKED');
                        return false;
                    }));
                }

                if (!user!.confirmed && this.options.blockIfNotConfirmed) {
                    return of(this.router.navigate(redirectionRoute)).pipe(map(() => {
                        this.hotToastService.error('AUTH.GUARD.USER_NOT_CONFIRMED');
                        return false;
                    }));
                }
                return of(true)
            }
}
