import { MessageDetail } from './message-detail';

export const messageDetail: MessageDetail[] = [
    {   
        userId: 1,
        userName: 'Trung Trần',
        userAvatar: './assets/images/Avatar/1.jpg',
        email: 'trungtt@gmail.com',
        phone: '0965 452 125',
        status: 'online',
        time: "10/10/2020 13:21:56",
        listMessage: [
            {
                id: 1,
                senderId: 1,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:40:32',
                content: 'nay đi đá bóng em nhé'
            },
            {
                id: 2,
                senderId: 10,
                receiverId: 1,
                type: 'text',
                time: '10/10/2020 9:41:30',
                content: 'ok anh'
            },
            {
                id: 3,
                senderId: 1,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:42:30',
                content: 'sân 1 PVĐ'
            },
            {
                id: 4,
                senderId: 1,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:43:10',
                content: 'đúng giờ nha'
            },
            {
                id: 5,
                senderId: 10,
                receiverId: 1,
                type: 'text',
                time: '10/10/2020 9:45:10',
                content: 'chơi luôn'
            },
        ],
        fileShared: [
            {
                fileName: 'Nội dung hội nghị.pdf',
                type: 'pdf'
            },
            {
                fileName: 'Quy trình cho nhân viên.pdf',
                type: 'pdf'
            }
        ],
        imageShared: [
            {
                url: '../assets/images/Avatar/1.jpg'
            },
            {
                url: '../assets/images/Avatar/2.jpg'
            },
            {
                url: '../assets/images/Avatar/3.jpg'
            },
            {
                url: '../assets/images/Avatar/4.jpg'
            },
            {
                url: '../assets/images/Avatar/2.jpg'
            },
            {
                url: '../assets/images/Avatar/3.jpg'
            },
        ]
    },
    {   
        userId: 2,
        userName: 'Hoàng Cao Phi',
        userAvatar: './assets/images/Avatar/2.jpg',
        email: 'phihc@gmail.com',
        phone: '0883 123 456',
        status: 'online',
        time: "9/10/2020 9:21:56",
        listMessage: [
            {
                id: 1,
                senderId: 10,
                receiverId: 2,
                type: 'text',
                time: '10/10/2020 9:40:32',
                content: 'hello'
            },
            {
                id: 2,
                senderId: 2,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:41:30',
                content: 'hi'
            },
            {
                id: 3,
                senderId: 10,
                receiverId: 2,
                type: 'text',
                time: '10/10/2020 9:42:30',
                content: 'fix bug chưa'
            },
            {
                id: 4,
                senderId: 2,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:43:10',
                content: 'xong rồi nhá'
            },
        ],
        fileShared: [
            {
                fileName: 'tài liệu 1.pdf',
                type: 'pdf'
            },
            {
                fileName: 'angular.pdf',
                type: 'pdf'
            },
            {
                fileName: 'bảng điểm.pdf',
                type: 'pdf'
            },
            {
                fileName: 'test.pdf',
                type: 'pdf'
            }
        ],
        imageShared: [
            {
                url: '../assets/images/Avatar/1.jpg'
            },
            {
                url: '../assets/images/Avatar/2.jpg'
            },
        ]
    },
    {   
        userId: 3,
        userName: 'Trần Hải Dương',
        userAvatar: './assets/images/Avatar/3.jpg',
        email: 'duonght@gmail.com',
        phone: '0123 456 789',
        status: 'offline',
        time: "10/10/2020 7:51:56",
        listMessage: [
            {
                id: 1,
                senderId: 3,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:40:32',
                content: 'mấy giờ đi học'
            },
            {
                id: 2,
                senderId: 10,
                receiverId: 3,
                type: 'text',
                time: '10/10/2020 9:41:30',
                content: '7h'
            },
            {
                id: 3,
                senderId: 3,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:42:30',
                content: 'ok'
            },
        ],
        fileShared: [
            {
                fileName: 'đá bóng.pdf',
                type: 'pdf'
            },
        ],
        imageShared: []
    },
    {   
        userId: 4,
        userName: 'Đỗ Xuân Dũng',
        userAvatar: './assets/images/Avatar/4.jpg',
        email: 'dungdx@gmail.com',
        phone: '0942 789 101',
        status: 'offline',
        time: "10/10/2020 12:31:02",
        listMessage: [
            {
                id: 1,
                senderId: 10,
                receiverId: 4,
                type: 'text',
                time: '10/10/2020 9:40:32',
                content: 'còn bug không'
            },
            {
                id: 2,
                senderId: 4,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:41:30',
                content: 'nhiều vãi'
            },
            {
                id: 3,
                senderId: 10,
                receiverId: 4,
                type: 'text',
                time: '10/10/2020 9:42:30',
                content: 'ok mai mang máy đi sửa'
            },
            {
                id: 4,
                senderId: 10,
                receiverId: 4,
                type: 'text',
                time: '10/10/2020 9:43:10',
                content: 'mang cả sạc máy đi nha'
            },
            {
                id: 5,
                senderId: 4,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:45:10',
                content: 'ukm'
            },
        ],
        fileShared: [],
        imageShared: [
            {
                url: '../assets/images/Avatar/1.jpg'
            },
            {
                url: '../assets/images/Avatar/2.jpg'
            },
            {
                url: '../assets/images/Avatar/3.jpg'
            },
            {
                url: '../assets/images/Avatar/4.jpg'
            },
            {
                url: '../assets/images/Avatar/2.jpg'
            },
            {
                url: '../assets/images/Avatar/3.jpg'
            },
            {
                url: '../assets/images/Avatar/3.jpg'
            },
            {
                url: '../assets/images/Avatar/4.jpg'
            },
            {
                url: '../assets/images/Avatar/2.jpg'
            },
        ]
    },
    {   
        userId: 5,
        userName: 'Nguyễn Văn Minh',
        userAvatar: './assets/images/Avatar/2.jpg',
        email: 'minhnv@gmail.com',
        phone: '0965 389 456',
        status: 'online',
        time: "10/10/2020 5:56:18",
        listMessage: [
            {
                id: 1,
                senderId: 5,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:40:32',
                content: 'chào'
            },
            {
                id: 2,
                senderId: 5,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:41:30',
                content: 'tin nhắn làm quen'
            },
            {
                id: 3,
                senderId: 5,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:42:30',
                content: 'tin nhắn test 1'
            },
            {
                id: 4,
                senderId: 5,
                receiverId: 10,
                type: 'text',
                time: '10/10/2020 9:43:10',
                content: 'tin nhắn test 2'
            },
            {
                id: 5,
                senderId: 10,
                receiverId: 5,
                type: 'text',
                time: '10/10/2020 9:45:10',
                content: 'ok'
            },
        ],
        fileShared: [
            {
                fileName: 'Nội dung hội nghị.pdf',
                type: 'pdf'
            },
            {
                fileName: 'Quy trình cho nhân viên.pdf',
                type: 'pdf'
            },
            {
                fileName: 'Nội dung.pdf',
                type: 'pdf'
            },
            {
                fileName: 'Quy trình.pdf',
                type: 'pdf'
            }
        ],
        imageShared: [
            {
                url: '../assets/images/Avatar/1.jpg'
            },
        ]
    },
]