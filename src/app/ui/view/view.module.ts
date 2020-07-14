import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { HomeRoutingModule } from './home/home-routing.module';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../share/share.module';
import { ChatModule } from '../chat/chat.module';




@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule,
    ChatModule,
  ]
})
export class ViewModule { }