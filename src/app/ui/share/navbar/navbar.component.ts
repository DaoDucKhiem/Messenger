import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any;

  constructor(private accountService: AccountService) { 
    this.user = accountService.userValue;
    console.log(this.user.fullName);
  }

  ngOnInit(): void {
  }

}
