import { Router } from 'express';
import { eventsController } from './events.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { CreateEventDto, UpdateEventDto, EventQueryDto, RegisterEventDto } from './events.dto';

const router = Router();

// Public
router.get('/', validate(EventQueryDto, 'query'), eventsController.getAll);
router.get('/categories', eventsController.getCategories);
router.get('/:id', eventsController.getOne);
router.post('/:id/register', validate(RegisterEventDto), eventsController.register);

// Protected
router.use(authenticate, authorize('MODERATOR'));
router.post('/', validate(CreateEventDto), eventsController.create);
router.patch('/:id', validate(UpdateEventDto), eventsController.update);
router.get('/:id/registrations', eventsController.getRegistrations);
router.delete('/:id', authorize('ADMIN'), eventsController.remove);
router.post('/categories', authorize('ADMIN'), eventsController.createCategory);

export default router;
