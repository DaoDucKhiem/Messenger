import { User } from '../model/user';

export const listUser: User[] =  [
    {
        userId: 1,
        userName: 'Trung Trần',
        userVatatar: './assets/images/Avatar/1.jpg',
        email: 'trungtt@gmail.com',
        phone: '0965 452 125',
        userStatus:
            {
                status: "online",
                time: "10/10/2020 13:21:56",
            }
    },
    {
        userId: 2,
        userName: 'Hoàng Cao Phi',
        userVatatar: './assets/images/Avatar/2.jpg',
        email: 'phihc@gmail.com',
        phone: '0883 123 456',
        userStatus:
            {
                status: "online",
                time: "9/10/2020 9:21:56",
            }
    },
    {
        userId: 3,
        userName: 'Trần Hải Dương',
        userVatatar: './assets/images/Avatar/3.jpg',
        email: 'duonght@gmail.com',
        phone: '0123 456 789',
        userStatus:
            {
                status: "offline",
                time: "10/10/2020 7:51:56",
            }
    },
    {
        userId: 4,
        userName: 'Đỗ Xuân Dũng',
        userVatatar: './assets/images/Avatar/4.jpg',
        email: 'dungdx@gmail.com',
        phone: '0942 789 101',
        userStatus:
            {
                status: "offline",
                time: "10/10/2020 12:31:02",
            }
    },
    {
        userId: 5,
        userName: 'Nguyễn Văn Minh',
        userVatatar: './assets/images/Avatar/5.jpg',
        email: 'minhnv@gmail.com',
        phone: '0965 389 456',
        userStatus:
            {
                status: "online",
                time: "10/10/2020 5:56:18",
            }
    }
]