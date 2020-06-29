import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListConversationsComponent } from './list-conversations/list-conversations.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListConversationsComponent, MessagesComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [ListConversationsComponent, MessagesComponent]
})
export class ChatModule { }
