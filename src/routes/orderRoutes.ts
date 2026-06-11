import { Router } from 'express';
import { getOrderById, getOrdersByUser } from '../controllers/orderController.js';

const router = Router();

// ⚠️ URUTAN PENTING: `/user/:userId` harus di atas `/:orderId`
// Jika dibalik, Express akan mencoba parse string "user" sebagai ObjectId → CastError
router.get('/user/:userId', getOrdersByUser);
router.get('/:orderId', getOrderById);

export default router;