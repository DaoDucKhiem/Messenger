import { Component, OnInit, Input } from '@angular/core';

import { AccountService } from 'src/app/service/account.service';
import { User } from 'src/app/model/user-login';
import { StringeeService } from 'src/app/service/stringee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-conversations',
  templateUrl: './list-conversations.component.html',
  styleUrls: ['./list-conversations.component.scss']
})
export class ListConversationsComponent implements OnInit {

  @Input() conversations: any;
  contacts: User[];

  findContact: boolean;
  placeHolderSearch: string;

  currentConvId: string;
  currentUserId: string;

  constructor(
    private accountService: AccountService,
    private stringeeService: StringeeService,
    private route: ActivatedRoute
  ) {
    this.findContact = false; //ban đầu sẽ hiển thị danh sách các cuộc hội thoại
    this.currentUserId = this.accountService.userValue.id; //id của người đã đăng nhập lấy từ account Service
  }

  ngOnInit(): void {
    this.getPlaceHolder();

    this.getConversationId();

    // this.stringeeService.stringeeClient.on('connect', () => {
    //   console.log("+++connected");
    //   this.getConversations();
    // });
    // this.getConversations();

    //cập nhật last message khi người dùng gửi tin nhắn
    this.stringeeService.sendMessage.subscribe(data => {
      this.getConversations();
    });

  }

  /**
   * chuyển đổi placeholder trên thanh tìm kiếm cho đúng mục đích
   */
  getPlaceHolder() {
    this.placeHolderSearch = this.findContact ? "Tìm kiếm danh bạ" : "Tìm kiếm cuộc trò chuyện";
  }

  /**
   * lấy id của route để add focus conversation
   * cập nhật khi id thay đổi
   */
  getConversationId() {
    this.route.params.subscribe(val => {
      this.currentConvId = val['id'];
    });
  }

  /**
   * lấy danh sách user trên server
   */
  getContactList() {
    this.accountService.getAll().subscribe(contacts => { this.contacts = contacts; })
  }


  /**
   * update last message của conversation khi click
   * @param conversation 
   */
  onSelect(conv: any) {
    
    this.stringeeService.stringeeChat.markConversationAsRead(conv.id);
    conv.unreadCount = 0;

    for(let parti of conv.participants) {
      if(parti.userId != this.currentUserId) {
        //nếu không phải là id của contact, truyền sang cho message component
        this.stringeeService.changeSelectConversation(parti.userId);
        break;
      }
    }
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
    this.getContactList();
  }

  /**
   * nếu ở cuộc trò chuyện => tìm kiếm conversation
   * không thì sẽ tìm kiếm contact trong danh bạ
   */
  searchTerm: any;

  search(): void {
    let term = this.searchTerm;
    if (!this.findContact) {
      // this.conversations = this.conversationsCopy.filter(function (tag) {
      //   return tag.contactName.toLowerCase().indexOf(term.toLowerCase()) >= 0;
      // });
    }
    else {
      //tìm kiếm người trò chuyện
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
   * hàm tạo cuộc trò chuyện stringee
   * @param id id của contact đã chọn
   * @param name tên của contact đã chọn hoặc bất kỳ
   */
  createConversation(id: string, name: string) {
    this.stringeeService.createConversation(id, name);
  }

  /**
   * lấy conversation trên service stringee
   */
  getConversations() {
    this.stringeeService.getConversations(15, (status: string, code: string, message: string, convs: any) => {
      this.conversations = convs;
      for (let con of convs) {
        if (con.id == this.currentConvId) {
          this.onSelect(con); //lấy conversation hiện tại truyền cho message khi khởi tạo
        }
      }
    });
  }

   /**
   * trả về loại định dạng thời gian để hiển thị 
   * 0:giờ chênh lệch, 1:ngày chênh lệch, 2: ngày 
   * @param data thời gian tạo tin nhắn
   */
  forMatTime(data: number) {
    let diff = this.calculateDiff(data);
    if (diff < 1) {
      return 0;
    }
    else if (diff >= 1 && diff < 8) {
      return 1;
    }
    else {
      return 2;
    }
  }

  /**
   * hàm tính toán chênh lệch 2 khoảng thời gian theo ngày
   * @param data thời gian tạo tin nhắn đơn vị là milisecond
   */
  calculateDiff(data: number) {
    let currentDate = new Date();
    let timeSent = new Date(data);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(timeSent.getFullYear(), timeSent.getMonth(), timeSent.getDate())) / (1000 * 60 * 60 * 24));
  }
}