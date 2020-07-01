import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from '../chat/messages/messages.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'conversation/:id',
        component: MessagesComponent
      },
      {
        path: '', redirectTo: 'conversation/1', pathMatch: 'full'
      },
      {
        path: 'conversation', redirectTo: 'conversation/1', pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
