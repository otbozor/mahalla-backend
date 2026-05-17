import { Router } from 'express';
import { statisticsController } from './statistics.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', statisticsController.getPublic);

router.use(authenticate, authorize('ADMIN'));
router.get('/dashboard', statisticsController.getDashboard);
router.get('/appeals', statisticsController.getAppealStats);
router.patch('/', statisticsController.update);

export default router;
