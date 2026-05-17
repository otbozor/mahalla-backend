import { Prisma } from '@prisma/client';
import { prisma } from '../../config/database';
import type { EventQuery } from './events.dto';

const include = { category: { select: { id: true, name: true, nameRu: true, slug: true } } };

export const eventsRepository = {
  findAll(query: EventQuery, skip: number, take: number) {
    const where: Prisma.EventWhereInput = {
      ...(query.status && { status: query.status }),
      ...(query.categoryId && { categoryId: query.categoryId }),
      ...(query.search && { title: { contains: query.search, mode: 'insensitive' } }),
    };
    return Promise.all([
      prisma.event.findMany({ where, skip, take, include, orderBy: { startDate: 'asc' } }),
      prisma.event.count({ where }),
    ]);
  },

  findById: (id: string) => prisma.event.findUnique({ where: { id }, include: { ...include, registrations: true } }),
  create: (data: Prisma.EventCreateInput) => prisma.event.create({ data, include }),
  update: (id: string, data: Prisma.EventUpdateInput) => prisma.event.update({ where: { id }, data, include }),
  delete: (id: string) => prisma.event.delete({ where: { id } }),

  createRegistration: (eventId: string, data: { fullName: string; phone: string; email?: string }) =>
    prisma.eventRegistration.create({ data: { eventId, ...data } }),
  countRegistrations: (eventId: string) =>
    prisma.eventRegistration.count({ where: { eventId } }),
  getRegistrations: (eventId: string) =>
    prisma.eventRegistration.findMany({ where: { eventId }, orderBy: { createdAt: 'desc' } }),

  findAllCategories: () => prisma.eventCategory.findMany({ orderBy: { name: 'asc' } }),
  createCategory: (name: string, nameRu: string | undefined, slug: string) =>
    prisma.eventCategory.create({ data: { name, nameRu, slug } }),
};
