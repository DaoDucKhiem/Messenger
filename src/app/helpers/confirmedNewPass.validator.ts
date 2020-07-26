import { FormGroup } from '@angular/forms';

export function ConfirmedNewPassValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.ConfirmedNewPassValidator) {
            return;
        }
        if (control.value === matchingControl.value) {
            matchingControl.setErrors({ ConfirmedNewPassValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}