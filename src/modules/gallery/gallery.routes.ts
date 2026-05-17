import { Router } from 'express';
import { galleryController } from './gallery.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { uploadImage } from '../../middlewares/upload.middleware';
import { CreateAlbumDto, GalleryQueryDto } from './gallery.dto';

const router = Router();

// Public
router.get('/albums', galleryController.getAlbums);
router.get('/albums/:id', galleryController.getAlbum);
router.get('/items', validate(GalleryQueryDto, 'query'), galleryController.getItems);

// Protected
router.use(authenticate, authorize('MODERATOR'));
router.post('/albums', validate(CreateAlbumDto), galleryController.createAlbum);
router.patch('/albums/:id', galleryController.updateAlbum);
router.delete('/albums/:id', authorize('ADMIN'), galleryController.deleteAlbum);
router.post('/items', uploadImage.single('image'), galleryController.uploadItem);
router.delete('/items/:id', authorize('ADMIN'), galleryController.deleteItem);

export default router;
