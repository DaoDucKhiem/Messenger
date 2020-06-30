import { NgModule } from '@angular/core';

import { TestRoutingModule } from './test-routing.module';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { ShareModule } from '../share/share.module';
import { ChatModule } from '../chat/chat.module';


@NgModule({
  declarations: [HomeComponent, SigninComponent],
  imports: [
    TestRoutingModule,
    ShareModule,
    ChatModule
  ]
})
export class TestModule { }
