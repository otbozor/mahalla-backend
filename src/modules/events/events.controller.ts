import { Request, Response, NextFunction } from 'express';
import { eventsService } from './events.service';
import * as R from '../../utils/apiResponse';

export const eventsController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { items, meta } = await eventsService.getAll(req.query as any);
      return R.ok(res, items, undefined, meta);
    } catch (e) { next(e); }
  },
  async getOne(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await eventsService.getById(req.params.id)); } catch (e) { next(e); }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try { return R.created(res, await eventsService.create(req.body)); } catch (e) { next(e); }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await eventsService.update(req.params.id, req.body)); } catch (e) { next(e); }
  },
  async remove(req: Request, res: Response, next: NextFunction) {
    try { await eventsService.delete(req.params.id); return R.noContent(res); } catch (e) { next(e); }
  },
  async register(req: Request, res: Response, next: NextFunction) {
    try { return R.created(res, await eventsService.register(req.params.id, req.body)); } catch (e) { next(e); }
  },
  async getRegistrations(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await eventsService.getRegistrations(req.params.id)); } catch (e) { next(e); }
  },
  async getCategories(_req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await eventsService.getCategories()); } catch (e) { next(e); }
  },
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try { return R.created(res, await eventsService.createCategory(req.body.name, req.body.nameRu)); } catch (e) { next(e); }
  },
};
