import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../../../service/account.service';
import { ConfirmedValidator } from 'src/app/helpers/confirmed.validator';
import { StringeeService } from 'src/app/service/stringee.service';

@Component({ templateUrl: './register.component.html', styleUrls: ['./register.component.scss'] })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    token: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private accountService: AccountService,
        private stringeeService: StringeeService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            fullname: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern("((09|03|07|08|05)+([0-9]{8}))")]],
            imageurl: [''],
            password: ['', Validators.required],
            re_password: ['', Validators.required]
        },
        { 
            validator: ConfirmedValidator('password', 're_password')
        });
    }

    // truy cập vào các trường trong form dễ dàng hơn
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // dừng lại tại đây nếu các trường nhập chưa chính xác
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    //cập nhật thông tin của người dùng trên server stringee
                    this.stringeeService.connectStringeeToRegister(data['token']);

                    //sau 1s thì đưa người dùng về view login
                    setTimeout(()=>{this.router.navigate(['../login'], { relativeTo: this.route })}, 1000);
                },
                error => {
                    this.showError(error);
                    this.loading = false;
                });
    }

    //hiên toast thông báo lỗi
    showError(error: string) {
        this.toastr.error(error);
    }
}