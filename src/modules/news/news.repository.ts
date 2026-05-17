import { NewsStatus, Prisma } from '@prisma/client';
import { prisma } from '../../config/database';
import type { NewsQuery } from './news.dto';

const include = { category: { select: { id: true, name: true, nameRu: true, slug: true } } };

export const newsRepository = {
  findAll(query: NewsQuery, skip: number, take: number) {
    const where: Prisma.NewsWhereInput = {
      ...(query.status && { status: query.status }),
      ...(query.categoryId && { categoryId: query.categoryId }),
      ...(query.isFeatured && { isFeatured: query.isFeatured === 'true' }),
      ...(query.search && { title: { contains: query.search, mode: 'insensitive' } }),
    };
    return Promise.all([
      prisma.news.findMany({ where, skip, take, include, orderBy: { publishedAt: 'desc' } }),
      prisma.news.count({ where }),
    ]);
  },

  findBySlug: (slug: string) => prisma.news.findUnique({ where: { slug }, include }),
  findById: (id: string) => prisma.news.findUnique({ where: { id }, include }),

  create: (data: Prisma.NewsCreateInput) => prisma.news.create({ data, include }),
  update: (id: string, data: Prisma.NewsUpdateInput) => prisma.news.update({ where: { id }, data, include }),
  delete: (id: string) => prisma.news.delete({ where: { id } }),
  incrementView: (id: string) => prisma.news.update({ where: { id }, data: { viewCount: { increment: 1 } } }),

  // Categories
  findAllCategories: () => prisma.newsCategory.findMany({ orderBy: { name: 'asc' } }),
  findCategoryBySlug: (slug: string) => prisma.newsCategory.findUnique({ where: { slug } }),
  createCategory: (name: string, nameRu: string | undefined, slug: string) =>
    prisma.newsCategory.create({ data: { name, nameRu, slug } }),
  deleteCategory: (id: string) => prisma.newsCategory.delete({ where: { id } }),
};
