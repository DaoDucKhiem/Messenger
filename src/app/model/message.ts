export interface Message {
    id: number,
    senderId: number;
    receiverId: number;
    type: any;
    time: any;
    content: string
}