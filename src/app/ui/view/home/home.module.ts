import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ChatModule } from '../../chat/chat.module';
import { ShareModule } from '../../share/share.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ChatModule,
    ShareModule
  ]
})
export class HomeModule { }
