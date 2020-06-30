export interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    type: string;
    time: string;
    content?: string;
    url?: string;
}