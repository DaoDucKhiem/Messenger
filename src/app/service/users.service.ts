import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user-login';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrlUser}`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrlUser}/${id}`);
  }

  getUsersByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrlUser}/${'search?name='+name}`);
  }
}
