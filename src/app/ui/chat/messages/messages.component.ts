import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessagedetailService } from '../../../service/messagedetail.service';

import { MessageDetail } from '../../../model/message-detail';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  message: MessageDetail;
  currentUserId = 10;

  showAb = true;
  showImg = true;
  showFile = true;

  constructor(private route: ActivatedRoute, private messagedetail: MessagedetailService, private location: Location) {
    route.params.subscribe(val => {
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
    this.messagedetail.getMessageDetail(id)
      .subscribe(ms => this.message = ms);
  }
}
