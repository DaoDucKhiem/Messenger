import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { listUser } from '../model/mock-user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor() { }
  getConversation(id: number): Observable<User> {
    return of(listUser.find(user => user.userId === id));
  }

}
