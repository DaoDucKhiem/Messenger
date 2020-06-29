export interface Conversation {
    contactId: number;
    contactAvatar: string;
    contactName: string;
    status: string;
    time: string;
    amountNewMessage?: number;
    lastMessage: string;
    messageStatus: string;
 }