import express from 'express';
const router = express.Router();
import {  cartController } from '../Modules/Cart/cart.controller.js';

router.post('/adicionar', cartController.addItem);
router.get('/buscarCompra', cartController.getCart);
router.delete('/remover/:productId', cartController.removeItem);

export default router;