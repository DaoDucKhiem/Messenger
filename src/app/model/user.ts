export interface User {
    userId: number;
    userName: string;
    userAvatar: string;
    email?: string;
    phone?: string;
    status?: number; //1: online, 0:offline
    time?: Date;
}