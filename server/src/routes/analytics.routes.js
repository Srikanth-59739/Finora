import express from 'express';
import { analyticsController } from '../controllers/analyticsController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/dashboard', analyticsController.getDashboard);
router.get('/monthly/:month', analyticsController.getMonthly);
router.get('/yearly/:year', analyticsController.getYearly);
router.get('/merchants', analyticsController.getMerchants);
router.get('/categories', analyticsController.getCategories);

export default router;