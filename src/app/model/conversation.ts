export interface Conversation {
    conversationId: number;
    contactId: number;
    contactAvatar: string;
    contactName: string;
    status: string;
    time: Date;
    amountNewMessage?: number;
    lastMessage: string;
    messageStatus: string;
 }