import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MessagesComponent } from '../../chat/messages/messages.component';


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
export class HomeRoutingModule { }
