import { Router } from 'express';
import { newsController } from './news.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { CreateNewsDto, UpdateNewsDto, NewsQueryDto } from './news.dto';

const router = Router();

// Public
router.get('/', validate(NewsQueryDto, 'query'), newsController.getAll);
router.get('/categories', newsController.getCategories);
router.get('/:slug', newsController.getOne);
router.post('/:slug/view', newsController.trackView);

// Protected
router.use(authenticate, authorize('MODERATOR'));
router.post('/', validate(CreateNewsDto), newsController.create);
router.patch('/:id', validate(UpdateNewsDto), newsController.update);
router.delete('/:id', authorize('ADMIN'), newsController.remove);
router.post('/categories', authorize('ADMIN'), newsController.createCategory);

export default router;
