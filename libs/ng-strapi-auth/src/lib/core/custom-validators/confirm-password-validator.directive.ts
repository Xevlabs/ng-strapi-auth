import { Directive, Input } from '@angular/core';
import { FormControl, ValidationErrors, Validator } from '@angular/forms';

export function confirmPasswordValidatorFn(control: FormControl): ValidationErrors | null {
    if (!control.parent) {
        return null;
    }
    const password = control.parent.get('password')?.value;
    return control.value !== password ? { isPasswordDifferent: true } : null;
}

@Directive({
    selector: '[isEmailUniqueValidatorFn]',
})
export class ConfirmPasswordValidatorDirective implements Validator {
    @Input() password!: FormControl;


    constructor() {
    }

    validate(control: FormControl): ValidationErrors | null {
        return confirmPasswordValidatorFn(control);
    }
}
