import { Router } from 'express';
import { leaderController, achievementController } from './about.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import {
  CreateLeaderDto,
  UpdateLeaderDto,
  CreateAchievementDto,
  UpdateAchievementDto,
} from './about.dto';

const router = Router();

// ─── Public GET ───────────────────────────────────────────────────────────────
router.get('/leaders', leaderController.getAll);
router.get('/leaders/:id', leaderController.getOne);
router.get('/achievements', achievementController.getAll);
router.get('/achievements/:id', achievementController.getOne);

// ─── Protected write routes ───────────────────────────────────────────────────
router.use(authenticate, authorize('MODERATOR'));

router.post('/leaders', validate(CreateLeaderDto), leaderController.create);
router.patch('/leaders/:id', validate(UpdateLeaderDto), leaderController.update);
router.delete('/leaders/:id', authorize('ADMIN'), leaderController.remove);

router.post('/achievements', validate(CreateAchievementDto), achievementController.create);
router.patch('/achievements/:id', validate(UpdateAchievementDto), achievementController.update);
router.delete('/achievements/:id', authorize('ADMIN'), achievementController.remove);

export default router;
