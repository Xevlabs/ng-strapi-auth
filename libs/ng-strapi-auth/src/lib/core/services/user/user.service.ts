import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { UserModel } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private authApiBase: string = 'http://localhost:1337';

    constructor(
        private httpClient: HttpClient,
        public authService: AuthService,
    ) {

    }

    getCurrentUser(): Observable<UserModel> {
        return this.httpClient.get<any>(`${this.authApiBase}/users/me`, 
          { headers: {
            Authorization: `Bearer ${this.authService.authToken}`,
          }})
          .pipe(map(response => {
              return response;
          }));
      }

    getUsersList(): Observable<UserModel[]> {
        return this.httpClient.get<any>(`${this.authApiBase}/users`,
            {
                headers: {
                    Authorization: `Bearer ${this.authService.authToken}`,
                }
            })
            .pipe(map(response => {
                return response;
            }));
    }

}
