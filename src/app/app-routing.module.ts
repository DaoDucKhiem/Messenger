import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { SigninComponent } from './ui/test/signin/signin.component';


const routes: Routes = [

  { path: 'signin', component: SigninComponent},
  { path: 'home', loadChildren: () => import('./ui/test/test.module').then(m => m.TestModule) },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
