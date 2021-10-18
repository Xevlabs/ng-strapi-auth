import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { AuthOptionModel } from '../../ng-strapi-auth-options';

@Component({
    selector: 'ng-strapi-auth-login-wrapper',
    templateUrl: './login-wrapper.component.html',
    styleUrls: ['./login-wrapper.component.scss']
})
export class LoginWrapperComponent implements OnInit {

    public loginForm: FormGroup;
    public busy = false;
    public appName: string = '';
    public subtitle: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get username(): string {
        return this.loginForm.get('username')?.value as string;

    }

    get password(): string {
        return this.loginForm.get('password')?.value as string;
    }

    ngOnInit(): void {
        if (this.authService.currentUser) {
            this.authService.logout();
        }

        this.appName = this.options.appName;
        this.subtitle = this.options.subtitle ? this.options.subtitle : '';
    }

    login() {
        this.busy = true;
        return this.authService.login(this.username, this.password)
            .subscribe(() => {
                this.busy = false;
                this.router.navigate(['/'])
            }, () => {
                this.busy = false;
            });
    }

}
