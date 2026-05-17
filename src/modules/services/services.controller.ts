import { Request, Response, NextFunction } from 'express';
import { servicesService } from './services.service';
import * as R from '../../utils/apiResponse';

export const servicesController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await servicesService.getAll(req.query as any)); } catch (e) { next(e); }
  },
  async getOne(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await servicesService.getById(req.params.id)); } catch (e) { next(e); }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try { return R.created(res, await servicesService.create(req.body)); } catch (e) { next(e); }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await servicesService.update(req.params.id, req.body)); } catch (e) { next(e); }
  },
  async remove(req: Request, res: Response, next: NextFunction) {
    try { await servicesService.delete(req.params.id); return R.noContent(res); } catch (e) { next(e); }
  },
};
