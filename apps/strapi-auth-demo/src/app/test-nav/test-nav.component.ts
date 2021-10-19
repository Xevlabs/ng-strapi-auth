import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserModel, UserService } from '@ng-strapi-auth/ng-strapi-auth';

@Component({
  selector: 'ng-strapi-auth-test-nav',
  templateUrl: './test-nav.component.html',
  styleUrls: ['./test-nav.component.scss']
})
export class TestNavComponent implements OnInit {
    user: any;

    constructor(private userService: UserService, private authService: AuthService,  private router: Router) {
    }

    ngOnInit(): void {
        this.user = this.userService.getCurrentUser<UserModel>();
    }

    logOut() {
        this.authService.logout();
    }

}
