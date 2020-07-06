import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signup: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  SelectedSignIn() {
    this.signup = false;
  }

  SelectedSignUp() {
    this.signup = true;
  }

  checkLogin() {
    
  }
}
