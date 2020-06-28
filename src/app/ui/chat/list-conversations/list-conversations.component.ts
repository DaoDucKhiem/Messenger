import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../../model/conversation';
import { Conversations } from '../../../model/mock-conversation';
import { ConversationService } from '../../../service/conversation.service';
import { from} from 'rxjs';

@Component({
  selector: 'app-list-conversations',
  templateUrl: './list-conversations.component.html',
  styleUrls: ['./list-conversations.component.scss']
})
export class ListConversationsComponent implements OnInit {

  conversations: Conversation[];
  onSelectConversation: Conversation;

  constructor(private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.getConversations();
  }

  onSelect(conversation: Conversation): void {
    this.onSelectConversation = conversation;
  }

  getConversations(): void {
    this.conversationService.getConversation()
    .subscribe(conversations => this.conversations = conversations);
  }

}
