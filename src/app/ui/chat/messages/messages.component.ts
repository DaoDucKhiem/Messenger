import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public fileShared = [{
    name: "Nội dung hội nghị.pdf",
    url: ""
  }, {
    name: "Quy trình cho nhân viên.pdf",
    url: ""
  }]

  public imageShared = [{
    img: "../../../assets/images/Avatar/1.jpg"
  }, {
    img: "../../../assets/images/Avatar/2.jpg"
  }, {
    img: "../../../assets/images/Avatar/3.jpg"
  }, {
    img: "../../../assets/images/Avatar/4.jpg"
  }, {
    img: "../../../assets/images/Avatar/2.jpg"
  }, {
    img: "../../../assets/images/Avatar/1.jpg"
  }]

  showAb = true;
  showImg = true;
  showFile = true;

  constructor() { }

  ngOnInit(): void {
  }

  showAbout() {
    this.showAb = !this.showAb;
  }

  showAllImg() {
    this.showImg = !this.showImg;
  }

  showAllFile() {
    this.showFile = !this.showFile;
  }

}
