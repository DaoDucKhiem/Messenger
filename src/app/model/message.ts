export interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    type: string;
    typeofFile?: string;
    time: string;
    content?: string;
    url?: string;
}