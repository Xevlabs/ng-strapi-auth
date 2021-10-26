import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services';
import { SnackBarService, SnackBarTypeEnum } from '@xevlabs-ng-utils/ng-snackbar';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ng-strapi-auth-pass-forgotten',
  templateUrl: './pass-forgotten.component.html',
  styleUrls: ['./pass-forgotten.component.scss']
})
export class PassForgottenComponent {

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
            email: ['', [
                Validators.required,
                Validators.email]]
        });
    }

    passReset(): void {
        this.busy = true;
        this.authService.forgotPassword(this.passResetForm.get('email')!.value).pipe(take(1)).subscribe(() => {
            this.afterPassReset();
        })
    }

    afterPassReset(): void {
        this.busy = false;
        this.router.navigate(['../'], { relativeTo: this.route });
        this.snackBarService.showSnackBar(SnackBarTypeEnum.SUCCESS, 'AUTH.PASSRESET.CONFIRMATION_MESSAGE');
    }

    cancel(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}
