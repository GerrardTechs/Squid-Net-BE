import { Router } from 'express';
import { addToCart, updateCart, removeFromCart } from '../controllers/cartController.js';

const router = Router();
router.post('/add', addToCart);
router.put('/update', updateCart);
router.delete('/remove', removeFromCart);
export default router;
