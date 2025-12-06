import express from 'express';
const router = express.Router();
import {  cartController } from '../Modules/Cart/cart.controller.js';
import { auth } from '../middlewares/auth.js';

router.post('/adicionar', auth, cartController.addItem);
router.get('/buscarCompra', auth, cartController.getCart);
router.delete('/remover/:productId', auth, cartController.removeItem);

export default router;