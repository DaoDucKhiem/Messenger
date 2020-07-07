export interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    type: number;
    typeofFile?: number;
    time: Date;
    content?: string;
    url?: string;
}

// type: 0=text, 1=file, 2=image
// typeofFile: 0=pdf, 1=doc, 2=pptx

