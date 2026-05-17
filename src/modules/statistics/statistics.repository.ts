import { prisma } from '../../config/database';

export const statisticsRepository = {
  async getStats() {
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const yearEnd   = new Date(now.getFullYear() + 1, 0, 1);

    const [community, activeServices, yearlyEvents] = await Promise.all([
      prisma.communityStats.findFirst(),
      prisma.service.count({ where: { isActive: true } }),
      prisma.event.count({ where: { startDate: { gte: yearStart, lt: yearEnd } } }),
    ]);

    return { ...community, activeServices, yearlyEvents };
  },

  // Only residents, households, streets are editable — the rest are auto-calculated
  updateStats: (data: { residents?: number; households?: number; streets?: number }) =>
    prisma.communityStats.updateMany({ data }),

  async getDashboard() {
    const [stats, totalNews, totalEvents, pendingAppeals, totalUsers] = await Promise.all([
      prisma.communityStats.findFirst(),
      prisma.news.count({ where: { status: 'PUBLISHED' } }),
      prisma.event.count({ where: { status: { in: ['UPCOMING', 'ONGOING'] } } }),
      prisma.appeal.count({ where: { status: 'PENDING' } }),
      prisma.user.count({ where: { isActive: true } }),
    ]);
    return { stats, totalNews, totalEvents, pendingAppeals, totalUsers };
  },

  async getAppealStats() {
    const grouped = await prisma.appeal.groupBy({
      by: ['status'],
      _count: { status: true },
    });
    return grouped.map((g) => ({ status: g.status, count: g._count.status }));
  },
};
