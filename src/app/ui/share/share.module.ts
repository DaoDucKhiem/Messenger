import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [NavbarComponent, AlertComponent],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent, AlertComponent]
})
export class ShareModule { }
