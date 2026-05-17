import { Request, Response, NextFunction } from 'express';
import { statisticsService } from './statistics.service';
import * as R from '../../utils/apiResponse';

export const statisticsController = {
  async getPublic(_req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await statisticsService.getPublicStats()); } catch (e) { next(e); }
  },
  async getDashboard(_req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await statisticsService.getDashboard()); } catch (e) { next(e); }
  },
  async getAppealStats(_req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await statisticsService.getAppealStats()); } catch (e) { next(e); }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await statisticsService.updateStats(req.body)); } catch (e) { next(e); }
  },
};
