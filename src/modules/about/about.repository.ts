import { Prisma } from '@prisma/client';
import { prisma } from '../../config/database';

export const leaderRepository = {
  findAll: (onlyActive = true) =>
    prisma.leader.findMany({
      where: onlyActive ? { isActive: true } : {},
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    }),
  findById: (id: string) => prisma.leader.findUnique({ where: { id } }),
  create: (data: Prisma.LeaderCreateInput) => prisma.leader.create({ data }),
  update: (id: string, data: Prisma.LeaderUpdateInput) =>
    prisma.leader.update({ where: { id }, data }),
  delete: (id: string) => prisma.leader.delete({ where: { id } }),
};

export const achievementRepository = {
  findAll: () =>
    prisma.achievement.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    }),
  findById: (id: string) => prisma.achievement.findUnique({ where: { id } }),
  create: (data: Prisma.AchievementCreateInput) => prisma.achievement.create({ data }),
  update: (id: string, data: Prisma.AchievementUpdateInput) =>
    prisma.achievement.update({ where: { id }, data }),
  delete: (id: string) => prisma.achievement.delete({ where: { id } }),
};
