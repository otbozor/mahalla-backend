import { Prisma } from '@prisma/client';
import { prisma } from '../../config/database';

const include = { category: { select: { id: true, name: true, nameRu: true } } };

export const faqRepository = {
  findAll: (onlyPublished = true) =>
    prisma.fAQ.findMany({
      where: onlyPublished ? { isPublished: true } : {},
      include,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    }),
  findById: (id: string) => prisma.fAQ.findUnique({ where: { id }, include }),
  create: (data: Prisma.FAQCreateInput) => prisma.fAQ.create({ data, include }),
  update: (id: string, data: Prisma.FAQUpdateInput) => prisma.fAQ.update({ where: { id }, data, include }),
  delete: (id: string) => prisma.fAQ.delete({ where: { id } }),

  findAllCategories: () => prisma.fAQCategory.findMany({ orderBy: { name: 'asc' } }),
  createCategory: (name: string, nameRu?: string) => prisma.fAQCategory.create({ data: { name, nameRu } }),
};
