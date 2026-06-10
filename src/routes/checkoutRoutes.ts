import { Router } from 'express';
import { createOrder } from '../controllers/checkoutController.js';

const router = Router();
router.post('/', createOrder);
export default router;