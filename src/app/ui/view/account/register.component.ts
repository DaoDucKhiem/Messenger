import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../../../service/account.service';
import { AlertService } from 'src/app/service/alert.service';
import { ConfirmedValidator } from 'src/app/helpers/confirmed.validator';

@Component({ templateUrl: './register.component.html', styleUrls: ['./register.component.scss'] })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            fullname: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]{2,}$")]],
            phone: ['', [Validators.required, Validators.pattern("((09|03|07|08|05)+([0-9]{8}))")]],
            imageurl: [''],
            password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$")]],
            re_password: ['', Validators.required]
        },
        { 
            validator: ConfirmedValidator('password', 're_password')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

         // reset alerts on submit
         this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    this.alertService.error(error.error.message);
                    this.loading = false;
                });
    }
}