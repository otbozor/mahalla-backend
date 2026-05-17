import { Router } from 'express';
import { appealsController } from './appeals.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { appealLimiter } from '../../middlewares/rateLimiter.middleware';
import { uploadDocument } from '../../middlewares/upload.middleware';
import { CreateAppealDto, UpdateAppealStatusDto, AppealResponseDto, AppealQueryDto } from './appeals.dto';

const router = Router();

// Public
router.get('/categories', appealsController.getCategories);
router.get('/track/:ticketNo', appealsController.track);
router.post('/', appealLimiter, uploadDocument.array('attachments', 3), validate(CreateAppealDto), appealsController.create);

// Protected
router.use(authenticate, authorize('MODERATOR'));
router.get('/', validate(AppealQueryDto, 'query'), appealsController.getAll);
router.get('/:id', appealsController.getOne);
router.patch('/:id/status', validate(UpdateAppealStatusDto), appealsController.updateStatus);
router.post('/:id/respond', validate(AppealResponseDto), appealsController.respond);
router.post('/categories', authorize('ADMIN'), appealsController.createCategory);

export default router;
