import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { User } from 'src/app/model/user-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(private accountService: AccountService) { 
    this.user = accountService.userValue;
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
  }
}
