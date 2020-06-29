import { Injectable } from '@angular/core';
import { MessageDetail } from '../model/message-detail';
import { messageDetail } from '../model/mock-message-detail';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagedetailService {

  constructor() { }

  getMessageDetail(id: number): Observable<MessageDetail> {
    return of(messageDetail.find(messagedetail => messagedetail.userId === id));
  }
}
