import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListConversationsComponent } from './list-conversations/list-conversations.component';
import { MessagesComponent } from './messages/messages.component';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from '../view/home/home-routing.module';



@NgModule({
  declarations: [ListConversationsComponent, MessagesComponent],
  imports: [
    HomeRoutingModule,
    CommonModule,
    FormsModule
  ],
  exports: [ListConversationsComponent, MessagesComponent]
})
export class ChatModule { }
