import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../../model/conversation';
import { ConversationService } from '../../../service/conversation.service';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessagedetailService } from 'src/app/service/messagedetail.service';

@Component({
  selector: 'app-list-conversations',
  templateUrl: './list-conversations.component.html',
  styleUrls: ['./list-conversations.component.scss']
})
export class ListConversationsComponent implements OnInit {

  conversations: Conversation[];
  conversationsCopy: Conversation[];
  onSelectConversationId: number;
  searchTerm: any;

  sub: Subscription;

  constructor(private conversationService: ConversationService, private messagedetail: MessagedetailService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getConversations();

    this.getConversationId();

    //update message status
    // const found = this.conversations.find(item => item.conversationId === this.onSelectConversationId);
    // let index = this.conversations.indexOf(found);
    // this.conversations[index].messageStatus = 'seen';
  }

  getConversationId() {
    this.messagedetail.conversationId.subscribe(data => {
      this.onSelectConversationId = data;
    })
  }

  onSelect(conversation: Conversation): void {
    this.getConversationId();
    //update message status
    let index = this.conversations.indexOf(conversation);
    this.conversations[index].messageStatus = 'seen';

  }

  getConversations(): void {
    this.conversationService.getConversations()
      .subscribe(conversations => this.conversations = conversations);
    this.conversationsCopy = this.conversations;
  }

  search(): void {
    let term = this.searchTerm;
    this.conversations = this.conversationsCopy.filter(function (tag) {
      return tag.contactName.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    });
  }

  //check selected
  checkSelected(id: number) {
    return id === this.onSelectConversationId;
  }

  //check user online
  checkOnline(status: string) {
    return status == 'online';
  }

  //check message seen ?
  checkMessageStatus(statusMessage: string) {
    return statusMessage === 'seen';
  }

  addClassToContactName(contactStatus: string, messageStatus: string, conversationSelected: number): string {
    if (this.checkSelected(conversationSelected))
      return "title-selected";
    else if (this.checkOnline(contactStatus) && !this.checkMessageStatus(messageStatus))
      return "online-and-not-seen";
    else if (this.checkOnline(contactStatus) && this.checkMessageStatus(messageStatus))
      return "user-online";
  }

  addClassToLastMess(contactStatus: string, messageStatus: string): string {
    if (this.checkOnline(contactStatus) && !this.checkMessageStatus(messageStatus))
      return "online-and-not-seen";
    else if (this.checkMessageStatus(messageStatus))
      return "seen";
    else return "not-seen";
  }

  calculateDiff(data) {
    let currentDate = new Date();
    data = new Date(data);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(data.getFullYear(), data.getMonth(), data.getDate())) / (1000 * 60 * 60 * 24));
  }

  forMatTime(data) {
    let diff = this.calculateDiff(data);
    if (diff <= 1) {
      return 0;
    }
    else if (diff > 1 && diff < 8) {
      return 1;
    }
    else {
      return 2;
    }
  }
}
