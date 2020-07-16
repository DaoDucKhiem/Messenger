import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';


@NgModule({
  declarations: [AccountComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    ShowHidePasswordModule
  ]
})
export class AccountModule { }
