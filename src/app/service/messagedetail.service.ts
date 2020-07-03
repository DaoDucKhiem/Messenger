import { Injectable, Output, EventEmitter } from '@angular/core';
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

  @Output() conversationId = new EventEmitter<number>();
  changeConversation(id: number) {
    this.conversationId.emit(id);
  }
}
