import { Router } from 'express';
import { servicesController } from './services.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { CreateServiceDto, UpdateServiceDto, ServiceQueryDto } from './services.dto';

const router = Router();

router.get('/', validate(ServiceQueryDto, 'query'), servicesController.getAll);
router.get('/:id', servicesController.getOne);

router.use(authenticate, authorize('ADMIN'));
router.post('/', validate(CreateServiceDto), servicesController.create);
router.patch('/:id', validate(UpdateServiceDto), servicesController.update);
router.delete('/:id', servicesController.remove);

export default router;
