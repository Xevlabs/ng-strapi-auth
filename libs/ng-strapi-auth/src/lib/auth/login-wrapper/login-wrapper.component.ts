import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteModel } from '../../core/models/route.model';
import { AuthService } from '../../core/services/auth/auth.service';
import { AuthOptionModel } from '../../ng-strapi-auth-options';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'ng-strapi-auth-login-wrapper',
    templateUrl: './login-wrapper.component.html',
    styleUrls: ['./login-wrapper.component.scss'],
})
export class LoginWrapperComponent implements OnInit {

    public loginForm: FormGroup;
    public busy = false;
    public appName: string = '';
    public subtitle: string = '';
    public passwordResetEnabled: boolean;
    public disableDefaultLoader = false
    public customRoutes?: RouteModel[];

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private hotToastService: HotToastService,
        private translocoService: TranslocoService,
        @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.passwordResetEnabled = this.options.enableResetPassword!;
        if (this.options.disableDefaultLoader) this.disableDefaultLoader = this.options.disableDefaultLoader;
        this.customRoutes = this.options.customRoutes;
    }

    get username(): string {
        return this.loginForm.get('username')?.value as string;

    }

    get password(): string {
        return this.loginForm.get('password')?.value as string;
    }

    ngOnInit(): void {
        this.appName = this.options.appName;
        this.subtitle = this.options.subtitle ? this.options.subtitle : '';
    }

    login() {
        if (!this.loginForm.invalid) {
            this.busy = true;
            return this.authService.login(this.username, this.password)
                .subscribe(() => {
                    this.busy = false;
                    this.router.navigate(['/'])
                }, (e) => {
                    console.error(e)
                    this.hotToastService.error(this.translocoService.translate("AUTH.ERROR.LOGIN"));
                    this.busy = false;
                });
        }
        else {
            this.loginForm.markAllAsTouched();
            return
        }

    }

}
