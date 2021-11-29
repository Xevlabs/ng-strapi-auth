
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core';
import { LocalStorageKeyEnum } from '../enums';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(LocalStorageKeyEnum.CURRENT_JWT);
        let httpReq = req.clone()
        if (token) {
            const newHeaders = req.headers.set('Authorization', `Bearer ${token}`);
            httpReq = req.clone({
                headers: newHeaders,
            })
        }
        return next.handle(httpReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == 401) {
                    const authservice = this.injector.get(AuthService)
                    authservice.logout()
                }
                throw error.error;
            })
        )
    }
}
