import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { Observable, of } from 'rxjs';
import { listFileShared } from '../model/mock-message-file';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  messageFile: Message[];

  constructor() { }

  getListMessageFile(id: number):Observable<Message[]> {
    return of(listFileShared.filter(mess => ((mess.senderId === id) || (mess.receiverId === id))));
  }
}
