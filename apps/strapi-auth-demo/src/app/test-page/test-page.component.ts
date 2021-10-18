import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { testRoles } from '../core/roles';

@Component({
  selector: 'ng-strapi-auth-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
    busy = false;
    user: UserModel;
    message: string;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.userService.getCurrentUser<UserModel>().subscribe((user: UserModel | null) => {
            this.user = user;
        });
        let roles = null;
        if(this.route.snapshot.data.roles) {
            roles = this.route.snapshot.data.roles as Array<RoleModel[]>
        };
        if(isNull(roles)) {
            this.message = 'NOT_LOGGED';
        } else if(roles == testRoles) {
            this.message = 'ANY_ROLE';
        } else {
            if(roles == [testRoles[0]]) {
                this.message = 'AUTHENTICATED';
            }
            if(roles == [testRoles[1]]) {
                this.message = 'PUBLIC';
            }
        }
    }

    logOut() {
        this.busy = true;
        this.authService.logout().then(() => this.busy = false);
    }

}
