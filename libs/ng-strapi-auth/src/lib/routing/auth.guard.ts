import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../core/services/user/user.service';
import { AuthOptionModel } from '../ng-strapi-auth-options';
import { AuthService } from '../core/services';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
    private router: Router,
    public userService: UserService,
    public authService: AuthService,
    @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel,
    private hotToastService: HotToastService,
    private translocoService: TranslocoService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const redirectionRoute: string[] = ['authentication', 'login'];
        const roles = route.data.roles as Array<string>
        const user = this.userService.getCurrentUser()

        if (!roles.length) {
            this.authService.logout();
            return of(this.router.navigate(redirectionRoute)).pipe(map(() => {
                this.hotToastService.error(this.translocoService.translate('AUTH.GUARD.NO_ROLES'));
                return false;
            }));
        }

        if (!user) {
            return this.translocoService.selectTranslate('AUTH.GUARD.LOGIN_REQUIRED').pipe(
                map((translation: string) => {
                    this.authService.logout();
                    this.hotToastService.error(translation);
                    this.router.navigate(redirectionRoute);
                    return false;
                }
                )
            )
        }

        if (!user.role) {
            this.authService.logout();
            this.hotToastService.error(this.translocoService.translate('AUTH.GUARD.WRONG_ROLE'));
            return of(false);
        }

        if (!roles!.includes(user!.role.name)) {
            this.authService.logout();
            this.hotToastService.error(this.translocoService.translate('AUTH.GUARD.WRONG_ROLE'));
            return of(false);
        }

        if (user!.blocked) {
            this.authService.logout();
            this.hotToastService.error(this.translocoService.translate('AUTH.GUARD.USER_BLOCKED'));
            return of(this.router.navigate(redirectionRoute)).pipe(map(() => {
                return false;
            }));
        }

        if (!user!.confirmed && this.options.blockIfNotConfirmed) {
            this.authService.logout();
            this.hotToastService.error(this.translocoService.translate('AUTH.GUARD.USER_NOT_CONFIRMED'));
            return of(this.router.navigate(redirectionRoute)).pipe(map(() => {
                return false;
            }));
        }
        return of(true)
    }
}
