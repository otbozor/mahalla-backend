import { statisticsRepository } from './statistics.repository';

export const statisticsService = {
  getPublicStats: () => statisticsRepository.getStats(),
  getDashboard: () => statisticsRepository.getDashboard(),
  getAppealStats: () => statisticsRepository.getAppealStats(),
  updateStats: (data: Parameters<typeof statisticsRepository.updateStats>[0]) =>
    statisticsRepository.updateStats(data),
};
