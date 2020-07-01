import { NgModule } from '@angular/core';

import { ViewRoutingModule } from './view-routing.module';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { ShareModule } from '../share/share.module';
import { ChatModule } from '../chat/chat.module';


@NgModule({
  declarations: [HomeComponent, SigninComponent],
  imports: [
    ViewRoutingModule,
    ShareModule,
    ChatModule
  ]
})
export class ViewModule { }
