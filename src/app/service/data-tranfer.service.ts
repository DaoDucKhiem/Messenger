import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTranferService {

  constructor() { }

  //truyền contactId cho bên message khi route thay đổi
  @Output() contactId = new EventEmitter<string>();
  changeSelectConversation(id: string) {
    this.contactId.emit(id);
  }

  //truyền tín hiệu cho bên list để cập nhật thông tin conversation last message
  @Output() sendMessage = new EventEmitter<boolean>();
  sendMessageActive() {
    this.sendMessage.emit(true);
  }
}
