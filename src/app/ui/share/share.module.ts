import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AlertComponent } from './alert/alert.component';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [NavbarComponent, AlertComponent],
  imports: [
    CommonModule,
    AvatarModule
  ],
  exports: [NavbarComponent, AlertComponent]
})
export class ShareModule { }
