import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './ui/chat/messages/messages.component';
import { from } from 'rxjs';


const routes: Routes = [
  { path: '', redirectTo: '/message', pathMatch: 'full' },
  { path: 'message', component: MessagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
