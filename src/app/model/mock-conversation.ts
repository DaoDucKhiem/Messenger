import { Conversation } from './conversation';

export const Conversations: Conversation[] = [
    {
        contactId: 1,
        contactAvatar: "./assets/images/Avatar/1.jpg",
        contactName: "Trung Trần",
        status: "online",
        time: "12:45",
        amountNewMessage: 1,
        lastMessage: "nay họp em nhé",
        messageStatus: "not seen"
    }, 
    {
        contactId: 2,
        contactAvatar: "../assets/images/Avatar/2.jpg",
        contactName: "Hoàng Cao Phi",
        status: "online",
        time: "7:20",
        lastMessage: "hello",
        messageStatus: "seen"
    }, 
    {
        contactId: 3,
        contactAvatar: "./assets/images/Avatar/3.jpg",
        contactName: "Trần Hải Dương",
        status: "offline",
        time: "10:27",
        lastMessage: "nay đi đá bóng không?",
        messageStatus: "seen"
    }, 
    {
        contactId: 4,
        contactAvatar: "./assets/images/Avatar/4.jpg",
        contactName: "Đỗ Xuân Dũng",
        status: "offline",
        time: "16:49",
        amountNewMessage: 2,
        lastMessage: "chào bạn",
        messageStatus: "not seen"
    }, 
    {
        contactId: 5,
        contactAvatar: "./assets/images/Avatar/1.jpg",
        contactName: "Nguyễn Văn Minh",
        status: "online",
        time: "21:10",
        amountNewMessage: 2,
        lastMessage: "fix bug đi",
        messageStatus: "not seen"
    }, 
]