import { Router } from 'express';
import { faqController } from './faq.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { CreateFAQDto, UpdateFAQDto } from './faq.dto';

const router = Router();

router.get('/', faqController.getAll);
router.get('/categories', faqController.getCategories);
router.get('/:id', faqController.getOne);

router.use(authenticate, authorize('MODERATOR'));
router.post('/', validate(CreateFAQDto), faqController.create);
router.patch('/:id', validate(UpdateFAQDto), faqController.update);
router.delete('/:id', authorize('ADMIN'), faqController.remove);
router.post('/categories', authorize('ADMIN'), faqController.createCategory);

export default router;
