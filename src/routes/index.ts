import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import newsRoutes from '../modules/news/news.routes';
import eventsRoutes from '../modules/events/events.routes';
import appealsRoutes from '../modules/appeals/appeals.routes';
import galleryRoutes from '../modules/gallery/gallery.routes';
import faqRoutes from '../modules/faq/faq.routes';
import servicesRoutes from '../modules/services/services.routes';
import usersRoutes from '../modules/users/users.routes';
import statisticsRoutes from '../modules/statistics/statistics.routes';
import aboutRoutes from '../modules/about/about.routes';
import contactRoutes from '../modules/contact/contact.routes';
import uploadRoutes from '../modules/upload/upload.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/news', newsRoutes);
router.use('/events', eventsRoutes);
router.use('/appeals', appealsRoutes);
router.use('/gallery', galleryRoutes);
router.use('/faq', faqRoutes);
router.use('/services', servicesRoutes);
router.use('/users', usersRoutes);
router.use('/statistics', statisticsRoutes);
router.use('/about', aboutRoutes);
router.use('/contact', contactRoutes);
router.use('/upload', uploadRoutes);

export default router;
