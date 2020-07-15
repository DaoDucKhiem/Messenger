import { Component, OnInit } from '@angular/core';
import { StringeeService } from 'src/app/service/stringee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private stringeeService: StringeeService) { }

  ngOnInit(): void {
    this.stringeeService.connect();
    this.stringeeService.stringeeClient.on('connect', function () {
      console.log('++++++++++++++ connected to StringeeServer');
    });
    this.stringeeService.stringeeClient.on('authen', function (res: any) {
      console.log('authen', res);
    });
  }

}
