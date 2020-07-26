import { Component, OnInit, Input, HostListener, OnChanges, SimpleChanges } from '@angular/core';

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
export class AboutComponent implements OnInit, OnChanges{
  currentConvId: string;
  messageImage: FileModel[];
  messageFile: FileModel[];
  showImg = false;
  showFile = false;
  imageId: string;
  showAllFiles = false;
  showAllImages = false;

  @Input() userContact: User;
  @Input() sendFile: boolean;

  constructor(
    private fileService: FileService,
    private route: ActivatedRoute,
    private dataTranferService: DataTranferService
  ) {
  }


  ngOnChanges(): void {
    if(this.sendFile == true) {
      //lắng nghe khi bên gửi tin nhắn là file
      this.getData();
    }
  }

  ngOnInit(): void {

    //khi route thay đổi thì đồng thời get dữ liệu file theo cuộc trò chuyện tương ứng
    this.route.params.subscribe(val => {
      this.currentConvId = val['id'];
      this.getData();
    });
  }


  /**
   * lấy dữ liệu file và ảnh khi load message
   */
  getData() {
    if(this.showAllFiles) this.showAllFile();
    else this.fileService.getSomeFile(this.currentConvId).subscribe(data => this.messageFile = data);

    if(this.showAllImages) this.showAllImage();
    else this.fileService.getSomeImage(this.currentConvId).subscribe(data => this.messageImage = data);
  }

  showAllFile() {
    this.showAllFiles = true;
    this.fileService.getAllFile(this.currentConvId).subscribe(data => this.messageFile = data);
  }

  showAllImage() {
    this.showAllImages = true;
    this.fileService.getAllImage(this.currentConvId).subscribe(data => this.messageImage = data);
  }

  /**
   * hiển thị danh sách image đã chia sẻ
   */
  showImages() {
    this.showImg = !this.showImg;
  }

  /**
   * hiển thị danh sách file đã chia sẻ
   */
  showFiles() {
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
