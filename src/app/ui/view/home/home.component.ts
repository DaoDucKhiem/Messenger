import { Component, OnInit } from '@angular/core';
import { StringeeService } from 'src/app/service/stringee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  conversations: any;
  convId: string;
  messages: any;
  currentUserId = JSON.parse(localStorage.getItem('user')).userId;

  constructor(private stringeeService: StringeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.convId = this.route.snapshot.paramMap.get('id');
    this.stringeeService.connectStringee();
    this.stringeeService.stringeeClient.on('connect', () => {
      console.log("+++connected");
      this.getConversations();
      this.getMessages();
    });
  }

  getConversations() {
    this.stringeeService.getConversations(15, (status, code, message, convs) => {
      this.conversations = convs;
      for(let conv of convs) {
        for(let parti of conv.participants) {
          if(parti.userId != this.currentUserId) {
            this.stringeeService.changeSelectConversation(parti.userId);
            break;
          }
        }
      }
    });
  }

  getMessages() {
    this.stringeeService.getMessages(this.convId,  (status, code, message, smsg) => {
      this.messages = smsg;
    });
  }
}