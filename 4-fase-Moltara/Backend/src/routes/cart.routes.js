import express from 'express';
const router = express.Router();
import cartController from '../Modules/Cart/cart.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.get('/', authMiddleware, (req, res) => cartController.getCart(req, res));
router.post('/add', authMiddleware, (req, res) => cartController.addItem(req, res));
router.delete('/:productId', authMiddleware, (req, res) => cartController.removeItem(req, res));

export default router;