import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Message } from 'src/app/model/message';
import { User } from 'src/app/model/user';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnChanges {

  contactId: number;
  file: Message[];
  messageImage: Message[];
  messageFile: Message[];
  showImg = true;
  showFile = true;

  @Input() userContact: User;
  @Input() newMessageFile: Message; //thêm tin nhắn dạng file

  constructor(private filesShared: FileService) {
  }

  /**
   * bắt sự kiện input thay đổi thì lấy dữ liệu file và image tương ứng
   */
  ngOnChanges(): void {
    this.contactId = this.userContact.userId;
    this.getData();
  }

  ngOnInit(): void {
  }


  getData() {
    this.filesShared.getListMessageFile(this.contactId)
    .subscribe(msf => this.file = msf);


    //tin nhắn mới là file
    if(this.newMessageFile) {
      this.file.push(this.newMessageFile);
    }


    this.messageFile = this.getMessageFile();
    this.messageImage = this.getMessageImage();
  }

  /**
   * lọc message là file trong list message file
   */
  getMessageFile() {
    return this.file.filter(mess => ((mess.type === 1)));
  }

  /**
   * lọc message là image trong list message file
   */
  getMessageImage() {
    return this.file.filter(mess => ((mess.type === 2)));
  }

  /**
   * hiển thị danh sách image đã chia sẻ
   */
  showAllImg() {
    this.showImg = !this.showImg;
  }

  /**
   * hiển thị danh sách file đã chia sẻ
   */
  showAllFile() {
    this.showFile = !this.showFile;
  }

  /**
   * hiện modal
   * @param id 
   */
  showModal(id: string) {
    document.getElementById(id).style.display = 'flex';
  }

  /**
   * ẩn modal
   * @param id 
   */
  hideModal(id: string) {
    document.getElementById(id).style.display = 'none';
  }
}
