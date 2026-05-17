import { AppealStatus, Prisma } from '@prisma/client';
import { prisma } from '../../config/database';
import type { AppealQuery } from './appeals.dto';

const include = {
  category: { select: { id: true, name: true, nameRu: true } },
  responses: { include: { admin: { select: { id: true, firstName: true, lastName: true } } }, orderBy: { createdAt: 'asc' as const } },
};

export const appealsRepository = {
  findAll(query: AppealQuery, skip: number, take: number) {
    const where: Prisma.AppealWhereInput = {
      ...(query.status && { status: query.status }),
      ...(query.categoryId && { categoryId: query.categoryId }),
      ...(query.search && {
        OR: [
          { fullName: { contains: query.search, mode: 'insensitive' } },
          { ticketNo: { contains: query.search, mode: 'insensitive' } },
        ],
      }),
    };
    return Promise.all([
      prisma.appeal.findMany({ where, skip, take, include, orderBy: { createdAt: 'desc' } }),
      prisma.appeal.count({ where }),
    ]);
  },

  findById: (id: string) => prisma.appeal.findUnique({ where: { id }, include }),
  findByTicket: (ticketNo: string) => prisma.appeal.findUnique({ where: { ticketNo }, include }),

  create: (data: Prisma.AppealCreateInput) => prisma.appeal.create({ data, include }),
  updateStatus: (id: string, status: AppealStatus) =>
    prisma.appeal.update({ where: { id }, data: { status }, include }),

  addResponse: (appealId: string, adminId: string, message: string) =>
    prisma.appealResponse.create({ data: { appealId, adminId, message } }),

  findAllCategories: () => prisma.appealCategory.findMany({ orderBy: { name: 'asc' } }),
  createCategory: (name: string, nameRu?: string) =>
    prisma.appealCategory.create({ data: { name, nameRu } }),
};
