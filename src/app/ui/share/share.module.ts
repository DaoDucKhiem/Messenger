import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AvatarModule } from 'ngx-avatar';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    AvatarModule,
    ReactiveFormsModule,
  ],
  exports: [NavbarComponent]
})
export class ShareModule { }
