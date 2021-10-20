
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { LocalStorageKeyEnum } from '../enums';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services';


@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.get(LocalStorageKeyEnum.CURRENT_JWT;
        let newHeaders = req.headers.set('Authorization', `Bearer ${token}`);
        const httpReq = req.clone({
            headers: newHeaders,
        })
        return next.handle(httpReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == 401 || error.status == 403) {
                    this.authService.logout();
                }
                throw error.error;
            })
        )
    }
}