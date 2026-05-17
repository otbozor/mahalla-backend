import { Request, Response, NextFunction } from 'express';
import { appealsService } from './appeals.service';
import * as R from '../../utils/apiResponse';
import { AppealStatus } from '@prisma/client';

export const appealsController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { items, meta } = await appealsService.getAll(req.query as any);
      return R.ok(res, items, undefined, meta);
    } catch (e) { next(e); }
  },
  async getOne(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await appealsService.getById(req.params.id)); } catch (e) { next(e); }
  },
  async track(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await appealsService.trackByTicket(req.params.ticketNo)); } catch (e) { next(e); }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const files = (req.files as Express.Multer.File[] | undefined)?.map((f) => f.path) ?? [];
      return R.created(res, await appealsService.create(req.body, files));
    } catch (e) { next(e); }
  },
  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      return R.ok(res, await appealsService.updateStatus(req.params.id, req.body.status as AppealStatus));
    } catch (e) { next(e); }
  },
  async respond(req: Request, res: Response, next: NextFunction) {
    try {
      return R.ok(res, await appealsService.respond(req.params.id, req.user!.id, req.body.message));
    } catch (e) { next(e); }
  },
  async getCategories(_req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await appealsService.getCategories()); } catch (e) { next(e); }
  },
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try { return R.created(res, await appealsService.createCategory(req.body.name, req.body.nameRu)); } catch (e) { next(e); }
  },
};
