import { Router } from 'express';
import { uploadController } from './upload.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { uploadImage } from '../../middlewares/upload.middleware';

const router = Router();

router.post('/image', authenticate, authorize('MODERATOR'), uploadImage.single('image'), uploadController.uploadImage);

export default router;
