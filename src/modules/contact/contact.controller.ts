import { Request, Response, NextFunction } from 'express';
import { contactService } from './contact.service';
import * as R from '../../utils/apiResponse';

export const contactController = {
  async get(_req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await contactService.get()); } catch (e) { next(e); }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await contactService.update(req.body)); } catch (e) { next(e); }
  },
};
