import { Router } from 'express';
import { addToCart, updateCart, removeFromCart } from '../controllers/cartController.js';
import { validate } from '../middleware/validate.js';
import { addToCartSchema, updateCartSchema, removeFromCartSchema } from '../validators/schemas.js';

const router = Router();

router.post('/add', validate(addToCartSchema), addToCart);
router.put('/update', validate(updateCartSchema), updateCart);
router.delete('/remove', validate(removeFromCartSchema), removeFromCart);

export default router;