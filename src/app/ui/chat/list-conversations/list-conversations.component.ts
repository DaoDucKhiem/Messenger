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
    console.log(this.route.snapshot.data);
  }

  ngOnInit(): void {
    this.getConversations();
  }

  onSelect(conversationId: number): void {
    this.onSelectConversationId = conversationId;
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
}
