
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor(private readonly route: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.get('currentJwt');
        let newHeaders = req.headers.set('Authorization', `Bearer ${token}`);
        const httpReq = req.clone({
            headers: newHeaders,
        })
        return next.handle(httpReq).pipe(
            catchError((error: HttpErrorResponse) => {
                this.route.navigate(['/authentication'])
                throw error.error;
            })
        )
    }
}