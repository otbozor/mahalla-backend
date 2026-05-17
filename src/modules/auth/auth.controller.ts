import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import * as R from '../../utils/apiResponse';

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      return R.ok(res, result, 'Login successful');
    } catch (e) { next(e); }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refresh(refreshToken);
      return R.ok(res, tokens);
    } catch (e) { next(e); }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      return R.noContent(res);
    } catch (e) { next(e); }
  },

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.me(req.user!.id);
      return R.ok(res, user);
    } catch (e) { next(e); }
  },

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.changePassword(req.user!.id, req.body);
      return R.ok(res, null, 'Password changed successfully');
    } catch (e) { next(e); }
  },
};
