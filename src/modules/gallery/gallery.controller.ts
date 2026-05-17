import { Request, Response, NextFunction } from 'express';
import { galleryService } from './gallery.service';
import * as R from '../../utils/apiResponse';
import { uploadToCloudinary } from '../../middlewares/upload.middleware';

export const galleryController = {
  async getAlbums(_req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await galleryService.getAlbums()); } catch (e) { next(e); }
  },
  async getAlbum(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await galleryService.getAlbumById(req.params.id)); } catch (e) { next(e); }
  },
  async createAlbum(req: Request, res: Response, next: NextFunction) {
    try { return R.created(res, await galleryService.createAlbum(req.body)); } catch (e) { next(e); }
  },
  async updateAlbum(req: Request, res: Response, next: NextFunction) {
    try { return R.ok(res, await galleryService.updateAlbum(req.params.id, req.body)); } catch (e) { next(e); }
  },
  async deleteAlbum(req: Request, res: Response, next: NextFunction) {
    try { await galleryService.deleteAlbum(req.params.id); return R.noContent(res); } catch (e) { next(e); }
  },
  async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const { items, meta } = await galleryService.getItems(req.query as any);
      return R.ok(res, items, undefined, meta);
    } catch (e) { next(e); }
  },
  async uploadItem(req: Request, res: Response, next: NextFunction) {
    try {
      const uploadedUrl = req.file
        ? await uploadToCloudinary(req.file.buffer, 'jasorat-mfy/gallery')
        : undefined;
      return R.created(res, await galleryService.createItem(req.body, uploadedUrl));
    } catch (e) { next(e); }
  },
  async deleteItem(req: Request, res: Response, next: NextFunction) {
    try { await galleryService.deleteItem(req.params.id); return R.noContent(res); } catch (e) { next(e); }
  },
};
