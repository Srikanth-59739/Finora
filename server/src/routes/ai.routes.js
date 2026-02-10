import express from 'express';
import { aiController } from '../controllers/aiController.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/parse', aiController.parse);
router.post('/suggest-category', aiController.suggestCategory);
router.post('/ocr', upload.single('image'), aiController.processReceipt);

export default router;