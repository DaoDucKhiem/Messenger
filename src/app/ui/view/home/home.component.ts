import { Component, OnInit } from '@angular/core';
import { StringeeService } from 'src/app/service/stringee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  conversations: any;
  convId: string;
  currentUserId: string;

  constructor(private stringeeService: StringeeService, private route: ActivatedRoute, private router: Router) { 
    this.currentUserId = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {

    //kết nối với stringee
    this.stringeeService.connectStringee();
    this.stringeeService.stringeeClient.on('connect', () => {
      console.log("+++connected");
      this.getConversations();
    });
  }

  /**
   * lấy danh sách các conversation
   */
  getConversations() {
    this.stringeeService.getConversations(15, (status, code, message, convs) => {

      this.conversations = convs;

      //cập nhật đã xem cho last message
      this.conversations[0].unreadCount = 0;
      this.stringeeService.stringeeChat.markConversationAsRead(convs[0].id);

      //lấy conversation đầu tiên
      for (let parti of convs[0].participants) {
        if (parti.userId != this.currentUserId) {

          //lấy id của conversation đầu tiên để đẩy lên route
          this.router.navigate(['/home/conversation/' + convs[0].id]).then(() => {

            //bắn user id của contact cho message
            this.stringeeService.changeSelectConversation(parti.userId);
          });
          break;
        }
      }
    });
  }
}