import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, RoleModel, UserModel, UserService } from '@ng-strapi-auth/ng-strapi-auth';
import { authenticatedRole, publicRole, testRoles } from '../core/roles';

@Component({
    selector: 'ng-strapi-auth-test-page',
    templateUrl: './test-page.component.html',
    styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
    user: any;
    message: string = '';

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private route: ActivatedRoute
    ) {
        this.user = this.userService.getCurrentUser<UserModel>()
    }

    ngOnInit(): void {
        
        let roles = this.route.snapshot.data.roles as Array<RoleModel>
        if (!roles) {
            this.message = 'NOT_LOGGED';
        } else if (roles == testRoles) {
            this.message = 'ANY_ROLE';
        } else {
            if (roles == [authenticatedRole]) {
                this.message = 'AUTHENTICATED';
            }
            if (roles == [publicRole]) {
                this.message = 'PUBLIC';
            }
        }
    }

    logOut() {
        this.authService.logout()
    }

}
