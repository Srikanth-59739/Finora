import express from 'express';
import { adminController } from '../controllers/adminController.js';
import { authenticateAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/login', adminController.login);
router.get('/stats', authenticateAdmin, adminController.getStats);
router.get('/users', authenticateAdmin, adminController.getUsers);

export default router;