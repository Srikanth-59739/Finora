import express from 'express';
import { expenseController } from '../controllers/expenseController.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(authenticate); // All routes require authentication

router.post('/', expenseController.create);
router.post('/receipt', upload.single('receipt'), expenseController.create);
router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getById);
router.put('/:id', expenseController.update);
router.delete('/:id', expenseController.delete);
router.post('/:id/recurring', expenseController.markRecurring);
router.put('/:id/confirm-category', expenseController.confirmCategory);

export default router;