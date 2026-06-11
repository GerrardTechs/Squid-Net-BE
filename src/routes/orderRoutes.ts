import { Router } from 'express';
import { getOrderById, getOrdersByUser } from '../controllers/orderController.js';

const router = Router();

router.get('/user/:userId', getOrdersByUser);
router.get('/:orderId', getOrderById);

export default router;