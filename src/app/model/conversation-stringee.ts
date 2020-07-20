export interface User {
    userId: string;
    userName: string;
    userAvatar: string;
    email: string;
    phone: string;
    status: number; //1: online, 0:offline
    time: Date;
}