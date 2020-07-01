import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../../model/conversation';
import { ConversationService } from '../../../service/conversation.service';

import { ActivatedRoute } from '@angular/router';

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

  constructor(private conversationService: ConversationService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getConversations();
    let id = +this.route.snapshot.firstChild.paramMap.get('id');
    this.onSelectConversationId = id;

    const found = this.conversations.find(item => item.conversationId === id);
    found.messageStatus = 'seen';

  }

  onSelect(conversation: Conversation): void {
    this.onSelectConversationId = conversation.contactId;

    conversation.messageStatus = 'seen';

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
}
