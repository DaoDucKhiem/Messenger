import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListConversationsComponent } from './list-conversations/list-conversations.component';
import { MessagesComponent } from './messages/messages.component';



@NgModule({
  declarations: [ListConversationsComponent, MessagesComponent],
  imports: [
    CommonModule
  ],
  exports: [ListConversationsComponent, MessagesComponent]
})
export class ChatModule { }
