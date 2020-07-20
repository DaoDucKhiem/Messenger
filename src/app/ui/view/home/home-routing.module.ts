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
        path: '', redirectTo: 'conversation/conv-vn-1-NO20OWUHMD-1594421839380', pathMatch: 'full'
      },
      {
        path: 'conversation', redirectTo: 'conversation/conv-vn-1-NO20OWUHMD-1594421839380', pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
