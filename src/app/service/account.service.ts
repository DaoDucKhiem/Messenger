import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../model/user-login';
import { Profile } from '../model/profile';
import { UpdatePassword } from '../model/update-password';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/login`, { email, password })
            .pipe(map(user => {
                // lưu lại thông tin của người dùng hiện tại khi reload thì auto đăng nhập
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // xóa người dùng khỏi local storage
        localStorage.removeItem('user');

        //thông báo người dùng rỗng
        this.userSubject.next(null);

        //đưa đến trang login
        this.router.navigate(['/login']).then(() => {
            window.location.reload(); //xử lý để reconnect vs stringee
        })
    }

    //đăng nhập tài khoản
    register(user: User) {
        return this.http.post<string>(`${environment.apiUrl}/register`, user);
    }

    //cập nhật thông tin tài khoản
    updateProfile(params: Profile): Observable<any>{
        return this.http.put(`${environment.apiUrl}/updateProfile`, params)
            .pipe(map(x => {

                if(params.id == this.userValue.id) {
                // update thông tin trong storage
                const user = { ...this.userValue, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // truyền thông tin user đến các subcriber
                this.userSubject.next(user);
                }
                return x;
            }));
    }

    //thay password
    updatePassword(params: UpdatePassword): Observable<any> {
        console.log(params);
        return this.http.put(`${environment.apiUrl}/updatePassword`, params);
    }

    //chưa dùng tới
    // xóa người dùng
    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}