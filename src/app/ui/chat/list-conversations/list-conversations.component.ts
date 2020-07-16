import { Component, OnInit } from '@angular/core';

import { Conversation } from '../../../model/conversation';
import { ConversationService } from '../../../service/conversation.service';
import { MessagedetailService } from 'src/app/service/messagedetail.service';
import { AccountService } from 'src/app/service/account.service';
import { User } from 'src/app/model/user-login';

@Component({
  selector: 'app-list-conversations',
  templateUrl: './list-conversations.component.html',
  styleUrls: ['./list-conversations.component.scss']
})
export class ListConversationsComponent implements OnInit {

  conversations: Conversation[];
  conversationsCopy: Conversation[];
  contacts: User[];
  contactsCopy: User[];
  onSelectConversationId: number;
  findContact: boolean;
  placeHolderSearch: string;

  constructor(private conversationService: ConversationService, private accountService: AccountService, private messagedetail: MessagedetailService) {
    this.getConversationId();
    this.getContactList();
    this.findContact = false;
  }

  ngOnInit(): void {
    this.getConversations();
    this.getPlaceHolder();
    // update message status
    this.updateLastMessageStatus();
  }

  getPlaceHolder() {
    this.placeHolderSearch = this.findContact ? "Tìm kiếm danh bạ" : "Tìm kiếm cuộc trò chuyện";
  }

  /**
   * lấy id của route để add focus conversation
   * cập nhật khi id thay đổi
   */
  getConversationId() {
    this.messagedetail.conversationId.subscribe((data: number) => {
      this.onSelectConversationId = +data;
    })
  }

  getContactList() {
    this.accountService.getAll().subscribe(contacts => this.contacts = contacts);
    this.contactsCopy = this.contacts;
  }

  /**
   * update last message status lhi load vào lần đầu
   */
  updateLastMessageStatus() {
    const found = this.conversations.find(item => item.contactId == this.onSelectConversationId);
    let index = this.conversations.indexOf(found);
    this.conversations[index].lastMessageStatus = 1;
  }

  /**
   * update last message của conversation khi click
   * @param conversation 
   */
  onSelect(conversation: Conversation): void {
    let index = this.conversations.indexOf(conversation);
    this.conversations[index].lastMessageStatus = 1;
  }

  /**
   * lấy danh sách các conversation từ service
   */
  getConversations(): void {
    this.conversationService.getConversations()
      .subscribe(conversations => this.conversations = conversations);
    this.conversationsCopy = this.conversations;
  }

  /**
   * nếu người dùng chọn lấy danh sách cuộc trò chuyện
   */
  selectedConversations() {
    this.findContact = false;
    this.getPlaceHolder();
  }

  /**
   * nếu người dùng chọn lấy danh sách danh bạ
   */
  selectedContacts() {
    this.findContact = true;
    this.getPlaceHolder();
  }

  /**
   * nếu ở cuộc trò chuyện => tìm kiếm conversation
   * không thì sẽ tìm kiếm contact trong danh bạ
   */
  searchTerm: any;

  search(): void {
    let term = this.searchTerm;
    if (!this.findContact) {
      this.conversations = this.conversationsCopy.filter(function (tag) {
        return tag.contactName.toLowerCase().indexOf(term.toLowerCase()) >= 0;
      });
    }
    else {
      this.contacts = this.contactsCopy.filter(function (tag) {
      });
    }
  }

  /**
   * kiểm tra trạng thái contact user online hay offline
   * status: 0-offline, 1-online
   * @param status 
   */
  checkOnline(status: number) {
    return status === 1;
  }

  /**
   * tính lượng thời gian chênh lệch so với hiện tại
   * @param data 
   */
  calculateDiff(data: Date) {
    let currentDate = new Date();
    data = new Date(data);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(data.getFullYear(), data.getMonth(), data.getDate())) / (1000 * 60 * 60 * 24));
  }

  /**
   * trả về loại định dạng thời gian để hiển thị 
   * 0:giờ chênh lệch, 1:ngày chênh lệch, 2: ngày 
   * @param data 
   */
  forMatTime(data: Date) {
    let diff = this.calculateDiff(data);
    if (diff <= 1) {
      return 0;
    }
    else if (diff > 1 && diff < 8) {
      return 1;
    }
    else {
      return 2;
    }
  }
}