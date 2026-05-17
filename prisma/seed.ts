import { PrismaClient, Role, NewsStatus, ServiceType, EventStatus, AppealStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Super Admin
  const hashedPassword = await bcrypt.hash('Admin@12345', 12);
  await prisma.user.upsert({
    where: { email: 'admin@jasoratmfy.uz' },
    update: {},
    create: {
      email: 'admin@jasoratmfy.uz',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: Role.SUPER_ADMIN,
    },
  });

  // News Categories
  const newsCategories = await Promise.all([
    prisma.newsCategory.upsert({ where: { slug: 'announcement' }, update: {}, create: { name: "E'lon", nameRu: 'Объявление', slug: 'announcement' } }),
    prisma.newsCategory.upsert({ where: { slug: 'improvement' }, update: {}, create: { name: 'Obodonlashtirish', nameRu: 'Благоустройство', slug: 'improvement' } }),
    prisma.newsCategory.upsert({ where: { slug: 'education' }, update: {}, create: { name: "Ta'lim", nameRu: 'Образование', slug: 'education' } }),
    prisma.newsCategory.upsert({ where: { slug: 'health' }, update: {}, create: { name: 'Salomatlik', nameRu: 'Здоровье', slug: 'health' } }),
  ]);

  // Sample News
  await prisma.news.upsert({
    where: { slug: 'mahalla-guzari-yangilandi' },
    update: {},
    create: {
      title: 'Mahalla guzari yangilandi',
      titleRu: 'Гузар махалли обновлён',
      slug: 'mahalla-guzari-yangilandi',
      content: 'Jasorat MFY guzari zamonaviy ko\'rinishga ega bo\'ldi. Yangi skameykalar, yoritish tizimlari va ko\'kalamzorlashtirish ishlari yakunlandi.',
      excerpt: 'Guzar zamonaviy ko\'rinishga ega bo\'ldi.',
      status: NewsStatus.PUBLISHED,
      isFeatured: true,
      categoryId: newsCategories[1].id,
      publishedAt: new Date(),
    },
  });

  // Event Categories
  const eventCategory = await prisma.eventCategory.upsert({
    where: { slug: 'meeting' },
    update: {},
    create: { name: 'Yig\'ilish', nameRu: 'Собрание', slug: 'meeting' },
  });

  // Sample Event
  await prisma.event.upsert({
    where: { id: 'seed-event-1' },
    update: {},
    create: {
      id: 'seed-event-1',
      title: 'Fuqarolar yig\'ilishi',
      description: 'Oylik fuqarolar yig\'ilishi. Barcha mahalla aholisi taklif etiladi.',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: EventStatus.UPCOMING,
      categoryId: eventCategory.id,
      isRegistrationOpen: true,
    },
  });

  // Appeal Categories
  await Promise.all([
    prisma.appealCategory.upsert({ where: { id: 'appeal-cat-1' }, update: {}, create: { id: 'appeal-cat-1', name: 'Obodonlashtirish', nameRu: 'Благоустройство' } }),
    prisma.appealCategory.upsert({ where: { id: 'appeal-cat-2' }, update: {}, create: { id: 'appeal-cat-2', name: 'Ijtimoiy yordam', nameRu: 'Социальная помощь' } }),
    prisma.appealCategory.upsert({ where: { id: 'appeal-cat-3' }, update: {}, create: { id: 'appeal-cat-3', name: 'Kommunal masala', nameRu: 'Коммунальный вопрос' } }),
    prisma.appealCategory.upsert({ where: { id: 'appeal-cat-4' }, update: {}, create: { id: 'appeal-cat-4', name: 'Taklif', nameRu: 'Предложение' } }),
  ]);

  // Services
  await Promise.all([
    prisma.service.upsert({ where: { id: 'svc-1' }, update: {}, create: { id: 'svc-1', title: 'My.gov.uz', titleRu: 'My.gov.uz', url: 'https://my.gov.uz', type: ServiceType.GOVERNMENT, icon: 'globe', sortOrder: 1 } }),
    prisma.service.upsert({ where: { id: 'svc-2' }, update: {}, create: { id: 'svc-2', title: 'Toshkent shahar hokimligi', url: 'https://tashkent.uz', type: ServiceType.GOVERNMENT, icon: 'building', sortOrder: 2 } }),
    prisma.service.upsert({ where: { id: 'svc-3' }, update: {}, create: { id: 'svc-3', title: 'Tez yordam', phone: '103', type: ServiceType.EMERGENCY, icon: 'ambulance', sortOrder: 1 } }),
    prisma.service.upsert({ where: { id: 'svc-4' }, update: {}, create: { id: 'svc-4', title: 'Yong\'in xizmati', phone: '101', type: ServiceType.EMERGENCY, icon: 'fire', sortOrder: 2 } }),
    prisma.service.upsert({ where: { id: 'svc-5' }, update: {}, create: { id: 'svc-5', title: 'Politsiya', phone: '102', type: ServiceType.EMERGENCY, icon: 'shield', sortOrder: 3 } }),
  ]);

  // FAQ Categories & Items
  const faqCat = await prisma.fAQCategory.upsert({
    where: { id: 'faq-cat-1' },
    update: {},
    create: { id: 'faq-cat-1', name: 'Umumiy savollar', nameRu: 'Общие вопросы' },
  });

  await prisma.fAQ.upsert({
    where: { id: 'faq-1' },
    update: {},
    create: {
      id: 'faq-1',
      question: 'Mahallaga murojaat qanday yuboriladi?',
      answer: 'Saytdagi "Murojaatlar" bo\'limiga o\'tib, shakl to\'ldiring. Murojaatingiz 3 ish kuni ichida ko\'rib chiqiladi.',
      categoryId: faqCat.id,
      sortOrder: 1,
    },
  });

  // Community Stats
  await prisma.communityStats.upsert({
    where: { id: 'stats-main' },
    update: {},
    create: {
      id: 'stats-main',
      residents: 4820,
      households: 1120,
      activeServices: 18,
      yearlyEvents: 42,
      streets: 36,
    },
  });

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
