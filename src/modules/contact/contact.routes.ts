import { Router } from 'express';
import { contactController } from './contact.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', contactController.get);
router.patch('/', authenticate, authorize('MODERATOR'), contactController.update);

export default router;
