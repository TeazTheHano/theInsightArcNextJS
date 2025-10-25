import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      'en-US': {
        common: {
          'about-us': 'About Us',
          'inspiration': 'Inspiration',
          'blog-page': 'Blog',
          'game-page': 'Game',
          'search': 'Search',
          'nav-menu': 'Navigation Menu',
          'test-site': 'Test Site',
          'contact-page': 'Contact',
          'language': 'Language',
          'theme': 'Theme',
          'footer-item-1': 'Crafting digital experiences with passion and precision.',
          'footer-item-2': 'Building the future, one pixel at a time.',
          'title': 'Title',
          'category': 'Category',
          'tags': 'Tags',
          'author': 'Author'
        }
      },
      'vi-VN': {
        common: {
          'about-us': 'Về Chúng Tôi',
          'inspiration': 'Cảm Hứng',
          'blog-page': 'Blog',
          'game-page': 'Trò Chơi',
          'search': 'Tìm Kiếm',
          'nav-menu': 'Menu Điều Hướng',
          'test-site': 'Trang Thử Nghiệm',
          'contact-page': 'Liên Hệ',
          'language': 'Ngôn Ngữ',
          'theme': 'Chủ Đề',
          'footer-item-1': 'Tạo ra trải nghiệm số với đam mê và độ chính xác.',
          'footer-item-2': 'Xây dựng tương lai, từng pixel một.',
          'title': 'Tiêu Đề',
          'category': 'Danh Mục',
          'tags': 'Thẻ',
          'author': 'Tác Giả'
        }
      }
    }
  });

export default i18n;
