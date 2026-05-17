import { Request, Response, NextFunction } from 'express';
import { faqService } from './faq.service';
import * as R from '../../utils/apiResponse';

export const faqController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await faqService.getAll(!!req.user)); } catch (e) { next(e); }
  },
  async getOne(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await faqService.getById(req.params.id)); } catch (e) { next(e); }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try { return R.created(res, await faqService.create(req.body)); } catch (e) { next(e); }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await faqService.update(req.params.id, req.body)); } catch (e) { next(e); }
  },
  async remove(req: Request, res: Response, next: NextFunction) {
    try { await faqService.delete(req.params.id); return R.noContent(res); } catch (e) { next(e); }
  },
  async getCategories(_req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await faqService.getCategories()); } catch (e) { next(e); }
  },
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try { return R.created(res, await faqService.createCategory(req.body.name, req.body.nameRu)); } catch (e) { next(e); }
  },
};
