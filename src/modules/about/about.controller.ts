import { Request, Response, NextFunction } from 'express';
import { leaderService, achievementService } from './about.service';
import * as R from '../../utils/apiResponse';

export const leaderController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await leaderService.getAll(!!req.user)); } catch (e) { next(e); }
  },
  async getOne(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await leaderService.getById(req.params.id)); } catch (e) { next(e); }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try { return R.created(res, await leaderService.create(req.body)); } catch (e) { next(e); }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await leaderService.update(req.params.id, req.body)); } catch (e) { next(e); }
  },
  async remove(req: Request, res: Response, next: NextFunction) {
    try { await leaderService.delete(req.params.id); return R.noContent(res); } catch (e) { next(e); }
  },
};

export const achievementController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await achievementService.getAll()); } catch (e) { next(e); }
  },
  async getOne(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await achievementService.getById(req.params.id)); } catch (e) { next(e); }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try { return R.created(res, await achievementService.create(req.body)); } catch (e) { next(e); }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await achievementService.update(req.params.id, req.body)); } catch (e) { next(e); }
  },
  async remove(req: Request, res: Response, next: NextFunction) {
    try { await achievementService.delete(req.params.id); return R.noContent(res); } catch (e) { next(e); }
  },
};
