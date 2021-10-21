import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, RoleTypeEnum, UserModel, UserService } from '@ng-strapi-auth/ng-strapi-auth';

@Component({
    selector: 'ng-strapi-auth-test-page',
    templateUrl: './test-page.component.html',
    styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
    user: any;
    message: any;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private route: ActivatedRoute
    ) {
        this.user = this.userService.getCurrentUser<UserModel>()
    }

    ngOnInit(): void {
        let roles = this.route.snapshot.data.roles as Array<string>
        if (!roles) {
            this.message = 'NOT_LOGGED';
        } else if (roles.includes(RoleTypeEnum.AUTHENTICATED) && roles.includes(RoleTypeEnum.PUBLIC)) {
            this.message = 'ANY_ROLE';
        } else {
            if (roles.includes(RoleTypeEnum.AUTHENTICATED)) {
                this.message = 'AUTHENTICATED';
            }
            if (roles.includes(RoleTypeEnum.PUBLIC)) {
                this.message = 'PUBLIC';
            }
        }
    }

    logOut() {
        this.authService.logout()
    }

}
