import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserProfileService } from '../../../service/user-profile.service';
import { User } from '../../../model/user';

import { MessagedetailService } from '../../../service/messagedetail.service';
import { Message } from '../../../model/message';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {
  userContact: User;
  Messages: Message[];
  currentUserId = 10;
  messageSend: any;

  showAb = true;
  showImg = true;
  showFile = true;

  constructor(private route: ActivatedRoute, private userService: UserProfileService, private messagedetail: MessagedetailService, private location: Location) {
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

    this.userService.getUser(id)
    .subscribe(user => this.userContact = user);

    this.messagedetail.getMessages(id)
      .subscribe(ms => this.Messages = ms);
  }

  getMessageText() {
    return this.Messages.filter(mess => mess.type === 'text');
  }
  
  getMessageFile() {
    return this.Messages.filter(mess => ((mess.type === 'pdf') || (mess.type === 'word') || (mess.type === 'pptx')));
  }

  getMessageImage(){
    return this.Messages.filter(mess => mess.type === 'image');
  }

  @ViewChild('box') box: ElementRef;

  clear() {
    this.box.nativeElement.value = "";
  }

  onEnter(val: any): void {
    this.messageSend = val;
    let newMess: Message = {
      id: this.Messages.length + 1,
      senderId: this.currentUserId,
      receiverId: this.userContact.userId,
      type: 'text',
      time: Date(),
      content: this.messageSend
    };

    this.Messages.push(newMess);

    this.clear();
  }
}
