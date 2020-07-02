import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

export class MessagesComponent implements OnInit {
  userContact: User;
  Messages: Message[];
  MessageFile: Message[];
  currentUserId = 10;
  messageSend: any;

  showAb = true;
  showImg = true;
  showFile = true;
  modalImageSource = false;

  constructor(private route: ActivatedRoute, private userService: UserProfileService, private messagedetail: MessagedetailService, private filesShared: FileService) {
    route.params.subscribe(val => {
      this.getConversation();
    })
  }

  ngOnInit(): void {
    this.getConversation();
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
    return this.MessageFile.filter(mess => ((mess.type === 'pdf') || (mess.type === 'word') || (mess.type === 'pptx')));
  }

  getMessageImage(){
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
    document.getElementById(id).style.display = 'block';
  }

  //hide modal image
  hideModal(id: string) {
    document.getElementById(id).style.display = 'none';
  }

  selectedFile: ImageSnippet;

  //send image
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const read = new FileReader();

    read.addEventListener('load', (event: any)=> {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    read.readAsDataURL(file);

    if(this.selectedFile != undefined) {
      let newMess: Message = {
        id: this.MessageFile.length + 1,
        senderId: this.currentUserId,
        receiverId: this.userContact.userId,
        type: 'image',
        time: Date(),
        url: this.selectedFile.src.toString()
      };
  
      this.Messages.push(newMess);
      this.MessageFile.push(newMess);
      console.log(this.MessageFile);
    }
  }

}
