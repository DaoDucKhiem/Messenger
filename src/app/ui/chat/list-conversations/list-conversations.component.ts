import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../../model/conversation';
import { ConversationService } from '../../../service/conversation.service';

@Component({
  selector: 'app-list-conversations',
  templateUrl: './list-conversations.component.html',
  styleUrls: ['./list-conversations.component.scss']
})
export class ListConversationsComponent implements OnInit {

  conversations: Conversation[];
  conversationsCopy: Conversation[];
  onSelectConversation: Conversation;
  searchTerm: any;

  constructor(private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.getConversations();
  }

  onSelect(conversation: Conversation): void {
    this.onSelectConversation = conversation;
  }

  getConversations(): void {
    this.conversationService.getConversations()
    .subscribe(conversations => this.conversations = conversations);
    this.conversationsCopy = this.conversations;
  }

  search(): void {
    let term = this.searchTerm;
    this.conversations = this.conversationsCopy.filter(function(tag) {
        return tag.contactName.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    }); 
}
}
