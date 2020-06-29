interface UserStatus {
    status: string;
    time: string;
}

export interface User {
    userId: number;
    userName: string,
    userVatatar: string;
    email: string;
    phone: string;
    userStatus: UserStatus;
}