import { Component, OnInit } from '@angular/core';
import { StringeeService } from 'src/app/service/stringee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTranferService } from 'src/app/service/data-tranfer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  conversations: any;
  messages: any;

  convId: string;
  currentUserId: string;

  constructor(
    private stringeeService: StringeeService,
    private route: ActivatedRoute,
    private router: Router,
    private dataTranferService: DataTranferService
  ) {
    this.currentUserId = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {

    //kết nối với stringee
    this.stringeeService.connectStringee();
    this.stringeeService.stringeeClient.on('connect', () => {
      console.log("+++connected");
      this.getConversations();
      this.getMessages;

      //lắm nghe khi người dùng gửi tin nhắn
      this.stringeeService.stringeeChat.on('onObjectChange', () => {
        this.getMessages();
        this.getConvs();
      })
    });
  }


  getMessages() {
    var convId = this.route.snapshot.paramMap.get('id');
    this.stringeeService.getMessages(convId, (status, code, message, msgs) => {
      this.messages = msgs;
    });
  }

  //khi thay đổi tin nhắn
  getConvs() {
    this.stringeeService.getConversations(15, (status, code, message, convs) => {
      this.conversations = convs;

      // //cập nhật đã xem cho last message trên serve đang bị lag
      // this.stringeeService.stringeeChat.markConversationAsRead(convs[0].id);

      // //cập nhật đã xem cho lastMessage của conversation đầu tiên
      this.conversations[0].unreadCount = 0;
    });
  }

  /**
   * lấy danh sách các cuộc trò chuyện khi bắt đầu hoặc reload
   */
  getConversations() {
    //lấy conversation id từ trên url
    this.convId = this.route.snapshot.paramMap.get('id');

    //nếu id là 1 thì thực hiện focus vào conversation đầu tiên
    if (this.convId == '1') {
      this.stringeeService.getConversations(15, (status, code, message, convs) => {

        this.conversations = convs;

        //nếu đã có cuộc trò chuyện
        if (this.conversations.length != 0) {

          //cập nhật đã xem cho last message trên serve
          this.stringeeService.stringeeChat.markConversationAsRead(convs[0].id);
          //cập nhật đã xem cho lastMessage của conversation đầu tiên
          this.conversations[0].unreadCount = 0;

          //lấy contac id cuộc trò chuyện đầu tiên
          for (let parti of convs[0].participants) {
            if (parti.userId != this.currentUserId) {

              //lấy id của conversation đầu tiên để đẩy lên route
              this.router.navigate(['/home/conversation/' + convs[0].id]).then(() => {

                //bắn user id của contact cho message
                this.dataTranferService.changeSelectConversation(parti.userId);
              });
              break;
            }
          }
        }
      });
    }
    else {
      //nếu đã tồn tại conversation

      //cập nhật thông tin last message của conversation trước khi lấy về sau khi reload
      this.stringeeService.stringeeChat.markConversationAsRead(this.convId);

      this.stringeeService.getConversations(15, (status, code, message, convs) => {
        this.conversations = convs;

        // lấy conversation hiện tại
        var currentConv = convs.filter(c => c.id == this.convId);

        //lấy contact id truyền cho message
        for (let parti of currentConv[0].participants) {
          if (parti.userId != this.currentUserId) {

            //bắn user id của contact cho message
            this.dataTranferService.changeSelectConversation(parti.userId);
            break;
          }
        }
      })
    }
  }
}