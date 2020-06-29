import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConversationService } from '../../../service/conversation.service';

import { Conversation } from '../../../model/conversation';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public fileShared = [{
    name: "Nội dung hội nghị.pdf",
    url: ""
  }, {
    name: "Quy trình cho nhân viên.pdf",
    url: ""
  }]

  public imageShared = [{
    img: "../../../assets/images/Avatar/1.jpg"
  }, {
    img: "../../../assets/images/Avatar/2.jpg"
  }, {
    img: "../../../assets/images/Avatar/3.jpg"
  }, {
    img: "../../../assets/images/Avatar/4.jpg"
  }, {
    img: "../../../assets/images/Avatar/2.jpg"
  }, {
    img: "../../../assets/images/Avatar/1.jpg"
  }]

  cs: Conversation;

  showAb = true;
  showImg = true;
  showFile = true;

  constructor(private route: ActivatedRoute, private conversationService: ConversationService, private location: Location) {
    route.params.subscribe(val=> {
      this.getConversation();
    })
   }

  ngOnInit(): void {
    this.getConversation();
  }

  showAbout() {
    this.showAb = !this.showAb;
  }

  showAllImg() {
    this.showImg = !this.showImg;
  }

  showAllFile() {
    this.showFile = !this.showFile;
  }

  getConversation(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.conversationService.getConversation(id)
      .subscribe(cs => this.cs = cs);
  }

}
