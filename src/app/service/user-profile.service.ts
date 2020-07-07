import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';
import { listUser } from '../model/mock-user';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor() { }

  getUser(id: number): Observable<User> {
    return of(listUser.find(user => user.userId === id));
  }
}
