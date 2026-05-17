import { Request, Response, NextFunction } from 'express';
import * as R from '../../utils/apiResponse';
import { AppError } from '../../utils/errors';
import { uploadToCloudinary } from '../../middlewares/upload.middleware';

export const uploadController = {
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new AppError('Fayl yuklanmadi', 400);
      const url = await uploadToCloudinary(req.file.buffer);
      return R.ok(res, { url });
    } catch (err) {
      return next(err);
    }
  },
};
