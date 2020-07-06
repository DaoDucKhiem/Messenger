import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserProfileService } from '../../../service/user-profile.service';
import { User } from '../../../model/user';

import { MessagedetailService } from '../../../service/messagedetail.service';
import { Message } from '../../../model/message';
import { FileService } from 'src/app/service/file.service';

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
  MessageFile: Message[];
  currentUserId = 10;
  messageSend: any;
  userStatus: string;

  showAb = true;
  showImg = true;
  showFile = true;
  modalImageSource = false;

  constructor(private route: ActivatedRoute, private userService: UserProfileService, private messagedetail: MessagedetailService, private filesShared: FileService) {
    route.params.subscribe(val => {
      this.ChangData(val['id']);
      this.getConversation();
      this.contactStatus();
    })
  }

  ngOnInit(): void {
    this.getConversation();
    this.contactStatus();
  }

  ChangData(id: number){
    this.messagedetail.changeConversation(id);
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

  showAllImg() {
    this.showImg = !this.showImg;
  }

  showAllFile() {
    this.showFile = !this.showFile;
  }

  getConversation(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.userService.getUser(id)
      .subscribe(user => this.userContact = user);

    this.messagedetail.getMessages(id)
      .subscribe(ms => this.Messages = ms);

    this.filesShared.getListMessageFile(id)
      .subscribe(msf => this.MessageFile = msf);
  }

  getMessageFile() {
    return this.MessageFile.filter(mess => ((mess.type === 'file')));
  }

  getMessageImage() {
    return this.MessageFile.filter(mess => mess.type === 'image');
  }

  @ViewChild('box') box: ElementRef;

  clear() {
    this.box.nativeElement.value = "";
  }

  onEnter(val: any): void {
    this.messageSend = val;
    let newMess: Message = {
      id: this.Messages.length + 1,
      senderId: this.currentUserId,
      receiverId: this.userContact.userId,
      type: 'text',
      time: Date(),
      content: this.messageSend
    };

    this.Messages.push(newMess);

    this.clear();
  }

  //show modal image
  showModal(id: string) {
    document.getElementById(id).style.display = 'flex';
  }

  //hide modal image
  hideModal(id: string) {
    document.getElementById(id).style.display = 'none';
  }

  selectedFile: ImageSnippet;

  //send image
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    let fileName = imageInput.files[0].name;
    let fileType: string;
    let type_of_file: string = '';

    switch (imageInput.files[0].name.split(".").pop()) {
      case 'png': case 'jpg': case 'gif': {
        fileType = 'image';
        break;
      }

      case 'doc': {
        fileType = 'file';
        type_of_file = 'docx';
        break;
      }

      case 'docx': {
        fileType = 'file';
        type_of_file = 'docx';
        break;
      }

      case 'pdf': {
        fileType = 'file';
        type_of_file = 'pdf';
        break;
      }

      case 'ppt': case 'pptx': {
        fileType = 'file';
        type_of_file = 'pptx';
        break;
      }

      default: {
        fileType = 'file';
        type_of_file = 'pptx';
        break;
      }
    }

    const read = new FileReader();

    read.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      if (this.selectedFile) {
        let newMess: Message = {
          id: this.MessageFile.length + 1,
          senderId: this.currentUserId,
          receiverId: this.userContact.userId,
          content: fileName,
          type: fileType,
          typeofFile: type_of_file,
          time: Date(),
          url: this.selectedFile.src.toString()
        };

        this.Messages.push(newMess);
        this.MessageFile.push(newMess);
      }
    });

    read.readAsDataURL(file);
  }

  contactStatus() {
    if(this.userContact.status == 'online') {
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

}
