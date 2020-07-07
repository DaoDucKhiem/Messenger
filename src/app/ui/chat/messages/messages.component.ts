import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserProfileService } from '../../../service/user-profile.service';
import { User } from '../../../model/user';

import { MessagedetailService } from '../../../service/messagedetail.service';
import { Message } from '../../../model/message';

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit{
  userContact: User;
  Messages: Message[];
  currentUserId = 10;
  messageSend: any;
  userStatus: string;
  messageFile: Message;
  
  showAb = true;
  modalImageSource = false;

  constructor(private route: ActivatedRoute, private userService: UserProfileService, private messagedetail: MessagedetailService) {
    route.params.subscribe(val => {
      this.messagedetail.changeConversation(val['id']);
      this.getConversation();
      this.contactStatus();
    })
  }

  ngOnInit(): void {
    this.getConversation();
    this.contactStatus();
  }

  //auto scroll
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  
  private scrollContainer: any;
  private items = [];

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;  
    this.itemElements.changes.subscribe(_ => this.scrollToBottom());    

    // Add a new item every 2 seconds
    setInterval(() => {
      this.items.push({});
    }, 2000);
  }
  
  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  showAbout() {
    this.showAb = !this.showAb;
  }

  getConversation(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.userService.getUser(id)
      .subscribe(user => this.userContact = user);

    this.messagedetail.getMessages(id)
      .subscribe(ms => this.Messages = ms);
  }

  @ViewChild('box') box: ElementRef;

  /**
   * clear input gửi message
   */
  clear() {
    this.box.nativeElement.value = "";
  }

  /**
   * gửi message text bắt sự kiện nhấn enter
   * @param val 
   */
  onEnter(val: any): void {
    this.messageSend = val;
    let newMess: Message = {
      id: this.Messages.length + 1,
      senderId: this.currentUserId,
      receiverId: this.userContact.userId,
      type: 0,
      time: new Date(),
      content: this.messageSend
    };

    this.Messages.push(newMess);

    this.clear();
  }

  /**
   * gửi all file
   * @param imageInput 
   */
  selectedFile: ImageSnippet;

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    let fileName = imageInput.files[0].name;
    let fileType: number;
    let type_of_file: number;

    switch (imageInput.files[0].name.split(".").pop()) {
      case 'png': case 'jpg': case 'gif': {
        fileType = 2;
        break;
      }

      case 'doc': {
        fileType = 1;
        type_of_file = 1;
        break;
      }

      case 'docx': {
        fileType = 1;
        type_of_file = 1;
        break;
      }

      case 'pdf': {
        fileType = 1;
        type_of_file = 0;
        break;
      }

      case 'ppt': case 'pptx': {
        fileType = 1;
        type_of_file = 2;
        break;
      }

      default: {
        fileType = 1;
        type_of_file = 2;
        break;
      }
    }

    const read = new FileReader();

    read.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      if (this.selectedFile) {
        let newMess: Message = {
          id: this.Messages.length + 1,
          senderId: this.currentUserId,
          receiverId: this.userContact.userId,
          content: fileName,
          type: fileType,
          typeofFile: type_of_file,
          time: new Date(),
          url: this.selectedFile.src.toString()
        };

        this.Messages.push(newMess);
        this.messageFile = newMess;
      }
    });

    read.readAsDataURL(file);
  }

  /**
   * hiển thị trạng thái của người đang trò chuyện
   */
  contactStatus() {
    if(this.userContact.status === 1) {
      this.userStatus = 'Đang hoạt động';
    }
    else {
      let date = new Date();
      let timeUserActive = new Date(this.userContact.time);

      let diff = Math.floor((date.getTime() - timeUserActive.getTime())/60000);

      if(diff < 60) {
        this.userStatus = 'Hoạt động '+diff+' phút trước';
      }
      else if(diff/60 < 24) {
        this.userStatus = 'Hoạt động '+Math.floor(diff/60)+' giờ trước';
      }
      else {
        this.userStatus = 'Hoạt động '+Math.floor(diff/1440)+' ngày trước';
      }
    }
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
