import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './helpers/auth.grand';



const routes: Routes = [

  { path: '', loadChildren: () => import('./ui/view/account/account.module').then(m => m.AccountModule)},
  { path: 'home', loadChildren: () => import('./ui/view/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
