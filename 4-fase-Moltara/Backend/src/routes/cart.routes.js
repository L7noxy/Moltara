import express from 'express';
const router = express.Router();
import {  cartController } from '../Modules/Cart/cart.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

router.post('/adicionar', authMiddleware, cartController.addItem);
router.get('/buscarCompra', cartController.getCart);
router.delete('/remover/:productId', cartController.removeItem);

export default router;