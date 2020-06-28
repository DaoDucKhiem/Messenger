import { Injectable } from '@angular/core';
import { Conversation } from '../model/conversation';
import { Conversations } from '../model/mock-conversation';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor() { }
  
  getConversation(): Observable<Conversation[]> {
    return of(Conversations);
  }
}
