import { Prisma } from '@prisma/client';
import { prisma } from '../../config/database';
import type { ServiceQuery } from './services.dto';

export const servicesRepository = {
  findAll(query: ServiceQuery) {
    const where: Prisma.ServiceWhereInput = {
      ...(query.type && { type: query.type }),
      ...(query.isActive !== undefined && { isActive: query.isActive === 'true' }),
    };
    return prisma.service.findMany({ where, orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }] });
  },
  findById: (id: string) => prisma.service.findUnique({ where: { id } }),
  create: (data: Prisma.ServiceCreateInput) => prisma.service.create({ data }),
  update: (id: string, data: Prisma.ServiceUpdateInput) => prisma.service.update({ where: { id }, data }),
  delete: (id: string) => prisma.service.delete({ where: { id } }),
};
