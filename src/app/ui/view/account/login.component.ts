import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { AccountService } from 'src/app/service/account.service';

@Component({ templateUrl: './login.component.html', styleUrls: ['./login.component.scss'] })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private accountService: AccountService,
    ) {
     }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // trở lại đường cũ nếu sai hoặc đưa vào home nếu đúng.
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    // focusNext(name: string) {
    //     document.getElementsByName(name).focus();
    // }

    // truy cập các trường dễ dàng hơn
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // dừng lại ở đây nếu các trường chưa hợp lệ
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.showError(error);
                    this.loading = false;
                });
    }

    //thống báo toast cho người dùng lỗi
    showError(error: string) {
        this.toastr.error(error);
    }
}