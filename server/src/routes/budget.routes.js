import express from 'express';
import { budgetController } from '../controllers/budgetController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/', budgetController.setBudget);
router.get('/', budgetController.getAll);
router.get('/month/:month', budgetController.getByMonth);
router.delete('/:id', budgetController.delete);

export default router;