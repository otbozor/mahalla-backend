import { Router } from 'express';
import { usersController } from './users.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { CreateUserDto, UpdateUserDto } from './users.dto';

const router = Router();

router.use(authenticate, authorize('ADMIN'));
router.get('/', usersController.getAll);
router.get('/:id', usersController.getOne);
router.post('/', validate(CreateUserDto), usersController.create);
router.patch('/:id', validate(UpdateUserDto), usersController.update);
router.delete('/:id', authorize('SUPER_ADMIN'), usersController.remove);

export default router;
