import { Injectable} from '@angular/core';
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FileService } from './file.service';

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

  infoUpdate: object;

  constructor(private toastr: ToastrService, private router: Router, private fileService: FileService) {
    this.stringeeChat = new StringeeChat(this.stringeeClient);
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

  //thông báo lỗi
  showError(error: string) {
    this.toastr.error(error);
  }

  //thông báo thành công
  showSuccess(success: string) {
    this.toastr.success(success);
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

  /**
   * lấy thông tin user trên stringee
   * @param id id của user
   */
  getUInfoStringee(id: string) {
    let user: any;
    this.stringeeChat.getUsersInfo([id], (_status: any, _code: any, _msg: any, users: any[]) => {
      user = users[0];
    })
    return user;
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

  //connect stringee khi người dùng thực hiện update profile
  connectStringeeToUpdate(token: any) {
      this.updateUserInfor(this.getCurrentIdFromAccessToken(token), token, "Cập nhật thông tin thành công!");
  }

  //connect khi người dùng thực hiện đăng ký tài khoản
  connectStringeeToRegister(token: any) {
    this.stringeeClient.connect(token);
    this.stringeeClient.on('connect', () => {
      this.updateUserInfor(this.getCurrentIdFromAccessToken(token), token, "Đăng ký thành công!");
    });
    this.authenListenner();

    this.disconnectListenner();
  }

  //cập nhật thông tin khi người dùng thực hiện cập nhật
  updateUserInfor(id: string, token: string, message: string) {
    this.stringeeChat.getUsersInfo([id], (_status: any, _code: any, _msg: any, users: any[]) => {
      let _user = users[0];
      if (!_user) {
        let username = this.getCurrentUsernameFromAccessToken(token);
        let avatar = this.getCurrentUserAvatarFromAccessToken(token);
        let email = this.getCurrentEmailFromAccessToken(token)
        this.infoUpdate = {
          display_name: username,
          avatar_url: avatar,
          email: email,
        }
        
        this.stringeeChat.updateUserInfo(this.infoUpdate, (res: any) => {
          if (res.message == 'Success') {
            this.showSuccess(message);
            setTimeout(function() {window.location.reload()}, 1000);
          }
          else this.showError("Cập nhật thông tin thất bại!");
        });
      }
    })
  }

  //tạo cuộc trò chuyện
  createConversation(id: string) {
    var options = {
      name: '',
      isDistinct: true,
      isGroup: false
    };

    this.stringeeChat.createConversation([id], options, (status: string, code: string, message: string, conv: any) => {
      this.router.navigate(['/home/conversation/' + conv.id]);
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

  //lấy các tin nhắn của cuộc trò chuyện
  getMessages(convId: string, callback?: any) {
    var convId = convId;
    var count = 15;
    var isAscending = true;
    this.stringeeChat.getLastMessages(convId, count, isAscending, callback);
  }

  //lấy các tn nhắn cũ hơn khi thực hiện phân trang
  getMessageBefore(convId: any, sequence: any, callback?: any) {
    var count = 15;
    var isAscending = true;
    var _sequence = sequence;
    this.stringeeChat.getMessagesBefore(convId, _sequence, count, isAscending, callback);
  }

  //gửi file lên server_stringee và server
  sendFile(convId: string, fName: string, fPath: string, fLenght: number, typeofFile: number) {
    var fileMsg = {
      type: 5,
      convId: convId,
      message: {
        content: 'Đã gửi một file',
        file: {
          filePath: fPath,
          filename: fName,
          length: fLenght
        },
        metadata: {
          key: 'value'
        }
      }
    };

    this.stringeeChat.sendMessage(fileMsg, function (status: any, code: any, message: any, msg: any) {
      // console.log(status + code + message + "msg result " + JSON.stringify(msg));
    });

    var fileInfo = {
      type: 5,
      convId: convId,
      filePath: fPath,
      content: fName,
      typeofFile: typeofFile,
    }

    this.fileService.uploadFileServer(fileInfo).subscribe(data => {
      //console.log(data)
    })

  }

  //gửi ảnh
  sendPhoto(convId: string, fPath: string) {
    var photoMsg = {
      type: 2,
      convId: convId,
      message: {
        content: 'Đã gửi một ảnh',
        photo: {
          filePath: fPath,
        },
        metadata: {
          key: 'value'
        }
      }
    };

    this.stringeeChat.sendMessage(photoMsg, function (status: any, code: any, message: any, msg: any) {
     
    });

    //gửi ảnh info lên server
    var photoInfo = {
      type: 2,
      convId: convId,
      filePath: fPath,
    }

    this.fileService.uploadFileServer(photoInfo).subscribe(data => {
      //console.log(data)
    })
  }
}