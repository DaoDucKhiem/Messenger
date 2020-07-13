import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';


const routes: Routes = [

  { path: '', loadChildren: () => import('./ui/view/account/account.module').then(m => m.AccountModule)},
  { path: 'home', loadChildren: () => import('./ui/view/view.module').then(m => m.ViewModule) },
  { path: '', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
