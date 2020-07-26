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
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']).then(() => {
            window.location.reload();
        })
    }

    register(user: User) {
        return this.http.post<string>(`${environment.apiUrl}/register`, user);
    }

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

    updatePassword(params: UpdatePassword): Observable<any> {
        console.log(params);
        return this.http.put(`${environment.apiUrl}/updatePassword`, params);
    }

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