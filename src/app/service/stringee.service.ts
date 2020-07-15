import { Injectable } from '@angular/core';
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
import { User } from '../model/user-login';

@Injectable({
  providedIn: 'root'
})
export class StringeeService {

  // global
  stringeeClient = new StringeeClient();
  user: User;

  constructor() {
  }

  public connect() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.stringeeClient.connect(this.user.token);
  }
}