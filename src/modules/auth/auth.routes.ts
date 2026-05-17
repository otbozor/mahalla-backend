import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { authLimiter } from '../../middlewares/rateLimiter.middleware';
import { LoginDto, RefreshDto, ChangePasswordDto } from './auth.dto';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Admin login
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login successful }
 *       401: { description: Invalid credentials }
 */
router.post('/login', authLimiter, validate(LoginDto), authController.login);
router.post('/refresh', validate(RefreshDto), authController.refresh);
router.post('/logout', validate(RefreshDto), authController.logout);
router.get('/me', authenticate, authController.me);
router.patch('/change-password', authenticate, validate(ChangePasswordDto), authController.changePassword);

export default router;
