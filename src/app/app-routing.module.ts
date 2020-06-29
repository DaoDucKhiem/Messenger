import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { MessagesComponent } from './ui/chat/messages/messages.component';


const routes: Routes = [
  { path: '', redirectTo: '/message/1', pathMatch: 'full' },
  { path: 'message/:id', component: MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
