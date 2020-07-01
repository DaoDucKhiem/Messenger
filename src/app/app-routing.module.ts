import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { SigninComponent } from './ui/view/signin/signin.component';


const routes: Routes = [

  { path: 'signin', component: SigninComponent},
  { path: 'home', loadChildren: () => import('./ui/view/view.module').then(m => m.ViewModule) },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
