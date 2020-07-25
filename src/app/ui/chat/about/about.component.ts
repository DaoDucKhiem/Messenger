import { Component, OnInit, Input, HostListener } from '@angular/core';

import { FileService } from 'src/app/service/file.service';
import { User } from 'src/app/model/user-login';
import { ActivatedRoute } from '@angular/router';
import { FileModel } from 'src/app/model/file';
import { DataTranferService } from 'src/app/service/data-tranfer.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  currentConvId: string;
  messageImage: FileModel[];
  messageFile: FileModel[];
  showImg = false;
  showFile = false;
  imageId: string;

  @Input() userContact: User;

  constructor(
    private fileService: FileService,
    private route: ActivatedRoute,
    private dataTranferService: DataTranferService
  ) {}

  ngOnInit(): void {

    //khi route thay đổi thì đồng thời get dữ liệu file theo cuộc trò chuyện tương ứng
    this.route.params.subscribe(val => {
      this.currentConvId = val['id'];
      this.getData();
    });

    //lắng nghe khi bên gửi tin nhắn là file
    this.dataTranferService.sendMessageFile.subscribe(() => {
      this.getData();
    });
  }


  /**
   * lấy dữ liệu file và ảnh khi load message
   */
  getData() {
    this.fileService.getAllFile(this.currentConvId).subscribe(data => this.messageFile = data);
    this.fileService.getAllImage(this.currentConvId).subscribe(data => this.messageImage = data);
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
    this.imageId = id;
  }

  /**
   * ẩn modal
   * @param id 
   */
  hideModal(id: string) {
    document.getElementById(id).style.display = 'none';
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.hideModal(this.imageId);
  }
}
