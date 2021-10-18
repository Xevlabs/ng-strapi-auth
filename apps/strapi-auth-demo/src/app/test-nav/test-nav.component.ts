import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-strapi-auth-test-nav',
  templateUrl: './test-nav.component.html',
  styleUrls: ['./test-nav.component.scss']
})
export class TestNavComponent implements OnInit {
    busy = false;
    user: UserModel;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.userService.getCurrentUser<UserModel>().subscribe((user: UserModel | null) => {
            this.user = user;
        });
    }

    logOut() {
        this.busy = true;
        this.userService.signOut().then(() => this.busy = false);
    }

    goToLogin() {
        this.router.navigate(['authentication/login']);
    }

    goToNotLogged() {
        this.router.navigate(['']);
    }

    goToAnyRole() {
        this.router.navigate(['anyRole']);
    }

    goToAdminOnly() {
        this.router.navigate(['admin']);
    }

    goToUserOnly() {
        this.router.navigate(['user']);
    }

}
