import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../service/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) {
            //nếu người dùng đã được xác thực
            return true;
        }

        // nếu người dùng chưa được xác thực thì trả về tuyến đăng nhập
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}