import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'conversation/conv-vn-1-NO20OWUHMD-1594421845673',
    pathMatch: 'full'
  },
  {
    path: 'conversation/:id',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
