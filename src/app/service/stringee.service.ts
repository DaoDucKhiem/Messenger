import { Injectable } from '@angular/core';
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";

@Injectable({
  providedIn: 'root'
})
export class StringeeService {

  // global
  stringeeClient = new StringeeClient();
  user: any;

  // global
  stringeeChat: StringeeChat;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.stringeeChat = new StringeeChat(this.stringeeClient);
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

  //connect stringee khi người dùng vừa đăng ký thực hiện update profile
  connectStringeeToUpdate(token: any) {
    this.stringeeClient.connect(token);
    this.stringeeClient.on('connect', () => {
      this.updateUserInfo(this.getCurrentIdFromAccessToken(token), token);
    });
    this.authenListenner();
    
    this.disconnectListenner();
  }

  //tạo cuộc trò chuyện
  createConversation(id: string, _name: string) {
    var options = {
      name: _name,
      isDistinct: true,
      isGroup: false
    };

    this.stringeeChat.createConversation([id], options, (status: string, code: string, message: string, conv: any) => {
      localStorage.setItem('ConvId', conv.id);

    });
  }

  //lấy danh sách các cuộc trò chuyện
  getConversation(callback: any) {
    var count = 15;
    var isAscending = false;
    this.stringeeChat.getLastConversations(count, isAscending, callback);
  }

  //cập nhật thông tin user trên stringee
  updateUserInfo(id: string, token: string) {
    this.stringeeChat.getUsersInfo([id], (status, code, msg, users) => {
      let _user = users[0];
      if (!_user) {
        let username = this.getCurrentUsernameFromAccessToken(token);
        let avatar = this.getCurrentUserAvatarFromAccessToken(token);
        let email = this.getCurrentEmailFromAccessToken(token)
        let updateUserData = {
          display_name: username,
          avatar_url: avatar,
          email: email,
        }
        this.stringeeChat.updateUserInfo(updateUserData, function (res: any) {
          console.log(res)
        });
      }
    })
  }

  //lấy id từ token
  getCurrentIdFromAccessToken(token: any) {
    let decodedToken = this.decodedToken(token);
    return decodedToken.id;
  }

  //lấy email từ token
  getCurrentEmailFromAccessToken(token: any) {
    let decodedToken = this.decodedToken(token);
    return decodedToken.email;
  }

  //lấy avatar from token
  getCurrentUserAvatarFromAccessToken(token: any) {
    let decodedToken = this.decodedToken(token);
    return decodedToken.avatar;
  }

  //lấy tên của người đăng nhập hiện tại
  getCurrentUsernameFromAccessToken(token: any) {
    let decodedToken = this.decodedToken(token);
    return decodedToken.fullName;
  }

  //decode token lấy dữ liệu
  decodedToken(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}