import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../core/services';
import { SnackBarService, SnackBarTypeEnum } from '@xevlabs-ng-utils/ng-snackbar';
import { switchMap, take } from 'rxjs/operators';
import { confirmPasswordValidatorFn } from '../../core/custom-validators/confirm-password-validator.directive';

@Component({
  selector: 'ng-strapi-auth-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss']
})
export class PassResetComponent {

    passResetForm: FormGroup;
    busy = false;

    constructor(
        private formBuilder: FormBuilder,
        private snackBarService: SnackBarService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.passResetForm = this.formBuilder.group({
            code: this.route.snapshot.paramMap.get('code'),
            password: ['', [Validators.required]],
            passwordConfirmation: ['', [Validators.required, confirmPasswordValidatorFn]]
        });
    }

    passReset(): void {
        this.busy = true;
        const passResetInformation = {
            code: this.passResetForm.get('code')?.value,
            password: this.passResetForm.get('password')?.value,
            passwordConfirmation: this.passResetForm.get('passwordConfirmation')?.value
        }
        
        this.authService.resetPassword(passResetInformation).pipe(take(1)).subscribe(() => {
            this.afterPassReset();
        })
    }

    afterPassReset(): void {
        this.busy = false;
        this.router.navigate(['../'], { relativeTo: this.route });
        this.snackBarService.showSnackBar(SnackBarTypeEnum.SUCCESS, 'AUTH.PASSRESET.CONFIRMATION_MESSAGE');
    }

}
