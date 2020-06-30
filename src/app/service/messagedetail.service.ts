import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { listMessage } from '../model/mock-message';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagedetailService {

  constructor() { }

  getMessages(id: number): Observable<Message[]> {
    return of(listMessage.filter(mess => ((mess.senderId === id) || (mess.receiverId === id))));
  }
}
