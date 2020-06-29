import { Message } from './message';
import { File } from './file-shared';
import { Image } from './image-shared';

export interface MessageDetail {
    userId: number;
    userName: string,
    userAvatar: string;
    email: string;
    phone: string;
    status: string;
    time: string;
    listMessage: Message[];
    fileShared: File[];
    imageShared: Image[];
}