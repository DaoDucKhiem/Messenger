import { Injectable } from '@angular/core';
import { Conversation } from '../model/conversation';
import { Conversations } from '../model/mock-conversation';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor() { }
  
  getConversations(): Observable<Conversation[]> {
    return of(Conversations);
  }

  getConversation(id: number): Observable<Conversation> {
    return of(Conversations.find(conversation => conversation.contactId === id));
  }
}
