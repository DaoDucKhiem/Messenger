import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListConversationsComponent } from './list-conversations/list-conversations.component';
import { MessagesComponent } from './messages/messages.component';
import { FormsModule } from '@angular/forms';
import { TestRoutingModule } from '../test/test-routing.module';



@NgModule({
  declarations: [ListConversationsComponent, MessagesComponent],
  imports: [
    TestRoutingModule,
    CommonModule,
    FormsModule
  ],
  exports: [ListConversationsComponent, MessagesComponent]
})
export class ChatModule { }
