import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, HostListener, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StringeeService } from 'src/app/service/stringee.service';

import { User } from 'src/app/model/user-login';
import { FileService } from 'src/app/service/file.service';
import { UsersService } from 'src/app/service/users.service';
import { DataTranferService } from 'src/app/service/data-tranfer.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {

  @Input() Messages: any; //lưu trữ các tin nhắn của cuộc trò chuyện

  currentConvId: string;
  currentUser: User;
  currentContact: User;

  showAb = true;
  modalImageSource = false;
  imageId: string;

  constructor(
    private route: ActivatedRoute,
    private stringeeService: StringeeService,
    private usersService: UsersService,
    private fileService: FileService,
    private dataTranferService: DataTranferService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    route.params.subscribe(val => {
      this.currentConvId = val['id'];

      //lấy tin nhắn theo url
      this.getMessages(this.currentConvId);

      //lấy currentContactId từ bên list truyền sang hoặc reload truyền sang đồng thời lấy messages
      this.getContactUser();

    });
  }

  ngOnInit(): void {
  }

  //auto scroll
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  private scrollContainer: any;
  private items = [];

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame?.nativeElement;
    this.itemElements.changes.subscribe(_ => this.scrollToBottom());

    // Add a new item every 2 seconds
    setInterval(() => {
      this.items.push({});
    }, 1000);
  }

  private scrollToBottom(): void {
    this.scrollContainer?.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  /**
   * hiển thị hoặc ẩn about component
   */
  showAbout() {
    this.showAb = !this.showAb;
  }

  //lấy contact user id truyền sang từ list conversation đồng thời gọi lên server để lấy thông tin
  getContactUser() {
    this.dataTranferService.contactId.subscribe((data: string) => {
      this.usersService.getById(data).subscribe(val => {
        //lấy thông tin contact
        this.currentContact = val;
      });
    });
  }

  /**
   * lấy message của cuộc trò chuyện
   * @param id id của cuộc trò chuyện
   */
  getMessages(id: string): void {
    this.stringeeService.getMessages(id, (status, code, message, msgs) => {
      this.Messages = msgs;
      this.dataTranferService.sendMessageActive();
    });
  }

  /**
   * hiển thị trạng thái của người đang trò chuyện
   */
  // contactStatus() {
  //   if (this.userContact.status === 1) {
  //     this.userStatus = 'Đang hoạt động';
  //   }
  //   else {
  //     let date = new Date();
  //     let timeUserActive = new Date(this.userContact.time);

  //     let diff = Math.floor((date.getTime() - timeUserActive.getTime()) / 60000);

  //     if (diff < 60) {
  //       this.userStatus = 'Hoạt động ' + diff + ' phút trước';
  //     }
  //     else if (diff / 60 < 24) {
  //       this.userStatus = 'Hoạt động ' + Math.floor(diff / 60) + ' giờ trước';
  //     }
  //     else {
  //       this.userStatus = 'Hoạt động ' + Math.floor(diff / 1440) + ' ngày trước';
  //     }
  //   }
  // }

  /**
   * clear input gửi message
   */
  @ViewChild('box') box: ElementRef;

  clear() {
    this.box.nativeElement.value = "";
  }

  /**
   * gửi message text bắt sự kiện nhấn enter
   * @param val 
   */
  onEnter(val: string): void {
    if (val != '') {
      var txtMsg = {
        type: 1,
        convId: this.currentConvId,
        message: {
          content: val,
        }
      };

      //gọi service stringee gửi message file
      this.stringeeService.stringeeChat.sendMessage(txtMsg, (status, code, message, msg) => {
        this.dataTranferService.sendMessageActive();
      });
    }
    this.clear();
  }

  /**
   * gửi all file
   * type: 5_file, 2_ảnh, 
   * @param imageInput 
   */
  selectedFile: ImageSnippet;

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    let fileType: number;
    let type_of_file: number;

    switch (imageInput.files[0].name.split(".").pop()) {
      case 'png': case 'jpg': case 'gif': case 'PNG': case 'JPG': case 'GIF': {
        fileType = 2;
        break;
      }

      case 'doc': {
        fileType = 5;
        type_of_file = 1;
        break;
      }

      case 'docx': {
        fileType = 5;
        type_of_file = 1;
        break;
      }

      case 'pdf': {
        fileType = 5;
        type_of_file = 0;
        break;
      }

      case 'ppt': case 'pptx': {
        fileType = 5;
        type_of_file = 2;
        break;
      }

      default: {
        fileType = 5;
        type_of_file = 2;
        break;
      }
    }

    const read = new FileReader();

    read.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      if (this.selectedFile) {
        var formData = new FormData();
        formData.set('file', file);

        this.fileService.uploadFile(formData).subscribe(res => {
          //nếu là gửi ảnh
          if(fileType == 2) {
            this.stringeeService.sendPhoto(this.currentConvId, res.filename);
          }

          //nếu là gửi file
          if(fileType == 5) {
            this.stringeeService.sendFile(
              this.currentConvId, 
              this.selectedFile.file.name, 
              res.filename,
              file.size,
              type_of_file
              );
          }

          //bắn tín hiệu gửi file cho bên about để cập nhật thông tin
          this.dataTranferService.sendMessageFileActive();
        });
      }
    });

    read.readAsDataURL(file);
  }

  // onNewLine(val: string): string {
  //   return val + '\n';
  // }

  /**
   * hiện modal message image
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

  //mở file hoặc download file
  openFile(url: string) {
    window.open(url, '');
  }

  //nghe sự kiện khi nhấn ESC ẩn image modal
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.hideModal(this.imageId);
  }

}
