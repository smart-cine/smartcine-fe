import { type TFilm } from '@/core/film/film.type';

export const films: TFilm[] = [
  {
    id: '1',
    title: 'Điềm Báo Của Quỷ',
    director: 'Nguyễn Văn A',
    country: 'Việt Nam',
    tags: ['Kinh Dị'],
    duration: 150,
    release_date: new Date('2022-04-02'),
    language: 'vi',
    restrict_age: 18,
    picture_url: '/film_picture/1.jpg',
    trailer_url: 'https://youtu.be/GTupBD8M3yw',
    description:
      'Tiếp nối những sự kiện trong phần ba Despicable Me 3 (2017), giờ đây Gru đã hoàn lương, hạn chế tham gia các hoạt động phi pháp. Ngoài vợ Lucy Wilde và các cô con gái nuôi Margo, Edith, Agnes, giờ đây gia đình Gru còn đón thêm thành viên mới là nhóc tì Gru Junior - con trai đầu lòng của anh. Tuy nhiên, sự an toàn của gia đình Gru nhanh chóng bị đe dọa khi kẻ thù cũ của anh là Maxime Le Mal đã trốn khỏi nhà tù, hắn lên kế hoạch trả thù và thanh toán nợ cũ với Gru. Đồng hành với Maxime còn có người yêu Valentina của gã. Do đó, Gru buộc phải đứng lên đối mặt với kẻ thù để bảo vệ gia đình và các Minions.',
  },
  {
    id: '2',
    title: 'Những Kẻ Trở Lại',
    director: 'Nguyễn Văn B',
    country: 'Việt Nam',
    tags: ['Hành Động'],
    duration: 150,
    release_date: new Date('2022-04-02'),
    language: 'vi',
    restrict_age: 16,
    picture_url: '/film_picture/2.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Những Kẻ Trở Lại là một bộ phim hành động Việt Nam do Nguyễn Văn B làm đạo diễn. Phim được công chiếu vào ngày 2 tháng 4 năm 2022.',
  },
  {
    id: '3',
    title: 'Cuộc Phiêu Lưu Của Lý Tiểu Long',
    director: 'Nguyễn Văn C',
    country: 'Việt Nam',
    tags: ['Phiêu Lưu'],
    duration: 150,
    release_date: new Date('2022-04-02'),
    language: 'vi',
    restrict_age: 16,
    picture_url: '/film_picture/3.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=J7qyfNhjGuw',
    description:
      'Cuộc Phiêu Lưu Của Lý Tiểu Long là một bộ phim phiêu lưu Việt Nam do Nguyễn Văn C làm đạo diễn. Phim được công chiếu vào ngày 2 tháng 4 năm 2022.',
  },
  {
    id: '4',
    title: 'Bí Mật Của Bóng Đêm',
    director: 'Nguyễn Văn D',
    country: 'Việt Nam',
    tags: ['Bí Ẩn'],
    duration: 150,
    release_date: new Date('2022-04-02'),
    language: 'vi',
    restrict_age: 13,
    picture_url: '/film_picture/4.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=5xLbL7Zo3_A',
    description:
      'Bí Mật Của Bóng Đêm là một bộ phim bí ẩn Việt Nam do Nguyễn Văn D làm đạo diễn. Phim được công chiếu vào ngày 2 tháng 4 năm 2022.',
  },
  {
    id: '5',
    title: 'Sự Im Lặng Của Lâm Gia Đống',
    director: 'Nguyễn Văn E',
    country: 'Việt Nam',
    tags: ['Tâm Lý'],
    duration: 150,
    release_date: new Date('2022-04-02'),
    language: 'vi',
    restrict_age: 13,
    picture_url: '/film_picture/5.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=u9hN6tfdQ2A',
    description:
      'Sự Im Lặng Của Lâm Gia Đống là một bộ phim tâm lý Việt Nam do Nguyễn Văn E làm đạo diễn. Phim được công chiếu vào ngày 2 tháng 4 năm 2022.',
  },
  {
    id: '6',
    title: 'Những Kẻ Khờ Mộng',
    director: 'Nguyễn Văn F',
    country: 'Việt Nam',
    tags: ['Hài Hước'],
    duration: 150,
    release_date: new Date('2022-04-02'),
    language: 'vi',
    restrict_age: 13,
    picture_url: '/film_picture/6.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=9RC8SwvJIxM',
    description:
      'Những Kẻ Khờ Mộng là một bộ phim hài hước Việt Nam do Nguyễn Văn F làm đạo diễn. Phim được công chiếu vào ngày 2 tháng 4 năm 2022.',
  },
  {
    id: '7',
    title: 'Among Us',
    director: 'Innersloth',
    country: 'United States',
    tags: [
      'SUS',
      'Social Deduction',
      'Online Multiplayer',
      'Co-op',
      'Indie',
      'impostor',
    ],
    duration: 0, // Update with the actual duration if known
    release_date: new Date('2018-06-15'), // Update with the actual release date
    language: 'en', // Update with the appropriate language code
    restrict_age: 10, // Update with the appropriate age restriction
    picture_url: '/film_picture/7.jpg', // Update with the actual picture URL
    trailer_url: 'https://www.youtube.com/watch?v=NSQZqzhJIM4', // Update with the actual trailer URL
    description:
      'Among Us is a 2018 online multiplayer social deduction game developed and published by American game studio Innersloth. The game allows for cross-platform play; it was released on iOS and Android devices in June 2018 and on Windows later that year in November.',
  },
  {
    id: '8',
    title: 'The squirt game',
    director: 'Hwang Dong-hyuk',
    country: 'South Korea',
    tags: ['Drama', 'Thriller', 'Mystery'],
    duration: 10000,
    release_date: new Date('2021-09-17'),
    language: 'india',
    restrict_age: 90,
    picture_url: '/film_picture/quishgame.gif',
    trailer_url: 'https://www.youtube.com/watch?v=5xLbL7Zo3_A',
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
  },
];
