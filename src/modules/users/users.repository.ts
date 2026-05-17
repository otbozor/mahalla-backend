import { Prisma } from '@prisma/client';
import { prisma } from '../../config/database';

const select = { id: true, email: true, firstName: true, lastName: true, role: true, isActive: true, lastLoginAt: true, createdAt: true, updatedAt: true };

export const usersRepository = {
  findAll: () => prisma.user.findMany({ select, orderBy: { createdAt: 'desc' } }),
  findById: (id: string) => prisma.user.findUnique({ where: { id }, select }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  create: (data: Prisma.UserCreateInput) => prisma.user.create({ data, select }),
  update: (id: string, data: Prisma.UserUpdateInput) => prisma.user.update({ where: { id }, data, select }),
  delete: (id: string) => prisma.user.delete({ where: { id } }),
};
