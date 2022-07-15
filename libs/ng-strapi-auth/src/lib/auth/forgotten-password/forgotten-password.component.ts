import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services';
import { SnackBarService, SnackBarTypeEnum } from '@xevlabs-ng-utils/ng-snackbar';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthOptionModel } from '../../ng-strapi-auth-options';

@Component({
    selector: 'ng-strapi-auth-pass-forgotten',
    templateUrl: './forgotten-password.component.html',
    styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent {

    forgottenPasswordForm: FormGroup;
    busy = false;
    public disableDefaultLoader = false

    constructor(
        private formBuilder: FormBuilder,
        private snackBarService: SnackBarService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        @Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel
    ) {
        this.forgottenPasswordForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email]]
        });
        if (this.options.disableDefaultLoader) this.disableDefaultLoader = this.options.disableDefaultLoader;
    }

    askPasswordResetCode(): void {
        this.busy = true;
        this.authService.forgotPassword(this.forgottenPasswordForm.get('email')!.value).pipe(take(1)).subscribe(() => {
            this.onAskPasswordResetSuccess();
        }, (error: HttpErrorResponse) => {
            this.busy = false;
            throw error;
        })
    }

    isLoading() {
        if (this.busy) return 'loading'
        return ''
    }

    onAskPasswordResetSuccess(): void {
        this.busy = false;
        this.router.navigate(['../'], { relativeTo: this.route });
        this.snackBarService.showSnackBar(SnackBarTypeEnum.SUCCESS, 'AUTH.PASSRESET.CONFIRMATION_MESSAGE');
    }

}
