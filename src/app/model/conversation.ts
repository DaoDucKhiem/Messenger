export interface Conversation {
    contactId: number;
    contactAvatar: string;
    contactName: string;
    status: number;
    time: Date;
    amountNewMessage?: number;
    lastMessage: string;
    lastMessageStatus: number;
 }

 //status online:1, offline:0
 //messageStatus seen:1, not-seen:0