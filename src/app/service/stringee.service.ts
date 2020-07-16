import { Injectable } from '@angular/core';
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
import { User } from '../model/user-login';

@Injectable({
  providedIn: 'root'
})
export class StringeeService {

  // global
  stringeeClient = new StringeeClient();
  user: any;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  connect() {

    //connect đến server stringee
    this.stringeeClient.connect(this.user.token);

    this.connectListenner();
    this.authenListenner();
    this.disconnectListenner();
  }

  connectListenner() {
    this.stringeeClient.on('connect', function () {
      console.log('++++++++++++++ connected to StringeeServer');
    });
  }

  authenListenner() {
    this.stringeeClient.on('authen', function (res) {
      console.log('authen', res);
    });
  }

  disconnectListenner() {
    this.stringeeClient.on('disconnect', function () {
      console.log('++++++++++++++ disconnected');
    });
  }


  
}