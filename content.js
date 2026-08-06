/**
 * DK PORTFOLIO — CONTENT LAYER
 */

const DK_CONTENT = {

  contacts: { telegram: 'https://t.me/des1n', behance: 'https://www.behance.net/5db91123', email: 'dendekri17@gmail.com' },

  nav: [
    { id: 'hero', label: 'Головна' },
    { id: 'video', label: 'Відеомонтаж' },
    { id: 'design', label: 'Дизайн' },
    { id: 'skills', label: 'Навички' },
    { id: 'testimonials', label: 'Відгуки' },
    { id: 'pricing', label: 'Вартість' },
    { id: 'contact', label: 'Контакти' }
  ],

  hero: {
    offer: 'Перетворюю ідеї на монтаж і дизайн, які зупиняють скрол, запам\u2019ятовуються та приводять клієнтів.',
    cta_primary: 'Дивитись роботи',
    cta_secondary: "Зв'язатися в Telegram",
    // Тепер завжди картинка (і на десктопі, і на мобільних) — відео не використовується
    mediaType: 'image',
    mediaPoster: 'img/hero-poster.png'
  },

  // 5 Reels та 1 YouTube — у кожного проєкту тепер є video
  videoProjects: [
    { id: 'proj-1', category: 'reels',   title: 'Динамічний Reels для блогера',        desc: 'Швидкий монтаж під трендовий аудіо, звуковий дизайн, динамічні переходи.',                       thumb: 'img/project-1.jpg', video: 'video/project-1-preview.mp4', tags: ['DaVinci Resolve', 'After Effects', 'Sound Design'], link: 'https://t.me/des1n' },
    { id: 'proj-2', category: 'reels',   title: 'Серія Reels для особистого бренду',   desc: 'Пакет 12 роликів. Трендові звуки, субтитри. Рост фолловерів +30%.',                              thumb: 'img/project-2.jpg', video: 'video/project-2-preview.mp4', tags: ['Trending Audio', 'Fast Turnaround'],                 link: 'https://t.me/des1n' },
    { id: 'proj-4', category: 'reels',   title: 'Креативний Reels для реклами',        desc: 'Яскраві переходи, текст на екрані, утримання уваги з перших секунд.',                            thumb: 'img/project-4.jpg', video: 'video/project-4-preview.mp4', tags: ['DaVinci Resolve', 'Ads'],                            link: 'https://t.me/des1n' },
    { id: 'proj-5', category: 'reels',   title: 'Аналітика у форматі Reels',           desc: 'Складні дані перетворені на доступну коротку форму з кінетичною типографікою.',                   thumb: 'img/project-5.jpg', video: 'video/project-5-preview.mp4', tags: ['After Effects', 'Kinetic Typography'],               link: 'https://t.me/des1n' },
    { id: 'proj-6', category: 'reels',   title: 'Reels для експерта',                  desc: 'Говоряча голова + динамічні підкадри, що ілюструють текст.',                                     thumb: 'img/project-6.jpg', video: 'video/project-6-preview.mp4', tags: ['Premiere Pro', 'B-roll'],                            link: 'https://t.me/des1n' },
    { id: 'proj-7', category: 'reels',   title: 'Reels-розпаковка продукту',           desc: 'Яскраві переходи, текст на екрані, утримання уваги з перших секунд. ритмічний монтаж під музику',                        thumb: 'img/project-7.jpg', video: 'video/project-7-preview.mp4', tags: ['DaVinci Resolve', 'Product'],                        link: 'https://t.me/des1n' },
    { id: 'proj-3', category: 'youtube', title: 'YouTube відео',       desc: 'Повний цикл: монтаж, колір-корекція, графіка, саунд-дизайн. Утримання аудиторії 65%.',    thumb: 'img/project-3.jpg', video: 'video/project-3-preview.mp4', tags: ['Premiere Pro', 'Color Grading', 'Motion Graphics'], link: 'https://t.me/des1n' }
  ],

  // 2 горизонтальні (wide) та 2 квадратні (square)
  designProjects: [
    { id: 'des-1', title: 'Банер для YouTube каналу', tool: 'Figma, Photoshop', thumb: 'img/design-1.jpg', link: 'https://t.me/des1n' },
    { id: 'des-2', title: 'Креатив для Facebook/Instagram Ads', tool: 'Photoshop, Illustrator', thumb: 'img/design-2.jpg', link: 'https://t.me/des1n' },
    { id: 'des-3', title: 'Обкладинка для подкасту', tool: 'Figma, Photoshop', thumb: 'img/design-3.jpg', link: 'https://t.me/des1n' },
    { id: 'des-4', title: 'Ідентичність для особистого бренду', tool: 'Figma, Illustrator', thumb: 'img/design-4.jpg', link: 'https://t.me/des1n' }
  ],

  skills: [
    { name: 'DaVinci Resolve Studio', features: ['Професійна колір-корекція та грейдінг', 'Монтаж, Fairlight (аудіо), Fusion (VFX)', 'Робота з RAW (BRAW, RED), ACES workflow'] },
    { name: 'Figma', features: ['UI/UX дизайн, прототипування, дизайн-системи', 'Автолейаути, компоненти, змінні', 'Передача в розробку (DevMode)'] },
    { name: 'Adobe Photoshop', features: ['Ретуш, композитинг, фотоманіпуляція', 'Підготовка ассетів для відео/вебу', 'Generative Fill, Neural Filters (AI tools)'] },
    { name: 'Adobe After Effects', features: ['Motion Design, Кінетична типографіка, VFX', 'Expressions, Essential Graphics (MOGRTs)', 'Інтеграція з Premiere Pro / DaVinci'] }
  ],

  testimonials: [
    { text: 'Професіонал своєї справи, зробив Reels за 1 день. Розуміє тренди та алгоритми. Рекомендую!', author: 'Влад Міхєєв', role: 'Експерт з нерухомості', rating: 5 },
    { text: 'Найкращий монтажер, з яким працював. Все зроблено швидко. Бомба!', author: 'Андрій Пивоваров', role: 'Серійний підприємець. Ментор. Стратег (100k+ підписників)', rating: 5 },
    { text: 'Дякую за співпрацю! Буду звертатися, коли виникнуть нові завдання. Зберіг ваш контакт для майбутніх проєктів.', author: 'Володимир Петренко', role: 'Маркетолог, E-com бренд', rating: 5 },
    { text: 'Все четко братан. Спасибо тебе за проделанную работу, буду обращаться к тебе 🙌', author: 'zzhen', role: 'Клієнт', rating: 5 },
    { text: 'Приветик) По кейсам все гуд, спасибо ☺️', author: 'Daniel B', role: 'Клієнт', rating: 5 }
  ],

  pricing: [
    { id: 'price-reels', name: 'Reels / Shorts / TikTok', price: 'від $10', features: ['Монтаж під трендовий аудіо, динамічні переходи', 'Кольор-корекція, субтитри (авто/ручні), ефекти', 'Адаптація під 3 платформи (9:16), обкладинка'], popular: true },
    { id: 'price-youtube', name: 'YouTube / Long-form Video', price: 'від $30', features: ['Повний цикл: монтаж, саунд-дизайн, колір, графіка', 'Ретеншн-редагування (з тримаюча увага)', 'Створення енд-скрін, таймкодів, обкладинки (CTR)'], popular: false },
    { id: 'price-design', name: 'Дизайн-пакет (Бренд / Ads)', price: 'від $8', features: ['Логотип, колірна палітра, типографіка, гайдлайни', 'Креативи для реклами (статика/мобільний відео)', 'YouTube банер, аватарки, обкладинки для відео'], popular: false }
  ]
};