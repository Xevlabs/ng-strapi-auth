import { Injectable } from '@angular/core'
import { AuthService } from '../core/services/auth/auth.service'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class NonAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.authUserChanged$.pipe(
            map((user) => {
                if (!user) {
                    return true
                }
                this.router.navigate(['/'])
                return false
            })
        )

    }
}
