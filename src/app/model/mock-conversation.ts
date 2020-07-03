import { Conversation } from './conversation';

export const Conversations: Conversation[] = [
    {
        conversationId: 1,
        contactId: 1,
        contactAvatar: "./assets/images/Avatar/1.jpg",
        contactName: "Trung Trần",
        status: "online",
        time: new Date('2020/7/03 12:40:43'),
        amountNewMessage: 1,
        lastMessage: "nay họp em nhé",
        messageStatus: "not seen"
    }, 
    {
        conversationId: 2,
        contactId: 2,
        contactAvatar: "../assets/images/Avatar/2.jpg",
        contactName: "Hoàng Cao Phi",
        status: "online",
        time: new Date('2020/7/03 12:40:43'),
        lastMessage: "hello",
        messageStatus: "seen"
    }, 
    {
        conversationId: 3,
        contactId: 3,
        contactAvatar: "./assets/images/Avatar/3.jpg",
        contactName: "Trần Hải Dương",
        status: "offline",
        time: new Date('2020/7/02 12:40:43'),
        lastMessage: "nay đi đá bóng không?",
        messageStatus: "seen"
    }, 
    {
        conversationId: 4,
        contactId: 4,
        contactAvatar: "./assets/images/Avatar/4.jpg",
        contactName: "Đỗ Xuân Dũng",
        status: "offline",
        time: new Date('2020/7/01 12:40:43'),
        amountNewMessage: 2,
        lastMessage: "chào bạn",
        messageStatus: "not seen"
    }, 
    {
        conversationId: 5,
        contactId: 5,
        contactAvatar: "./assets/images/Avatar/1.jpg",
        contactName: "Nguyễn Văn Minh",
        status: "online",
        time: new Date('2020/6/21 12:40:43'),
        amountNewMessage: 2,
        lastMessage: "fix bug đi",
        messageStatus: "not seen"
    }, 
]