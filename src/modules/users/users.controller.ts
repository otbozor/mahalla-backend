import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import * as R from '../../utils/apiResponse';

export const usersController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await usersService.getAll()); } catch (e) { next(e); }
  },
  async getOne(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await usersService.getById(req.params.id)); } catch (e) { next(e); }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      return R.created(res, await usersService.create(req.body, req.user!.id, req.user!.role));
    } catch (e) { next(e); }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      return R.ok(res, await usersService.update(req.params.id, req.body, req.user!.role));
    } catch (e) { next(e); }
  },
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await usersService.delete(req.params.id, req.user!.id);
      return R.noContent(res);
    } catch (e) { next(e); }
  },
};
