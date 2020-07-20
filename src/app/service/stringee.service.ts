import { Injectable, Output, EventEmitter } from '@angular/core';
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StringeeService {

  // global
  stringeeClient = new StringeeClient();
  user: any;
  selectedConvId: string;

  // global
  stringeeChat: StringeeChat;

  constructor(private toastr: ToastrService,) {
    this.stringeeChat = new StringeeChat(this.stringeeClient);
    // this.lastConvId = this.getConversations(1)[0].ConvId;
    // console.log(this.lastConvId);
  }

  connectStringee() {
    let token = JSON.parse(localStorage.getItem('user')).token;
    //connect đến server stringee
    this.stringeeClient.connect(token);

    this.authenListenner();
    this.disconnectListenner();
  }

  disconnectStringee() {
    this.stringeeClient.disconnect();
  }

  showError(error: string) {
    this.toastr.error(error);
  }

  showSuccess(success: string) {
    this.toastr.success(success);
  }

  connectListenner() {
    this.stringeeClient.on('connect', () => {
    });

    this.authenListenner();
    this.disconnectListenner();
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
      this.showSuccess("Tạo cuộc trò chuyện thành công");
    });
  }

  /**
   * lấy danh sách các cuộc trò chuyện
   * @param amount số lượng cuộc trò chuyện cần lấy
   * @param callback làm gì đó sau khi lấy xong.
   */
  getConversations(amount: any, callback?: any) {
    var count = amount;
    var isAscending = false;
    this.stringeeChat.getLastConversations(count, isAscending, callback);
  }

  getMessages(convId: string, callback?: any) {
    var convId = convId;
    var count = 50;
    var isAscending = false;
    this.stringeeChat.getLastMessages(convId, count, isAscending, callback);
  }

  //cập nhật thông tin user trên stringee
  updateUserInfo(id: string, token: string) {
    this.stringeeChat.getUsersInfo([id], (_status: any, _code: any, _msg: any, users: any[]) => {
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
        console.log(updateUserData);
        this.stringeeChat.updateUserInfo(updateUserData, (res: any) => {
          if (res.message == 'Success') {
            this.showSuccess("Cập nhật thông tin thành công!");
          }
          else this.showError("Cập nhật thông tin thất bại!");
          this.disconnectStringee();
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

  //truyền id cho bên list khi route thay đổi
  @Output() conversationId = new EventEmitter<string>();
  changeConversation(id: string) {
    this.conversationId.emit(id);
  }

  //truyền contactId cho bên message khi route thay đổi
  @Output() contactId = new EventEmitter<string>();
  changeSelectConversation(id: string) {
    this.contactId.emit(id);
  }
}