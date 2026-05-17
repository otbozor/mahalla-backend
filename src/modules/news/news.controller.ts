import { Request, Response, NextFunction } from 'express';
import { newsService } from './news.service';
import * as R from '../../utils/apiResponse';

export const newsController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { items, meta } = await newsService.getAll(req.query as any);
      return R.ok(res, items, undefined, meta);
    } catch (e) { next(e); }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      return R.ok(res, await newsService.getBySlug(req.params.slug));
    } catch (e) { next(e); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      return R.created(res, await newsService.create(req.body));
    } catch (e) { next(e); }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      return R.ok(res, await newsService.update(req.params.id, req.body));
    } catch (e) { next(e); }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await newsService.delete(req.params.id);
      return R.noContent(res);
    } catch (e) { next(e); }
  },

  async trackView(req: Request, res: Response, next: NextFunction) {
    try {
      await newsService.trackView(req.params.slug);
      return R.ok(res, null);
    } catch (e) { next(e); }
  },

  async getCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      return R.ok(res, await newsService.getCategories());
    } catch (e) { next(e); }
  },

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      return R.created(res, await newsService.createCategory(req.body.name, req.body.nameRu));
    } catch (e) { next(e); }
  },
};
